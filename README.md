# TurboFunding - Business Funding Application Platform

A modern web application that streamlines business funding applications with secure document encryption, multi-step form collection, and automated PDF generation.

**Live Site:** https://turbofunding.vercel.app/

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Key Features](#key-features)
- [Application Form Flow](#application-form-flow)
- [Encryption & Security](#encryption--security)
- [Decoder Utility](#decoder-utility)
- [Deployment](#deployment)

## Features

✅ **Multi-Step Application Form** - Organized 7-step funding application process
- Step 1: Starting Information (Business & Owner Details)
- Step 2: Funding Request Information
- Step 3: Business Information (Legal Name, DBA, Address)
- Step 4: Business Details (Industry, Revenue, Formation)
- Step 5: Owner Information (Personal & Financial)
- Step 6: Document Uploads (Bank Statements, Additional Docs)
- Step 7: Signature & Submission

✅ **Secure Document Management**
- AES-256-GCM encryption for all uploaded documents
- Automatic PDF generation of application details
- File upload validation (max 15MB per file)

✅ **Incomplete Application Tracking**
- Automatic save of incomplete applications to Vercel Blob
- Resume applications from saved state
- Completion tracking in localStorage

✅ **Email Notifications**
- Confirmation emails to applicants
- Admin notifications for new applications
- Email templates with application details & PDF links

✅ **PDF Generation & Download**
- Dynamic PDF creation with form data
- Professional formatting with two-column layout
- Downloadable application copies

✅ **Multi-Owner Support**
- Support for primary and secondary owners
- Individual signatures for each owner
- Ownership percentage tracking

✅ **Data Validation**
- Real-time form validation
- Phone number, email, EIN formatting
- Date range & business age validation
- File type & size checking

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + PostCSS
- **UI Components:** Radix UI + custom components
- **PDF Generation:** pdf-lib
- **Encryption:** Node.js crypto (AES-256-GCM)
- **Storage:** Vercel Blob
- **Email:** (configured in env)
- **Package Manager:** pnpm

## Project Structure

```
turbo-funding-com/
├── app/                          # Next.js App Router
│   ├── apply/                   # Application form pages
│   │   ├── page.tsx             # Main form component (client-side)
│   │   └── apply-client.tsx     # Form logic & state
│   ├── download/                # PDF download endpoint
│   └── layout.tsx               # Root layout
├── lib/
│   ├── actions/                 # Server actions
│   │   ├── submit-application.tsx        # Form submission logic
│   │   ├── upload-application-documents.ts # Blob upload & encryption
│   │   ├── download-application-pdf.tsx   # PDF generation
│   │   └── send-email.ts                  # Email notifications
│   ├── email/                   # Email templates
│   └── utils/                   # Helper functions
├── components/                  # Reusable React components
│   ├── signature-modal.tsx      # Signature capture
│   ├── conversion-tracking.tsx  # Analytics integration
│   └── ui/                      # Shadcn/Radix components
├── decoder/                     # Decryption utility (git-ignored)
│   └── decrypt-application.js   # CLI tool for decrypting blobs
├── public/                      # Static assets
├── styles/                      # Global CSS
├── scripts/                     # Build & utility scripts
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies
└── README.md                    # This file
```

## Setup & Installation

### Prerequisites
- Node.js 18+
- pnpm 10+
- Git

### Clone & Install

```bash
# Clone repository
git clone <repo-url>
cd turbo-funding-com

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local
```

### Configure Environment Variables

See [Environment Variables](#environment-variables) section below.

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
BLOB_READ_WRITE_TOKEN=...
ENCRYPTION_KEY=...
SENDER_EMAIL=...
ADMIN_EMAIL=...
NEXT_PUBLIC_GTAG=...
```

See `.env.example` for the complete list of required variables. Contact the development team for production credentials.

## Development

### Start Development Server

```bash
pnpm dev
```

Server runs on `http://192.168.1.68:3000` (configured for local network access)

### Build for Production

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

### Generate Templates

```bash
# Generate blank PDF template
pnpm generate:blank-pdf

# Test email sending
pnpm test:email
```

## Key Features

### 1. Form State Management

- Auto-saves draft to `localStorage` every step
- Persists across browser sessions
- Clears on successful submission
- Dev mode auto-populates with test data

### 2. Application Submission Flow

```
User fills form (Steps 1-7)
     ↓
PDF generated from form data
     ↓
PDF encrypted (AES-256-GCM)
     ↓
Uploaded to Vercel Blob (organized folder structure)
     ↓
Incomplete application record deleted from Blob
     ↓
Confirmation email sent to applicant
     ↓
Admin notification sent
     ↓
localStorage cleared
     ↓
Completion recorded
```

### 3. Incomplete Applications

Incomplete applications are saved to Vercel Blob with structure:
```
incomplete_applications/{sanitized_email}/application.txt
```

Each email can only have ONE incomplete application (new ones replace old ones).

When a user submits a complete application, the incomplete record is automatically deleted.

### 4. Document Organization

Completed applications are organized by business name and timestamp:
```
applications/{businessName}/{YYYY-MM-DD_HH-MM-AM|PM}/
├── application       (encrypted PDF)
├── bank-statements   (encrypted, if provided)
└── other-documents   (encrypted, if provided)
```

## Application Form Flow

### Step 1: Starting Information
- Business Name
- Owner Name
- Phone & Email

**Validation:** Required fields, email format
**Action:** Saves incomplete application to Vercel Blob

### Step 2: Funding Request
- Funding Amount (with custom range input)
- Use of Funds (dropdown)

**Validation:** Amount > $1,000 and < $1M

### Step 3: Business Information
- Legal Business Name
- DBA (optional, "Doing Business As")
- Federal Tax ID (EIN)
- Business Address

**Validation:** EIN format (XX-XXXXXXX), address required

### Step 4: Business Details
- Business Start Date
- Entity Type (LLC, Corporation, etc.)
- Years in Business
- Annual Revenue Range
- Industry
- State Incorporated

**Validation:** Date not in future, years ≥ 0

### Step 5: Owner Information
- Personal Details (DOB, SSN)
- Home Address
- Credit Score
- Ownership Percentage
- Support for secondary owner

**Validation:** DOB reasonable, SSN format

### Step 6: Document Upload
- Bank Statements (optional, PDF/DOC/DOCX)
- Other Documents (optional)

**Validation:** Max 15MB per file

### Step 7: Signature & Submission
- Digital signature capture (canvas)
- Terms agreement
- Final submission

**Validation:** Signature required, terms checked

## Encryption & Security

All documents are encrypted before upload to storage and require authentication keys to decrypt. Encryption is handled automatically by the application during submission.

**Security Practices:**
- Sensitive keys stored in environment variables (never committed to version control)
- File validation and size limits enforced
- HTTPS required for all data transmission
- Access tokens must be kept confidential

⚠️ **Important:** Do not commit `.env` files or share encryption keys. Rotate credentials if exposed.

## Decoder Utility

The `decoder/` folder contains a CLI tool to decrypt downloaded encrypted files:

### Usage

```bash
cd decoder

# Decrypt a file
node decrypt-application.js ./encrypted-file ./output.pdf

# Or encrypt a file
node decrypt-application.js ./input.pdf ./encrypted-output --encrypt
```

### Requirements

- `ENCRYPTION_KEY` in `.env` (parent directory)
- Must match the key used for encryption

### What It's For

- **Download:** Encrypted blobs are public URLs safe for email
- **Decrypt:** Use this tool to recover the original PDF on client machine
- **Encrypt:** Test encryption/decryption locally
- **.gitignore:** `decoder/` is ignored to prevent key exposure

## Deployment

### Vercel (Recommended)

The app is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set production environment variables in Vercel dashboard
```

### Environment Variables in Vercel

1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy to apply changes

### Pre-Deployment Checklist

- [ ] Encryption key generated & stored safely
- [ ] Vercel Blob token configured
- [ ] Email credentials tested
- [ ] Admin email address set
- [ ] Domain configured if using custom domain
- [ ] CORS headers configured if needed
- [ ] File size limits appropriate for your use case

### Monitoring

- Check Vercel Analytics for performance
- Monitor Email delivery in email service logs
- Review Blob storage usage in Vercel dashboard
- Test form submission in production environment

## Common Operations

### Reset User Draft

Delete from browser dev tools → Application → Local Storage:
- `turbo_funding_application_draft`
- `turbo_funding_application_step`

### Test Email Sending

```bash
pnpm test:email
```

### Generate Blank PDF Template

```bash
pnpm generate:blank-pdf
```

Creates `blank-application.pdf` used as form template.

## Support & Troubleshooting

### Form Not Saving?
- Check browser console for errors
- Verify localStorage is enabled
- Check `.env` variables loaded

### PDF Generation Failing?
- Ensure pdf-lib is installed
- Check file size < 15MB
- Verify encryption key is valid

### Emails Not Sending?
- Check SMTP credentials
- Verify email addresses are correct
- Review email service logs
- Test with `pnpm test:email`

### Decryption Failing?
- Verify `ENCRYPTION_KEY` matches original key
- Check file wasn't corrupted in transit
- Ensure file is actually encrypted (not plain PDF)

---

**Last Updated:** March 2026

For issues, questions, or contributions, please contact the development team.