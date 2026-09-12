# Greater Sudbury Municipal Elections — Project Roadmap & To-Do List

## Deployment & Security Checklist

- [ ] **Google Cloud Console API Key Restrictions (Best Practices)**:
  - Go to [Google Cloud Console > APIs & Services > Credentials](https://console.cloud.google.com/apis/credentials).
  - Select your Web API key for project `ai-studio-sudburyelectionr-34ec155f-c4e6-4f7a-991b-6d9e2ecbc8ac`.
  - **Set Application Restrictions (HTTP Referrers)**:
    - Add production domains: `https://sudburyvotes.info/*` and `https://*.sudburyvotes.info/*`.
    - Add staging/preview domains: `https://ais-dev-*.run.app/*`, `https://ais-pre-*.run.app/*`.
    - (Optional during local testing) `http://localhost:*`.
  - **Set API Restrictions**:
    - Restrict key scope strictly to **Cloud Firestore API** and **Firebase Installations API**.
    - Save restrictions to prevent key misuse on other GCP services.

- [ ] **Production Launch (Netlify)**:
  - Push repository from AI Studio → GitHub.
  - Connect repository in Netlify with build command `npm run build` and publish directory `dist`.
  - Configure custom domain `sudburyvotes.info` and verify SSL certificate.
  - Verify admin controls (`?admin=sudbury2026`) are hidden by default from general visitors.
