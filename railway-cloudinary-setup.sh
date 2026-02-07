#!/bin/bash

# Cloudinary Railway Setup Script
# This script helps you add Cloudinary environment variables to Railway

echo "🚀 Cloudinary Railway Setup"
echo "============================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI not found!${NC}"
    echo ""
    echo "Install Railway CLI:"
    echo "  npm install -g @railway/cli"
    echo ""
    echo "Or add variables manually via Railway Dashboard:"
    echo "  https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1"
    echo ""
    exit 1
fi

echo -e "${YELLOW}⚠️  Important: Verify your Cloudinary cloud name first!${NC}"
echo "   Cloud names are usually lowercase (e.g., 'al-sama' or 'alsama')"
echo "   Check your Cloudinary dashboard: https://console.cloudinary.com"
echo ""
read -p "Enter your Cloudinary Cloud Name (e.g., al-sama): " CLOUD_NAME

if [ -z "$CLOUD_NAME" ]; then
    echo -e "${RED}❌ Cloud name is required!${NC}"
    exit 1
fi

echo ""
echo "📝 Adding Cloudinary variables to Railway..."
echo ""

# Add variables
railway variables set CLOUDINARY_CLOUD_NAME="$CLOUD_NAME" && \
    echo -e "${GREEN}✅ CLOUDINARY_CLOUD_NAME set${NC}" || \
    echo -e "${RED}❌ Failed to set CLOUDINARY_CLOUD_NAME${NC}"

railway variables set CLOUDINARY_API_KEY="1722117493324765" && \
    echo -e "${GREEN}✅ CLOUDINARY_API_KEY set${NC}" || \
    echo -e "${RED}❌ Failed to set CLOUDINARY_API_KEY${NC}"

railway variables set CLOUDINARY_API_SECRET="RheiMmu93XDaYKoG06b0M1c6N8" && \
    echo -e "${GREEN}✅ CLOUDINARY_API_SECRET set${NC}" || \
    echo -e "${RED}❌ Failed to set CLOUDINARY_API_SECRET${NC}"

echo ""
echo -e "${GREEN}✅ Cloudinary variables added!${NC}"
echo ""
echo "🔄 Railway will automatically redeploy..."
echo ""
echo "📝 Next steps:"
echo "   1. Wait for Railway to redeploy (2-5 minutes)"
echo "   2. Verify configuration: railway run npm run verify-cloudinary"
echo "   3. Test image upload in admin panel"
echo ""
