#!/bin/bash

# Create public directory if it doesn't exist
mkdir -p public

# Copy all static files to public directory
cp -r *.html public/
cp -r *.css public/
cp -r *.js public/
cp -r *.ico public/
cp -r src/ public/
cp -r api/ public/

# Copy package.json for dependencies
cp package.json public/

echo "Build completed - files copied to public directory" 