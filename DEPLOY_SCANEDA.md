# Scaneda Deployment Notes

This project is being prepared for:

- public site: `scaneda.online`
- admin site: `admin.scaneda.online`
- app hosting: `Vercel`
- database and storage: `Supabase`
- DNS provider: `GuzelHosting`

## 1. Required Accounts

- Vercel account
- Supabase account
- GuzelHosting DNS panel access

## 2. Environment Variables

Set these in Vercel Project Settings -> Environment Variables:

```bash
NEXT_PUBLIC_APP_DOMAIN=scaneda.online
NEXT_PUBLIC_ADMIN_DOMAIN=admin.scaneda.online
ADMIN_SESSION_SECRET=<long-random-secret>
NEXT_PUBLIC_SUPABASE_URL=<supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<supabase-service-role-key>
```

Use [.env.example](./.env.example) as the source of truth.

## 3. Supabase Setup

Create a new project in Supabase and run:

- [supabase/migrations/0001_scaneda_schema.sql](./supabase/migrations/0001_scaneda_schema.sql)

This creates:

- `restaurants`
- `users`
- `categories`
- `products`
- `restaurant-assets` storage bucket

## 4. Vercel Domains

Add both domains to the Vercel project:

- `scaneda.online`
- `admin.scaneda.online`

Vercel will show the exact DNS records it expects for your project.

Official reference:

- [Vercel custom domain setup](https://vercel.com/docs/domains/set-up-custom-domain)

## 5. GuzelHosting DNS

After adding the domains in Vercel, go to the GuzelHosting DNS panel and add the records Vercel shows.

Typical pattern:

- apex domain (`scaneda.online`) -> `A`
- admin subdomain (`admin.scaneda.online`) -> `CNAME`

Do not guess the records. Use the exact values Vercel displays for this project.

## 6. Current Codebase Status

The codebase is now prepared for:

- configurable production domain via env
- separate admin host via env
- Scaneda logo assets under `public/brand/scaneda`

Still pending before production:

- replace file-based JSON persistence with Supabase-backed repositories
- wire image uploads to Supabase Storage
- seed or import the Scaneda production restaurant record

## 7. Scaneda Brand Assets

Imported files:

- `public/brand/scaneda/scaneda_logo.png`
- `public/brand/scaneda/scaneda_white_logo.png`
- `public/brand/scaneda/scaneda_russian_logo.png`
