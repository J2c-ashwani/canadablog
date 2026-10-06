import { type NextRequest, NextResponse } from 'next/server';
import { handleCallConclusion, type CallConclusionPayload } from '@/lib/voice-agent/call-handler';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Webhook authentication guard
    const configuredSecret = process.env.VOICE_WEBHOOK_SECRET;
    if (configuredSecret) {
      const authHeader = request.headers.get('authorization');
      const secretHeader = request.headers.get('x-voice-webhook-secret') || request.headers.get('x-vapi-secret');
      const urlSecret = request.nextUrl.searchParams.get('secret');

      const token = authHeader?.replace(/^Bearer\s+/i, '') || secretHeader || urlSecret;
      if (!token || token !== configuredSecret) {
        return NextResponse.json({ error: 'Unauthorized webhook request.' }, { status: 401 });
      }
    }

    const rawBody = await request.json();

    // 1. Support Vapi.ai Webhook Format
    if (rawBody.message && rawBody.message.type === 'end-of-call-report') {
      const vapiMsg = rawBody.message;
      const call = vapiMsg.call || {};
      const analysis = vapiMsg.analysis || {};
      const customer = call.customer || {};
      const variables = call.assistantOverrides?.variableValues || {};

      const structured = analysis.structuredData || {};
      const disposition = structured.disposition === 'READY_TO_PAY'
        ? 'READY_TO_PAY'
        : structured.disposition === 'INTERESTED_IN_INFO'
          ? 'INTERESTED_IN_INFO'
          : structured.disposition === 'CALLBACK_REQUESTED'
            ? 'CALLBACK_REQUESTED'
            : structured.disposition === 'NOT_INTERESTED'
              ? 'NOT_INTERESTED'
              : 'COMPLETED';

      const payload: CallConclusionPayload = {
        callId: call.id || `VAPI-${Date.now()}`,
        customerPhone: customer.number || variables.phone || '',
        customerEmail: variables.email || structured.email || '',
        customerName: variables.name || customer.name || structured.name || 'Founder',
        companyName: variables.companyName || structured.companyName || 'Your Business',
        durationSeconds: vapiMsg.durationSeconds || Math.round(call.duration || 0),
        callStatus: call.status === 'ended' ? 'completed' : (call.status || 'completed'),
        disposition: disposition as any,
        summary: analysis.summary || structured.summary || 'Vapi AI funding evaluation completed.',
        transcript: vapiMsg.artifact?.transcript || '',
        productRequested: structured.productRequested || variables.productRequested || 'funding-bundle',
        provider: 'vapi',
        recordingUrl: vapiMsg.artifact?.recordingUrl || '',
      };

      const result = await handleCallConclusion(payload);
      return NextResponse.json({ success: true, provider: 'vapi', result });
    }

    // 2. Support Vapi mid-call tool invocation (e.g. "send_payment_link_email")
    if (rawBody.message && rawBody.message.type === 'tool-calls') {
      const toolCalls = rawBody.message.toolCalls || [];
      const paymentTool = toolCalls.find((t: any) => t.function?.name === 'send_payment_link_email');
      if (paymentTool) {
        let args: any = {};
        try {
          args = typeof paymentTool.function.arguments === 'string'
            ? JSON.parse(paymentTool.function.arguments)
            : paymentTool.function.arguments;
        } catch {}

        const call = rawBody.message.call || {};
        const variables = call.assistantOverrides?.variableValues || {};

        const payload: CallConclusionPayload = {
          callId: call.id || `VAPI-TOOL-${Date.now()}`,
          customerPhone: call.customer?.number || variables.phone || args.phone || '',
          customerEmail: args.email || variables.email || '',
          customerName: args.name || variables.name || 'Founder',
          companyName: args.companyName || variables.companyName || 'Your Business',
          durationSeconds: Math.round(call.duration || 0),
          callStatus: 'completed',
          disposition: 'READY_TO_PAY',
          summary: args.summary || 'Customer requested direct payment link during phone call.',
          productRequested: args.productRequested || 'funding-bundle',
          provider: 'vapi_tool',
        };

        const result = await handleCallConclusion(payload);
        return NextResponse.json({
          results: [
            {
              toolCallId: paymentTool.id,
              result: result.emailSent ? 'Payment link successfully emailed to customer.' : 'Payment link processed.',
            },
          ],
        });
      }
    }

    // 3. Support Bland.ai Webhook Format
    if (rawBody.call_id || rawBody.bland_call_id) {
      const callId = rawBody.call_id || rawBody.bland_call_id;
      const vars = rawBody.variables || rawBody.metadata || {};
      const disposition = rawBody.disposition || (rawBody.answered_by === 'human' ? 'INTERESTED_IN_INFO' : 'NO_ANSWER');

      const payload: CallConclusionPayload = {
        callId,
        customerPhone: rawBody.to || rawBody.phone_number || vars.phone || '',
        customerEmail: vars.email || rawBody.email || '',
        customerName: vars.name || 'Founder',
        companyName: vars.companyName || 'Your Business',
        durationSeconds: rawBody.call_length || 0,
        callStatus: rawBody.status === 'completed' ? 'completed' : 'busy',
        disposition: disposition as any,
        summary: rawBody.summary || rawBody.analysis || 'Bland AI call completed.',
        transcript: rawBody.transcripts?.map((t: any) => `${t.user}: ${t.text}`).join('\n') || '',
        productRequested: vars.productRequested || 'funding-bundle',
        provider: 'bland',
        recordingUrl: rawBody.recording_url || '',
      };

      const result = await handleCallConclusion(payload);
      return NextResponse.json({ success: true, provider: 'bland', result });
    }

    // 4. Generic / Make.com / n8n / Custom API Webhook Format
    const {
      callId,
      customerEmail,
      customerPhone,
      customerName,
      companyName,
      disposition = 'READY_TO_PAY',
      summary = 'Phone evaluation completed.',
      transcript,
      productRequested = 'funding-bundle',
      durationSeconds = 60,
      recordingUrl,
    } = rawBody;

    if (!customerEmail && !customerPhone) {
      return NextResponse.json(
        { error: 'customerEmail or customerPhone is required in webhook payload.' },
        { status: 400 }
      );
    }

    const payload: CallConclusionPayload = {
      callId: callId || `CALL-${Date.now()}`,
      customerPhone: customerPhone || '',
      customerEmail: customerEmail || '',
      customerName: customerName || 'Founder',
      companyName: companyName || 'Your Business',
      callStatus: 'completed',
      disposition,
      summary,
      transcript,
      productRequested,
      durationSeconds: Number(durationSeconds) || 0,
      provider: 'custom_webhook',
      recordingUrl,
    };

    const result = await handleCallConclusion(payload);
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error('❌ [Voice Webhook Route] Unhandled error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error processing voice webhook.' },
      { status: 500 }
    );
  }
}
