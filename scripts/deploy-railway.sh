#!/bin/bash

# AL SAMA - Railway Deployment Completion Script
# Run this after linking your Railway project

set -e

echo "🚀 AL SAMA Railway Deployment Script"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI not found. Installing...${NC}"
    npm install -g @railway/cli
fi

# Check if logged in
if ! railway whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Railway. Please run: railway login${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Logged in to Railway${NC}"
echo ""

# Check if project is linked
if ! railway status &> /dev/null; then
    echo -e "${YELLOW}⚠️  Project not linked.${NC}"
    echo "Please run: railway link"
    echo "Then select your 'alsama' project"
    exit 1
fi

echo -e "${GREEN}✅ Project linked${NC}"
echo ""

# Step 1: Get Database URL
echo "📊 Step 1: Getting Database URL..."
DATABASE_URL=$(railway variables --json | jq -r '.[] | select(.name == "DATABASE_URL") | .value' 2>/dev/null || echo "")

if [ -z "$DATABASE_URL" ]; then
    echo -e "${YELLOW}⚠️  DATABASE_URL not found in Railway variables${NC}"
    echo "Please add DATABASE_URL from your PostgreSQL service in Railway dashboard"
    echo "Then run this script again"
    exit 1
fi

echo -e "${GREEN}✅ Database URL found${NC}"
echo ""

# Step 2: Generate NEXTAUTH_SECRET if not exists
echo "🔐 Step 2: Checking NEXTAUTH_SECRET..."
NEXTAUTH_SECRET=$(railway variables --json | jq -r '.[] | select(.name == "NEXTAUTH_SECRET") | .value' 2>/dev/null || echo "")

if [ -z "$NEXTAUTH_SECRET" ]; then
    echo -e "${YELLOW}⚠️  NEXTAUTH_SECRET not found. Generating...${NC}"
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    railway variables set NEXTAUTH_SECRET="$NEXTAUTH_SECRET"
    echo -e "${GREEN}✅ NEXTAUTH_SECRET generated and set${NC}"
else
    echo -e "${GREEN}✅ NEXTAUTH_SECRET already set${NC}"
fi
echo ""

# Step 3: Get NEXTAUTH_URL
echo "🌐 Step 3: Setting NEXTAUTH_URL..."
APP_URL=$(railway domain 2>/dev/null | head -1 | awk '{print $1}' || echo "")

if [ -z "$APP_URL" ]; then
    echo -e "${YELLOW}⚠️  No domain found. Please generate a domain in Railway dashboard${NC}"
    echo "Or set NEXTAUTH_URL manually: railway variables set NEXTAUTH_URL=https://your-app.railway.app"
    read -p "Enter your Railway app URL (e.g., https://alsama-production.up.railway.app): " APP_URL
fi

if [ ! -z "$APP_URL" ]; then
    railway variables set NEXTAUTH_URL="$APP_URL"
    echo -e "${GREEN}✅ NEXTAUTH_URL set to: $APP_URL${NC}"
fi
echo ""

# Step 4: Run Database Migrations
echo "🗄️  Step 4: Running database migrations..."
railway run npx prisma migrate deploy
echo -e "${GREEN}✅ Migrations completed${NC}"
echo ""

# Step 5: Generate Prisma Client
echo "🔧 Step 5: Generating Prisma Client..."
railway run npx prisma generate
echo -e "${GREEN}✅ Prisma Client generated${NC}"
echo ""

# Step 6: Create Admin User
echo "👤 Step 6: Creating admin user..."
read -p "Enter admin email (default: admin@alsama.ae): " ADMIN_EMAIL
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@alsama.ae}

read -sp "Enter admin password (min 8 chars): " ADMIN_PASSWORD
echo ""

if [ -z "$ADMIN_PASSWORD" ]; then
    echo -e "${RED}❌ Password cannot be empty${NC}"
    exit 1
fi

export ADMIN_EMAIL="$ADMIN_EMAIL"
export ADMIN_PASSWORD="$ADMIN_PASSWORD"
railway run npx tsx scripts/create-admin.ts

echo -e "${GREEN}✅ Admin user created${NC}"
echo ""
echo -e "${GREEN}📧 Admin Email: $ADMIN_EMAIL${NC}"
echo -e "${YELLOW}⚠️  IMPORTANT: Save these credentials securely!${NC}"
echo ""

# Step 7: Deploy
echo "🚀 Step 7: Deploying application..."
railway up
echo ""

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo "Next steps:"
echo "1. Visit your app: $APP_URL"
echo "2. Login to admin: $APP_URL/admin/login"
echo "3. Add initial content (vehicles, services)"
echo "4. Configure custom domain (optional)"
echo ""
