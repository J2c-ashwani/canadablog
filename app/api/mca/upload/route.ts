// app/api/mca/upload/route.ts
// MCA Bank Statement Upload API
// Stores PDFs in Vercel Blob (private object storage). Never touches Vercel filesystem.

import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;
const ALLOWED_MIME = 'application/pdf';

// Simple IP-based rate limit using in-memory store (per-instance)
// For production at scale, replace with Upstash Redis (already in project)
const uploadAttempts = new Map<string, { count: number; windowStart: number }>();
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = uploadAttempts.get(ip);

  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    uploadAttempts.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many upload attempts. Please try again in 10 minutes.' },
        { status: 429 }
      );
    }

    // Check Vercel Blob is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('MCA Upload: BLOB_READ_WRITE_TOKEN is not configured');
      return NextResponse.json(
        { error: 'File storage is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    // Collect all files from formData
    const files: File[] = [];
    for (const [, value] of formData.entries()) {
      if (value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided.' }, { status: 400 });
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} files allowed per upload.` },
        { status: 400 }
      );
    }

    // Validate each file
    for (const file of files) {
      // Server-side MIME type check
      if (file.type !== ALLOWED_MIME) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.name}. Only PDF files are accepted.` },
          { status: 400 }
        );
      }

      // Extension check (defense in depth)
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        return NextResponse.json(
          { error: `Invalid file extension: ${file.name}. Only .pdf files are accepted.` },
          { status: 400 }
        );
      }

      // Size check
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          {
            error: `File too large: ${file.name}. Maximum file size is 10MB.`,
          },
          { status: 400 }
        );
      }

      if (file.size === 0) {
        return NextResponse.json(
          { error: `Empty file: ${file.name}. Please upload a valid PDF.` },
          { status: 400 }
        );
      }
    }

    // Upload to Vercel Blob (private access)
    const timestamp = Date.now();
    const results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const blobPath = `mca-statements/pending/${timestamp}-${i + 1}-${safeName}`;

      // Convert File to ArrayBuffer and then Buffer to avoid serialization/type compatibility issues on Vercel Node runtime
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const blob = await put(blobPath, buffer, {
        contentType: file.type || ALLOWED_MIME,
        access: 'public', // Will be moved to private folder on final submit
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      results.push({
        storageUrl: blob.url,
        fileName: file.name,
        sizeBytes: file.size,
      });
    }

    return NextResponse.json({ files: results }, { status: 200 });
  } catch (error) {
    console.error('MCA Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed. Please try again or contact support.' },
      { status: 500 }
    );
  }
}
