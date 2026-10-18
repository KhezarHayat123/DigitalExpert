# 🚀 DigitalExpert — Official Agency & Institute Web Platform

> **Live Domain:** `digitalexpert.pk`  
> **Headquarters:** University Chowk, Bahawalpur, Punjab 63100, Pakistan  
> **Direct Support:** WhatsApp `0312-4051296` | Email `info@digitalexpert.pk`  
> **Tech Stack:** Next.js 14 (App Router) • React 18 • TypeScript • Tailwind CSS • Framer Motion • Lucide Icons • Jose JWT

---

## 🌟 Executive Summary

DigitalExpert is Bahawalpur's premier Digital Marketing Agency and Hands-on IT Training Institute, founded and led by **Khezar Hayat** and managed by **Umar Farooq**.

This modern web application is engineered for speed, high conversion rates, and seamless administrative management. It features a WordPress-style administrative panel (`/admin`) that empowers non-technical staff to manage courses, services, case studies, admissions, inquiries, payment proofs, and site settings without touching code.

---

## 🎨 Visual Identity & Brand System

Designed following strict design specifications:
- **Theme:** Exclusively Light Mode (no dark mode toggle).
- **Color Palette:**
  - **Olive Green (`#6A9A00`):** Dominant brand tone for courses, badges, success states, and CTAs.
  - **Amber / Honey (`#FFAA1D`):** Accent tone for highlights, hero badges, star ratings, and secondary buttons.
  - **Ink Black (`#0B0B09`):** Primary text, hard borders (`border-2 border-de-black`), and brutalist shadows (`shadow-hard`).
  - **Warm White (`#F7F5EF`):** Subtle section background contrast and card fills.
  - **Body Text (`#14140F`):** High-readability font rendering.
  - **Muted Text (`#5A5850`):** Secondary descriptions and meta indicators.
  - **Border Gray (`#E5E0D2`):** Subtle dividers and card inner lines.
- **Typography:**
  - Headings: `Sora` (700 Bold, 800 ExtraBold).
  - Body: `Plus Jakarta Sans` (400 Regular, 600 SemiBold, 700 Bold).

---

## 🧭 Navigation Architecture

The public header contains **exactly 6 menu items** (no dropdown menus):
1. **Home** (`/`)
2. **Services** (`/services`)
3. **Courses** (`/courses`)
4. **About Us** (`/about`)
5. **Contact Us** (`/contact`)
6. **Completed Projects** (`/projects`)

### Additional Public & Legal Routes
- **Enrollment / Admission:** `/enroll`
- **Course Detail:** `/courses/[slug]` (`wordpress`, `social-media`, `google-tiktok-ads`, `video-ads`, `seo`, `youtube-automation`)
- **Service Detail:** `/services/[slug]` (`wordpress`, `seo`, `social-media`, `google-tiktok-ads`, `video-ads`, `youtube-automation`)
- **Frequently Asked Questions:** `/faq`
- **Legal Policies:** `/legal/[slug]` (`privacy`, `terms`, `refund`, `code-of-conduct`, `fee-payment`)
- **Admin Dashboard:** `/admin` (Redirects to `/admin/login` if not authenticated)

---

## 💎 Key Features

### 1. Self-Animating Page Heroes
Every single page features an animated visual illustration that loops and engages visitors immediately without requiring click interaction:
- **Home:** Rotating live statistics, pulsing status badges, and animated tool icons.
- **Services:** Interactive service card visual with conversion graphs and analytics markers.
- **Courses:** Orbiting tool badges and student milestone visual.
- **About Us:** Experience badge, verified student counter, and campus imagery.
- **Contact Us:** Animated WhatsApp chat simulation with realistic message bubble timing.
- **Enrollment:** 4-step interactive admission flow walkthrough.

### 2. Custom Cursor Experience
- **Desktop Only:** Smooth trailing amber ring + central black dot.
- Automatically transitions to green on hoverable elements.
- Transitions to an inverted white dot when hovering over dark menu buttons.
- Fully disabled on touchscreen devices (`pointer: coarse`).

### 3. Admissions & Payment Proof System
- Students select only from valid, active courses with transparent PKR fees.
- **Strict Verification:** Submitting an application requires uploading a real payment receipt (screenshot in JPG, PNG, WebP, or PDF $\le 5$ MB).
- **Private Storage:** Screenshots are saved in a protected directory (`data/private-uploads/`) that is never served publicly via static routes.
- **Authenticated Streaming:** Only logged-in administrators can view or download receipts via `/api/admin/private-image?file=...`.
- **One-Click Admission Approval:** Admin clicks "Confirm Admission", marking the seat as reserved, updating payment verification, and triggering:
  - An official confirmation email to the student.
  - A pre-filled WhatsApp link to immediately welcome the student into the class group.

### 4. Sticky Sidebars on Detail Pages
Both `/courses/[slug]` and `/services/[slug]` feature a fixed sidebar with the exact required actions:
- **WhatsApp Button:** Launches direct chat with pre-filled message including course/service title.
- **Action Button:** Quick access to `/enroll?course=[slug]` or `/contact?service=[slug]`.

---

## 🔐 WordPress-Style Admin Panel (`/admin`)

Access the admin suite by navigating to:
```
http://localhost:3000/admin
```

### Default Credentials
- **Email:** `admin@digitalexpert.pk`
- **Password:** `DigitalExpertAdmin2026!`
- **Role:** Super Administrator

### Secondary Manager Account
- **Email:** `manager@digitalexpert.pk`
- **Password:** `DigitalExpertAdmin2026!`
- **Role:** Manager

### 11 Fully Managed Collections
1. **Admissions & Enrollments:** Filter by status (`New`, `Under Review`, `Confirmed`, `Rejected`), inspect private payment screenshots in a modal, confirm admissions, and export to CSV.
2. **Contact Inquiries:** View, mark as read/replied, and reply via WhatsApp or email.
3. **Courses:** Manage fees, schedules, instructors, tools, modules, and publish/unpublish toggles.
4. **Services:** Manage package pricing, features, turnaround time, deliverables, and slug configuration.
5. **Completed Projects:** Manage portfolio showcase, client names, metrics, tags, and external live URLs.
6. **Testimonials:** Manage student/client ratings, reviews, photos, and designations.
7. **Team Members:** Manage instructor profiles, social handles, and roles.
8. **FAQs:** Filterable by category (`courses`, `services`, `payments`, `general`).
9. **CMS Pages & Policies:** Manage Terms of Service, Privacy Policy, Refund Policy, Fee Structure, and Code of Conduct.
10. **Media Library:** Upload and organize image assets with auto-generated URLs.
11. **Site Settings & Payment Accounts:** Update campus phone numbers, WhatsApp, Google Maps embed, announcement bar text, and JazzCash/EasyPaisa/Bank account numbers displayed on the enrollment page.

### Security & Auditing
- **Brute Force Lockout:** 5 consecutive failed login attempts trigger an automatic 15-minute IP/account lockout.
- **Audit Logging:** Every administrative action (saves, deletions, status changes) is logged with timestamps and administrator email.
- **Role-Based Access Control (RBAC):**
  - `admin`: Full system control including user management and system settings.
  - `editor`: Content and project editing.
  - `manager`: Admissions, messages, and student verification.

---

## 🛠️ Local Development & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v20.x or v24.x LTS
- npm v10.x or higher

### 1. Clone & Enter Directory
```powershell
cd "c:\Users\Hp\Desktop\New website\DigitalExpert New LOOK"
```

### 2. Environment Setup (PowerShell)
If Node.js is installed in `C:\Program Files\nodejs`, ensure it is in your session path:
```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
```

### 3. Install Dependencies
```powershell
npm install
```

### 4. Run Development Server
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Start
```powershell
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── data/
│   ├── db.json                     # Atomic JSON database
│   └── private-uploads/            # Private student payment screenshots (protected)
├── public/
│   ├── brand/                      # Official transparent logos and founder photos
│   └── images/
│       ├── courses/                # Olive green 16:10 course vector illustrations
│       └── services/               # Amber 16:10 service vector illustrations
├── src/
│   ├── app/
│   │   ├── (public pages)
│   │   │   ├── page.tsx            # Home page
│   │   │   ├── about/page.tsx      # About Us + Team section
│   │   │   ├── courses/            # Course listing and [slug] details
│   │   │   ├── services/           # Service listing and [slug] details
│   │   │   ├── projects/page.tsx   # Filterable portfolio showcase
│   │   │   ├── contact/page.tsx    # Contact channels + Google Map embed
│   │   │   ├── enroll/page.tsx     # 4-step admission form + screenshot upload
│   │   │   ├── faq/page.tsx        # Searchable FAQ accordion
│   │   │   └── legal/[slug]/       # Dynamic legal policy renderer
│   │   ├── admin/                  # WordPress-style admin panel
│   │   │   ├── page.tsx            # Analytics dashboard
│   │   │   ├── login/page.tsx      # Brute-force protected admin login
│   │   │   ├── enrollments/        # Admission & screenshot verification
│   │   │   ├── messages/           # Contact inbox
│   │   │   ├── courses/            # Course manager
│   │   │   ├── services/           # Service manager
│   │   │   ├── projects/           # Portfolio manager
│   │   │   ├── team/               # Team manager
│   │   │   ├── testimonials/       # Review manager
│   │   │   ├── faqs/               # FAQ manager
│   │   │   ├── pages/              # CMS pages manager
│   │   │   ├── media/              # Media asset manager
│   │   │   ├── users/              # User accounts & RBAC
│   │   │   ├── settings/           # Global site & payment accounts
│   │   │   └── guide/              # Admin training handbook
│   │   └── api/                    # Serverless API routes
│   │       ├── auth/               # Login, logout, session verification
│   │       ├── admin/              # CRUD endpoints, private-image streamer
│   │       ├── contact/            # Inquiry handler with email alerts
│   │       └── enroll/             # Multipart admission handler
│   ├── components/                 # Reusable UI components & heroes
│   └── lib/
│       ├── db.ts                   # Atomic JSON data store engine
│       ├── seedData.ts             # Complete default Pakistani agency seed
│       ├── types.ts                # TypeScript interfaces
│       ├── auth.ts                 # JWT signing & brute force limiter
│       └── email.ts                # Email notification dispatcher
```

---

## 💾 Backup & Data Persistence

The entire website data is preserved inside the `data/` directory:
- `data/db.json`: Contains all courses, services, projects, enrollments, messages, users, and audit logs.
- `data/private-uploads/`: Contains all uploaded student fee payment screenshots.

**To create a complete backup:**
Simply copy or zip the `data/` folder:
```powershell
Compress-Archive -Path data -DestinationPath "digitalexpert_backup_$(Get-Date -Format 'yyyyMMdd').zip"
```

---

## 🚀 Deployment Guide (Vercel / VPS)

### Deploying to Vercel
1. Push repository to GitHub or GitLab.
2. Import project into [Vercel](https://vercel.com).
3. In Project Settings > Environment Variables, configure:
   ```env
   PAYLOAD_SECRET=your_long_random_jwt_secret_key
   MAIL_HOST=smtp.titan.email
   MAIL_PORT=465
   MAIL_USER=info@digitalexpert.pk
   MAIL_PASS=your_email_password
   MAIL_FROM="DigitalExpert Notifications <info@digitalexpert.pk>"
   MAIL_TO=info@digitalexpert.pk
   ```
4. Deploy! The application uses dynamic serverless routes for admin API endpoints and static prerendering for marketing pages.

### Deploying to a Linux VPS (Ubuntu / Nginx / PM2)
```bash
git clone <repo-url> /var/www/digitalexpert
cd /var/www/digitalexpert
npm install
npm run build
pm2 start npm --name "digitalexpert" -- run start -- -p 3000
pm2 save
pm2 startup
```

---

## 📞 Support & Inquiries
- **Campus Address:** University Chowk, Bahawalpur, Punjab, Pakistan
- **Phone / WhatsApp:** `+92 312 4051296`
- **Email:** `info@digitalexpert.pk`
- **Website:** [digitalexpert.pk](https://digitalexpert.pk)
