# Foundry

Foundry is an AI-powered founder copilot for solo founders and indie hackers. It helps users move from idea to execution with startup validation, MVP prompts, SEO strategy, growth content, conversion suggestions, and step-by-step plans.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- shadcn-style UI primitives
- Framer Motion-ready UI, Recharts dashboard metrics
- Supabase auth and Postgres persistence
- OpenAI generation APIs with deterministic fallbacks
- Vercel-native deployment

## Local Setup

```bash
npm install
npm run dev
```

Required environment variables:

```bash
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Foundry
```

`SUPABASE_SERVICE_ROLE_KEY` is reserved for future server-only admin workflows. Current app persistence uses user-scoped Supabase auth and RLS.

## Supabase

The migration in `supabase/migrations/20260527070639_foundry_core.sql` creates:

- `profiles`
- `projects`
- `analyses`
- `growth_plans`
- `generated_posts`
- `project_events`

Every table has owner-scoped row level security.

## Production Checks

```bash
npm run lint
npm run build
```

Deploy on Vercel with the environment variables above. Set `NEXT_PUBLIC_APP_URL` to the production URL after deployment.
