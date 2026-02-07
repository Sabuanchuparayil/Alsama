#!/bin/bash

# Clean Next.js build and cache
echo "Cleaning Next.js cache and build files..."
rm -rf .next
rm -rf node_modules
rm -rf package-lock.json
rm -rf tsconfig.tsbuildinfo

# Reinstall dependencies
echo "Installing dependencies..."
npm install

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

echo "Clean install complete! Run 'npm run dev' to start the development server."
