# AL SAMA - Luxury Tourism & Chauffeur

A modern Next.js application for AL SAMA Luxury Tourism & Chauffeur service, featuring premium vehicle rentals and professional chauffeur services in Dubai.

## 🚀 Features

### Public Features
- **Home Page**: Dynamic hero section and homepage sections managed via CMS
- **Our Fleet**: Browse luxury vehicles by category (SUVs, Sedans, Sports)
- **Services**: 
  - Airport Transfers
  - City Tours
  - Corporate Hire
  - Wedding Services
- **About Us**: Company information and service highlights
- **Contact**: Contact form and company details
- **Booking**: Online booking form for reservations

### Admin Features
- **CMS (Content Management System)**: Manage vehicles, services, pages, hero content, and homepage sections
- **Booking Management**: View and manage customer bookings with status updates
- **Image Upload**: Upload images via Supabase Storage integration
- **Authentication**: Secure admin login with NextAuth.js

## 🛠 Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom luxury theme (red/black)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **Image Storage**: Supabase Storage (optional)
- **Deployment**: Railway-ready configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or Railway)
- npm or yarn package manager

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Sabuanchuparayil/Alsama.git
cd Alsama
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
Create a `.env.local` file in the root directory:
```env
# NextAuth (REQUIRED)
NEXTAUTH_SECRET=your-random-secret-key-here-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Database (REQUIRED)
DATABASE_URL=postgresql://user:password@host:port/database?schema=public

# Optional: Supabase Storage
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_STORAGE_BUCKET=alsama-images
```

4. **Set up the database**:
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Create admin user
ADMIN_EMAIL=admin@alsama.ae ADMIN_PASSWORD=YourSecurePass123! npm run create-admin
```

5. **Run the development server**:
```bash
npm run dev
```

6. **Open** [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

### Check Setup

Run the diagnostic script to verify your setup:
```bash
npm run check-setup
```

## 📁 Project Structure

```
/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with Header/Footer
│   ├── page.tsx                 # Home page
│   ├── admin/                   # Admin panel
│   │   ├── login/               # Admin login
│   │   ├── content/            # CMS pages
│   │   └── bookings/           # Booking management
│   ├── api/                     # API routes
│   │   ├── auth/               # NextAuth routes
│   │   ├── cms/                # CMS API endpoints
│   │   ├── booking/            # Booking API
│   │   └── upload/             # Image upload
│   ├── about/                   # About Us page
│   ├── fleet/                   # Fleet page
│   ├── services/                # Services pages
│   ├── contact/                 # Contact page
│   └── book/                    # Booking page
├── components/                   # React components
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Footer component
│   ├── HeroClient.tsx          # Dynamic hero section
│   ├── FleetGridClient.tsx      # Vehicle grid (CMS-powered)
│   ├── ServicesClient.tsx       # Services (CMS-powered)
│   ├── BookingForm.tsx          # Booking form
│   └── admin/                   # Admin components
├── lib/                         # Utilities
│   ├── db/                     # Prisma client
│   ├── auth.ts                 # Authentication utilities
│   ├── auth-config.ts          # NextAuth configuration
│   └── data.ts                 # Default data
├── prisma/                      # Database schema
│   └── schema.prisma           # Prisma schema
├── scripts/                     # Utility scripts
│   ├── create-admin.ts         # Create admin user
│   ├── seed-homepage-sections.ts # Seed homepage data
│   └── check-setup.ts          # Diagnostic script
└── public/                      # Static assets
    └── images/                  # Image assets
```

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete Railway deployment guide
- **[CMS_GUIDE.md](./CMS_GUIDE.md)** - CMS usage instructions
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[GIT_SETUP.md](./GIT_SETUP.md)** - Git and GitHub setup
- **[ENV_SETUP.md](./ENV_SETUP.md)** - Environment variables guide

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Login with admin credentials
3. Access CMS to manage:
   - Vehicles
   - Services
   - Pages
   - Hero Section
   - Homepage Sections
   - Bookings

## 🚢 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed Railway deployment instructions.

Quick steps:
1. Push code to GitHub
2. Connect Railway to GitHub repo
3. Add PostgreSQL database on Railway
4. Set environment variables
5. Run migrations
6. Create admin user

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run migrate` - Run database migrations (production)
- `npm run migrate:dev` - Run database migrations (development)
- `npm run create-admin` - Create admin user
- `npm run seed-homepage` - Seed homepage sections
- `npm run check-setup` - Diagnostic script to check setup

## 🐛 Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.

Quick fixes:
- **Admin login error**: Check `.env.local` has `NEXTAUTH_SECRET`
- **500 errors**: Verify `DATABASE_URL` is set and database is accessible
- **Database errors**: Run `npx prisma generate` and `npx prisma migrate dev`

## 📞 Contact Information

- **Email**: info@alsama.ae
- **Phone**: +971 4 123 4567
- **Location**: Dubai, United Arab Emirates

## 📄 License

© 2026 AL SAMA. All Rights Reserved.

## 🔗 Links

- **GitHub Repository**: https://github.com/Sabuanchuparayil/Alsama
- **Deployment**: Configured for Railway.app
