# LUMORA — Digital Studio Website

LUMORA is a premium, cinematic digital studio website built with React and Vite.

> We build, grow and protect your digital presence.

LUMORA focuses on three core services:

- Websites
- Digital Marketing
- Cyber Security

## Features

- Dark editorial visual design
- Responsive desktop, tablet and mobile layouts
- Reusable React components
- Lenis smooth scrolling
- Subtle reveal animations
- Responsive mobile navigation
- Interactive contact form
- Google Sheets enquiry storage
- Email notifications through Google Apps Script
- Automatic confirmation email to clients
- WhatsApp click-to-chat integration
- Optional WebGL particle environment using Three.js
- Lazy-loaded particle environment for improved initial loading
- Reduced-motion support
- Semantic HTML and accessible form controls
- Vite production build support
- Vercel deployment support

## Tech Stack

- React
- Vite
- Three.js
- Lenis
- CSS
- Google Apps Script
- Google Sheets
- Vercel

## Project Structure

```text
LUMORA/
├── public/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Difference.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Intro.jsx
│   │   ├── Navbar.jsx
│   │   ├── ParticleEnvironment.jsx
│   │   ├── Services.jsx
│   │   ├── Services.jsx
│   │   ├── Why.jsx
│   │   └── ui.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── styles-form.css
│   └── styles-particles.css
├── .env.example
├── .env.local
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Requirements

Install these before running the project:

- Node.js 18 or newer
- npm
- Git

Check your installed versions:

```bash
node --version
npm --version
git --version
```

## Local Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/lumora.git
```

Open the project folder:

```bash
cd lumora
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a file named `.env.local` in the project root:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Use the Google Apps Script Web App URL. It must end with:

```text
/exec
```

Do not use the normal Google Sheet URL.

Create `.env.example` for other developers:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=
```

Never commit `.env.local` to GitHub.

## Available Commands

Start the local development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The development server normally runs at:

```text
http://localhost:5173
```

## Contact Form Integration

The contact form is located at:

```text
src/components/Contact.jsx
```

The form sends these fields to Google Apps Script:

```text
name
email
phone
company
service
message
```

The React component reads the Apps Script URL from:

```jsx
import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL
```

## Google Sheets Setup

1. Create a Google Sheet.
2. Add these columns in the first row:

```text
Date | Name | Email | Phone | Company | Service | Message
```

3. Open:

```text
Extensions → Apps Script
```

4. Add the following code:

```javascript
function doPost(event) {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getActiveSheet()

  const data = JSON.parse(event.postData.contents)

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.company || '',
    data.service || '',
    data.message || '',
  ])

  const ownerEmail = 'hello@yourbusinessmail.com'

  MailApp.sendEmail({
    to: ownerEmail,
    replyTo: data.email || ownerEmail,
    subject: 'New LUMORA enquiry from ' + data.name,
    htmlBody: `
      <h2>New LUMORA Website Enquiry</h2>
      <p><strong>Name:</strong> ${data.name || ''}</p>
      <p><strong>Email:</strong> ${data.email || ''}</p>
      <p><strong>Phone / WhatsApp:</strong> ${data.phone || ''}</p>
      <p><strong>Business / Company:</strong> ${data.company || ''}</p>
      <p><strong>Service Required:</strong> ${data.service || ''}</p>
      <p><strong>Project Details:</strong></p>
      <p>${data.message || ''}</p>
    `,
  })

  if (data.email) {
    MailApp.sendEmail({
      to: data.email,
      subject: 'We received your enquiry — LUMORA',
      htmlBody: `
        <p>Hi ${data.name || 'there'},</p>
        <p>Thank you for contacting LUMORA.</p>
        <p>We have received your enquiry successfully.</p>
        <p>Our team will review your requirements and get back to you soon.</p>
        <p>— LUMORA<br />Technology & Digital Studio</p>
      `,
    })
  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON)
}
```

5. Replace this email address:

```javascript
const ownerEmail = 'hello@yourbusinessmail.com'
```

with the LUMORA business email address.

6. Deploy the script as a Web App:

```text
Deploy → New deployment → Web app
```

Use these settings:

```text
Execute as: Me
Who has access: Anyone
```

7. Copy the Web App URL and add it to `.env.local`.

8. After any Apps Script code change, create a new deployment version:

```text
Deploy → Manage deployments → Edit → New version → Deploy
```

## WhatsApp Integration

The website includes a WhatsApp click-to-chat link.

Update the number in `Contact.jsx`:

```jsx
href="https://wa.me/919043308815"
```

Use the full international number without spaces or the plus symbol.

Example:

```text
+91 90433 08815
```

becomes:

```text
919043308815
```

## GitHub Setup

Create a new empty repository on GitHub, then run:

```bash
git init
git add .
git commit -m "Initial LUMORA website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lumora.git
git push -u origin main
```

Check the files before pushing:

```bash
git status
```

These files should not be uploaded:

```text
node_modules/
.env.local
dist/
```

If `node_modules` was already added to Git, remove it from Git tracking:

```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from repository"
git push
```

## Vercel Deployment

1. Open [Vercel](https://vercel.com).
2. Sign in with GitHub.
3. Select **Add New → Project**.
4. Import the LUMORA GitHub repository.
5. Use these build settings:

```text
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

6. Add the environment variable in Vercel:

```text
Name: VITE_GOOGLE_APPS_SCRIPT_URL
Value: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Select:

```text
Production
Preview
Development
```

7. Click **Deploy**.

The `VITE_` prefix is required because the React frontend needs access to the Apps Script endpoint. Use Vercel **Config**, not Secret, for this variable.

After adding or changing the environment variable, redeploy the project:

```text
Vercel Dashboard → Deployments → Latest deployment → ⋯ → Redeploy
```

## Updating the Website

After making changes locally:

```bash
npm run build
git add .
git commit -m "Update LUMORA website"
git push
```

Vercel automatically deploys every new push to the connected GitHub branch.

## Performance Notes

- The particle environment is lazy-loaded.
- Particle count is reduced on mobile devices.
- Reduced-motion users receive a simplified animation experience.
- The WebGL canvas uses GPU-friendly point rendering.
- The canvas does not capture pointer events.
- No heavy background video is used.
- Images should be compressed before adding them to `src/assets`.

## Accessibility

The website includes:

- Semantic HTML sections
- Accessible navigation labels
- Keyboard-friendly links and buttons
- Visible form focus states
- Required form validation
- Reduced-motion support
- Responsive layouts
- Readable color contrast

## Troubleshooting

### Contact form works locally but not on Vercel

Check that the Vercel environment variable is named exactly:

```text
VITE_GOOGLE_APPS_SCRIPT_URL
```

Then redeploy the project.

### Contact form does not send data

Check that your Apps Script deployment uses:

```text
Execute as: Me
Who has access: Anyone
```

Also confirm that the URL ends with `/exec`.

### Vercel build fails

Run locally:

```bash
npm install
npm run build
```

Fix any local build errors before pushing to GitHub.

### `vite: not found`

Run:

```bash
npm install
```

Then start the project again:

```bash
npm run dev
```

## License

This project is the property of LUMORA.

© 2026 LUMORA. All rights reserved.
