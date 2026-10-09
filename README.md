# SCROLL△CLOSET

> **Wear more. Buy less.** — Fashion in circulation.

A premium social fashion rental prototype. Scroll Closet is a peer-to-peer
fashion rental platform combined with a social fashion feed and a creator
marketplace. Users discover outfits worn by real people, rent the looks they
love, wear them, return them, and list their own clothes for others to rent.

**Core loop:** Discover → Rent → Wear → Share → Return → Repeat

## Tech stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** (custom cream / cobalt / ember editorial theme)
- **Lucide React** icons
- Local **JSON mock data** (`/data`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Discover feed** with category filters and search
- **Airbnb-style rental modal** — sizes, dates, delivery/pickup, estimated
  total and a success state
- **My Closet dashboard** — items, status filtering, rentals and earnings
- **List an Outfit modal** with a live preview card
- **Creator profiles** + follow / unfollow
- **Social interactions** — like, comment (drawer), share
- **Messages** — realistic two-pane chat with sample conversations
- **Rental history** — current / upcoming / completed
- **Sustainability** editorial section
- Fully responsive with a mobile navigation drawer, smooth scrolling and hover
  animations

## Structure

```
app/
  page.tsx            Home / Discover
  discover/           Full discover feed + search
  rent/               Rental history
  closet/             My Closet dashboard
  messages/           Chat interface
  creators/           Creator marketplace + [id] profiles
  profile/            Your own profile
components/            Navbar, OutfitCard, RentalModal, CreatorCard, …
data/                 outfits, creators, rentals, messages, closet (JSON)
lib/                  types + data helpers
```

> This is a front-end prototype. Data is mocked and interactions are
> session-only (no backend).
