# 🔌 Platform Credentials Setup Guide
## FSI Digital Content Distribution Pipeline

This guide covers OAuth / API setup for all 6 platforms in the n8n workflow.

---

## Prerequisites

1. **n8n running** via Docker:
   ```bash
   docker run -it --rm --name n8n \
     -p 5678:5678 \
     -v ~/.n8n:/home/node/.n8n \
     --add-host=host.docker.internal:host-gateway \
     n8nio/n8n
   ```
2. **Video API running** on port 3001:
   ```bash
   cd /Users/ashwanikumar/Downloads/canadablog
   node scripts/distribution/video-api.js
   ```

---

## 1. 🔴 YouTube (Google OAuth2)

### Create OAuth2 App
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project → Enable **YouTube Data API v3**
3. APIs & Services → Credentials → **Create Credentials → OAuth 2.0 Client ID**
4. Application type: **Web application**
5. Authorized redirect URIs: `http://localhost:5678/rest/oauth2-credential/callback`
6. Copy **Client ID** and **Client Secret**

### Add to n8n
1. In n8n → Credentials → New → **Google OAuth2 API**
2. Paste Client ID + Secret
3. Click **Sign in with Google** → authorize your YouTube Studio account
4. Name it: `FSI Digital - YouTube`

### In Workflow
- Click the **YouTube Shorts** node → Credential: select `FSI Digital - YouTube`

---

## 2. 🐦 X / Twitter (OAuth 1.0a)

### Create Twitter App
1. Go to [developer.twitter.com](https://developer.twitter.com/en/portal/dashboard)
2. Create a new Project + App → set **App permissions: Read and Write**
3. Under "Keys and Tokens" → generate:
   - **API Key** (Consumer Key)
   - **API Key Secret** (Consumer Secret)
   - **Access Token**
   - **Access Token Secret**

### Add to n8n
1. In n8n → Credentials → New → **Twitter OAuth1 API**
2. Paste all 4 keys
3. Name it: `FSI Digital - Twitter`

### In Workflow
- Click the **X (Twitter)** node → Credential: `FSI Digital - Twitter`

---

## 3. 💼 LinkedIn (OAuth2)

### Create LinkedIn App
1. Go to [linkedin.com/developers](https://www.linkedin.com/developers/apps)
2. Create App → your company page (FSI Digital)
3. Products: Request access to **Share on LinkedIn** + **Sign In with LinkedIn**
4. Auth tab → Authorized redirect URLs: `http://localhost:5678/rest/oauth2-credential/callback`
5. Copy **Client ID** and **Client Secret**

### Add to n8n
1. In n8n → Credentials → New → **LinkedIn OAuth2 API**
2. Paste Client ID + Secret
3. Click **Connect** → authorize
4. Name it: `FSI Digital - LinkedIn`

### In Workflow
- Click the **LinkedIn** node → Credential: `FSI Digital - LinkedIn`

---

## 4. 📌 Pinterest (OAuth2)

### Create Pinterest App
1. Go to [developers.pinterest.com/apps/](https://developers.pinterest.com/apps/)
2. Create a new app → set redirect URI: `http://localhost:5678/rest/oauth2-credential/callback`
3. Copy **App ID** and **App Secret**

### Add to n8n
1. In n8n → Credentials → New → **Pinterest OAuth2 API**
2. Paste App ID + Secret
3. Click **Connect**
4. Name it: `FSI Digital - Pinterest`

### In Workflow
- Click **Pinterest** node → Credential: `FSI Digital - Pinterest`

---

## 5. 📲 Instagram Reels (Meta Graph API)

> Instagram Reels posting uses the **Meta Graph API** with a **Business Instagram Account** linked to a **Facebook Page**.

### One-Time Setup

**Step A — Create Meta Developer App**
1. Go to [developers.facebook.com/apps](https://developers.facebook.com/apps)
2. Create App → type: **Business**
3. Add product: **Instagram Graph API**

**Step B — Link Instagram Business Account**
1. Business Settings → Instagram Accounts → Add yours
2. Your Instagram account must be **Professional (Business/Creator)** type
3. Connect it to a Facebook Page you manage

**Step C — Get a Long-Lived Access Token**
```bash
# 1. Get short-lived token via Graph API Explorer:
#    https://developers.facebook.com/tools/explorer
#    → Generate Token → select pages_manage_posts, instagram_basic,
#      instagram_content_publish, public_profile

# 2. Exchange for 60-day long-lived token:
curl "https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"

# 3. Get your Instagram Business Account ID:
curl "https://graph.facebook.com/v19.0/me/accounts?access_token=LONG_LIVED_TOKEN"
# Then: curl "https://graph.facebook.com/v19.0/PAGE_ID?fields=instagram_business_account&access_token=LONG_LIVED_TOKEN"
```

**Step D — Add credentials to n8n**
1. In n8n → Settings → Variables → Create two new variables:
   - `instagramAccessToken` = your long-lived token
   - `instagramBusinessAccountId` = your IG Business Account ID (numeric ID)

> ⚠️ The Instagram nodes in the workflow already use `$credentials.instagramAccessToken` 
> and `$credentials.instagramBusinessAccountId` — just fill in these values.

**Token Refresh** — Meta tokens last ~60 days. Set a calendar reminder to refresh, or 
use the [Token Refresher workflow](https://docs.n8n.io/integrations/builtin/credentials/facebookgraph/) in n8n.

---

## 6. 📧 Sender.net Newsletter

1. Log in to [sender.net](https://sender.net)
2. Settings → API → Generate API Key
3. In n8n → Credentials → New → **Header Auth**
4. Name: `Authorization`, Value: `Bearer YOUR_API_KEY`
5. Name it: `FSI Digital - Sender.net`

> The workflow's Sender.net node already injects this as a Bearer token header.

---

## ✅ Final Checklist

| Platform | Credential Type | n8n Name |
|---|---|---|
| YouTube | Google OAuth2 | `FSI Digital - YouTube` |
| X/Twitter | Twitter OAuth1 | `FSI Digital - Twitter` |
| LinkedIn | LinkedIn OAuth2 | `FSI Digital - LinkedIn` |
| Pinterest | Pinterest OAuth2 | `FSI Digital - Pinterest` |
| Instagram | n8n Variables | `instagramAccessToken` + `instagramBusinessAccountId` |
| Sender.net | Header Auth | `FSI Digital - Sender.net` |

---

## Import the Workflow

```bash
# Option A: via n8n UI
# Settings → Import workflow → paste content of n8n-workflow-import.json

# Option B: via CLI (if using n8n self-hosted)
n8n import:workflow --input=scripts/distribution/n8n-workflow-import.json
```

Then assign all credentials to the nodes and hit **Activate** on the workflow.
