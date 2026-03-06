# TurboFunding - Business Funding Application Platform

A secure web application for multi-step business funding applications with encrypted document storage and PDF generation.

**Live Site:** https://turbofunding.vercel.app/

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm 10+

### Setup

```bash
# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Server runs on `http://localhost:3000`

## Features

- **7-Step Application Form** - Organized business funding application process
- **Secure Document Storage** - AES-256-GCM encrypted file uploads (max 15MB)
- **Incomplete Application Tracking** - Resume from saved state
- **PDF Generation** - Dynamic application PDFs with form data
- **Email Notifications** - Confirmation and admin alerts
- **Multi-Owner Support** - Primary and secondary owner management
- **Real-Time Validation** - Form & file validation

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, Radix UI
- **Backend:** Next.js Server Actions
- **PDF:** pdf-lib
- **Storage:** Vercel Blob (encrypted)
- **Email:** Configured via environment variables
- **Package Manager:** pnpm

## Environment Variables

Required in `.env.local`:
```
BLOB_READ_WRITE_TOKEN
ENCRYPTION_KEY
SENDER_EMAIL
ADMIN_EMAIL
```

See `.env.example` for complete list. Contact the development team for production credentials.

## Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Run production build
pnpm lint             # Run linter
pnpm test:email       # Test email sending
pnpm generate:blank-pdf  # Generate blank PDF template
```

## Project Structure

```
app/               # Next.js App Router pages
lib/actions/       # Server-side actions (submission, uploads, emails)
components/        # Reusable React components
public/            # Static assets
styles/            # Global CSS
decoder/           # Decryption utility (git-ignored)
```

## Application Flow

1. User fills 7-step form (business info, funding request, documents)
2. Application PDF is generated and encrypted
3. Documents uploaded to Vercel Blob storage
4. Incomplete application record deleted
5. Confirmation email sent to applicant
6. Admin notification sent
7. Application marked complete

## Security

- All documents encrypted before storage
- Environment variables keep credentials secure
- File validation and size limits enforced
- HTTPS required for all transmissions

**Important:** Do not commit `.env` files or share encryption keys.

## Deployment

Deploy to Vercel using the dashboard or CLI. Set all environment variables in project settings before deploying.

See `.env.example` for required configuration.

## Support

For issues or questions, contact the development team.

---

**Last Updated:** March 2026