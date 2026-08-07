# TILASHMI — Official Band Website

A premium, fully editable website for the Nepali alternative rock / pop / fusion rock band
**TILASHMI** (est. 2081 B.S. / 2024 A.D.), built with Next.js App Router, TypeScript, Tailwind
CSS, Framer Motion, and Prisma.

Every section on the public site — hero, about, members, group photo, gallery, music, events,
news, contact details, and site-wide settings — is editable from a secure `/admin` dashboard.
No code changes required for day-to-day content updates.

## Tech Stack

- **Frontend:** Next.js 16 (App Router, Server Components), TypeScript, Tailwind CSS v4, Framer Motion
- **Backend:** Next.js Route Handlers + Server Actions
- **Database:** PostgreSQL via Supabase, accessed through Prisma ORM
- **Auth:** Custom JWT session (httpOnly cookie, `jose` + `bcryptjs`), no third-party dependency
- **Storage:** Local file uploads to `/public/uploads` (swap to Cloudinary/S3 — see below)

## Getting Started

```bash
npm install
npm run db:push    # create the SQLite database from the Prisma schema
npm run db:seed     # seed initial content + create the admin user
npm run dev
```

Visit the site at [http://localhost:3000](http://localhost:3000) and the admin dashboard at
[http://localhost:3000/admin](http://localhost:3000/admin).

### Default Admin Login

Configured in `.env` (change these before deploying):

```
ADMIN_EMAIL="admin@tilashmi.com"
ADMIN_PASSWORD="Tilashmi@2081"
```

To change the admin password after the first login, edit `ADMIN_PASSWORD` in `.env` and re-run
`npm run db:seed` (it upserts the admin user), or add a password-reset screen later.

## Environment Variables (`.env`)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Supabase Postgres connection string — **Transaction pooler** (port 6543), used by the app at runtime. Includes `?pgbouncer=true&connection_limit=5&pool_timeout=30` since PgBouncer needs that mode flag |
| `DIRECT_URL` | Supabase Postgres — **Session pooler** (port 5432), used only by `prisma db push`/migrations |
| `JWT_SECRET` | Signs admin session cookies — **change this in production** |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin credentials |
| `NEXT_PUBLIC_SITE_URL` | Used for metadata, sitemap and Open Graph URLs |

> Note: Supabase's **Direct connection** (`db.<ref>.supabase.co:5432`) is IPv6-only and may be
> unreachable from IPv4-only networks/hosts — that's why this project uses the IPv4-compatible
> pooler endpoints (`aws-0-<region>.pooler.supabase.com`) for both `DATABASE_URL` and `DIRECT_URL`.

## Adding the Real Logo

The navbar and footer show a placeholder "T" mark until a logo is uploaded. Once you have the
official TILASHMI logo file, go to **Admin → Settings → Branding** and upload it — it updates
the whole site instantly, along with the favicon.

## Content You Can Manage from `/admin`

- **Hero** — heading, subtitle, background image or video
- **About** — intro, vision, passion, journey, meaning of Tilashmi, positive message, establishment dates, and the animated timeline
- **Members** — add/remove/edit members, photos, roles, bios, social links
- **Group Photo** — full-width band photo + caption
- **Gallery** — unlimited photo uploads across Concerts / Rehearsals / Behind the Scenes / Studio, masonry layout with lightbox
- **Music** — albums, singles, upcoming releases, cover art, streaming links (Spotify/YouTube/Apple Music)
- **Events** — upcoming and past shows, auto-sorted by date, ticket links
- **News** — blog-style posts with images, draft/publish toggle
- **Messages** — inbox for the public contact form
- **Settings** — logo, favicon, SEO metadata, social links, contact details, footer text

## Database (Supabase)

This project runs on a Supabase Postgres database. To point it at a different Supabase project
(or plain Postgres instance):

1. Set `DATABASE_URL` (pooled, for the running app) and `DIRECT_URL` (direct/session, for schema
   changes) in `.env`
2. Run `npm run db:push` to sync `prisma/schema.prisma` to the new database
3. Run `npm run db:seed` to create the admin user and initial content

For versioned migrations instead of `db push`, switch to `prisma migrate dev` / `prisma migrate deploy`.

## Swapping Local Uploads → Cloudinary (or S3)

Uploads currently save to `public/uploads` via `src/app/api/upload/route.ts`. To use Cloudinary:

1. `npm install cloudinary`
2. Replace the `writeFile` logic in `src/app/api/upload/route.ts` with a Cloudinary upload call
3. Return the Cloudinary secure URL instead of the local `/uploads/...` path

Everything downstream (image fields, `<img>` tags) already just stores and renders a URL string,
so this is a contained change.

## Project Structure

```
src/
  app/
    (site)/            Public pages (home, about, members, gallery, music, events, news, contact)
    admin/
      (auth)/login/    Admin login (no sidebar)
      (dashboard)/     Protected admin screens (sidebar layout)
    api/               Route handlers: contact form, uploads, admin auth
  components/
    ui/                Design-system primitives (Button, Section, Reveal, glow effects, icons)
    layout/            Navbar, Footer, page transitions, scroll-to-top
    sections/          Public page sections (Hero, MemberCard, ReleaseCard, EventRow, etc.)
    admin/              Admin form fields, image uploader, sidebar, save/delete buttons
  lib/
    actions/           Server Actions for all admin mutations
    data.ts            Server-side data fetchers for public pages
    auth.ts            Session creation/verification
    prisma.ts           Prisma client singleton
  proxy.ts             Route protection for /admin/* (Next.js "proxy"/middleware convention)
prisma/
  schema.prisma         Database schema
  seed.ts               Initial content seed
```

## Production Build

```bash
npm run build
npm start
```

## Deployment Notes

- The Supabase Postgres database works on any host, including serverless (Vercel). Just carry
  `DATABASE_URL` and `DIRECT_URL` over as environment variables in your hosting provider.
- On serverless hosts the filesystem is ephemeral, so `/public/uploads` won't persist between
  deploys — switch uploads to Cloudinary/S3/Supabase Storage before deploying there (see above).
  A traditional persistent server (VPS, Railway, Fly.io) doesn't have this issue.
- Set a strong, random `JWT_SECRET` and a strong `ADMIN_PASSWORD` before going live.
- Update `NEXT_PUBLIC_SITE_URL` to the real production domain for correct sitemap/SEO URLs.
