# ServiceBot - AI-Powered Service Business OS

The AI-first operating system for HVAC, plumbing, and service businesses. Automate bookings, manage customers, and dispatch technicians — all from one dashboard.

## Features

### AI Booking Chatbot
- Instant responses to customer inquiries
- Qualifies leads and provides pricing
- Books appointments automatically
- Website widget (SMS & Facebook ready)

### CRM Dashboard
- Customer profiles with contact info and job history
- Pipeline view: New Lead → Booked → In Progress → Completed → Paid
- Conversation history per customer
- Search and filter by source

### Dispatch Calendar
- Weekly calendar view with time slots
- Technician assignment and workload overview
- Unassigned jobs sidebar
- Job detail modals

### Invoicing & Payments
- Create invoices from completed jobs
- Track draft, sent, paid, and overdue status
- Revenue summary (collected, pending, overdue)
- Stripe payment link integration (coming soon)

### Reporting
- Revenue tracking with trends
- Jobs completed count
- Lead-to-completion conversion rate
- Customer acquisition by source

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL) — works with mock data out of the box
- **AI**: OpenAI GPT-4o-mini — smart fallback responses when no API key configured
- **Icons**: Lucide React
- **Auth**: Supabase Auth (demo mode included)

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/Eastleigh/servicebot.git
cd servicebot
npm install
```

### Configuration (Optional)

Copy the environment template:

```bash
cp .env.example .env.local
```

The app works fully with mock data — no API keys required for development. To enable AI-powered chat, add your OpenAI key. To connect to a real database, add Supabase credentials.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page. Click **View Demo** or navigate to `/dashboard` to explore the full dashboard.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login and signup pages
│   ├── (dashboard)/      # Dashboard layout and pages
│   │   ├── dashboard/    # Overview with stats and reporting
│   │   ├── customers/    # CRM with customer cards and detail views
│   │   ├── jobs/         # Pipeline and list view for jobs
│   │   ├── dispatch/     # Calendar-based dispatch system
│   │   ├── invoices/     # Invoicing and payment tracking
│   │   └── settings/     # Business, AI, and integration config
│   ├── api/              # API routes (chat, customers, jobs, invoices)
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── ChatWidget.tsx    # AI chatbot widget
│   ├── PipelineView.tsx  # Kanban-style job pipeline
│   ├── CalendarView.tsx  # Weekly dispatch calendar
│   └── StatsCard.tsx     # Dashboard stat cards
└── lib/                  # Utilities and data
    ├── types.ts          # TypeScript types
    ├── mock-data.ts      # Demo data
    └── supabase.ts       # Supabase client + schema
```

## Database Schema

See `src/lib/supabase.ts` for the full Supabase SQL schema. Tables:
- `customers` — contact info, source tracking
- `technicians` — team members with specialties
- `jobs` — service jobs with status pipeline
- `conversations` — chat threads per customer
- `messages` — individual messages in conversations
- `invoices` — billing with status tracking

## Deployment

Deploy to Vercel:

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to [Vercel](https://vercel.com) for automatic deployments.

## Roadmap

- **Phase 1** (Current): AI Booking + CRM + Dispatch + Invoicing
- **Phase 2**: Stripe payments, Twilio SMS, real-time notifications
- **Phase 3**: AI follow-ups, smart pricing, upsell automation

## License

MIT
