# Google Indexing API Setup Guide

To use the automated `scripts/submit-indexing-google.js` script to instantly push your new pages to Google's index, you need to create a **Google Cloud Service Account** and grant it permission in your **Google Search Console**.

Here is the step-by-step guide:

## Step 1: Create a Google Cloud Project & Enable the API
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., "FSI Digital Indexing").
3. Go to **APIs & Services > Library**.
4. Search for the **"Web Search Indexing API"**.
5. Click **Enable**.

## Step 2: Create a Service Account
1. In Google Cloud Console, go to **IAM & Admin > Service Accounts**.
2. Click **Create Service Account**.
3. Name it "indexing-bot" and click **Create and Continue**.
4. Skip the role assignment (it doesn't need one here) and click **Done**.

## Step 3: Get your JSON Key
1. Find your newly created Service Account in the list.
2. Under the "Actions" column (the three dots), click **Manage Keys**.
3. Click **Add Key > Create new key**.
4. Choose **JSON** and click **Create**.
5. *A file will download to your computer.* 
6. **Rename this file to exactly `google-credentials.json`**.
7. Place this file in the root directory of your FSI Digital project (same folder as your `package.json`).

## Step 4: Grant Permission in Google Search Console
1. Open the downloaded `google-credentials.json` file on your computer. Find the `"client_email"` property. It will look something like: `indexing-bot@fsi-digital-indexing.iam.gserviceaccount.com`. Copy this email.
2. Go to your [Google Search Console](https://search.google.com/search-console).
3. Select your verified domain property (e.g., `https://fsidigital.ca`).
4. Look at the left sidebar and click **Settings**.
5. Click on **Users and Permissions**.
6. Click the three dots next to your name and click **Add User**.
7. Paste the Service Account email address you copied earlier.
8. **CRITICAL:** Set the Permission level to **Owner**. (The API requires Owner level access).
9. Click **Add**.

---

## Step 5: Run the Script!

Once your `google-credentials.json` is safely in your project root, you can run the script anytime you publish new content:

```bash
node scripts/submit-indexing-google.js
```

**Notes:**
- Google limits this to **200 URLs per day**.
- The script automatically fetches your live sitemap, extracts the URLs, prioritizes them, and submits up to 190 of them per run.
- You can also submit specific URLs by passing them as arguments:
  ```bash
  node scripts/submit-indexing-google.js https://fsidigital.ca/blog/my-new-post
  ```
