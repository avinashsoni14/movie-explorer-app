# Deployment Guide

This document outlines the recommended deployment architecture and best practices for the Movie Explorer application.

## Deployment Architecture

###  Vercel/Netlify (Recommended for Small to Medium Scale, very easy to configure)

The simplest and most cost-effective deployment solution for this static web application is using Vercel or Netlify:

1. **Benefits:**
   - Zero configuration deployment
   - Automatic HTTPS
   - Global CDN
   - Automatic CI/CD
   - Branch previews
   - Easy rollbacks
   - Free tier available

2. **Setup Steps:**
   - Connect your GitHub repository
   - Configure build settings:
     ```
     Build Command: npm run build
     Output Directory: dist
     ```
   - Add environment variables (REACT_APP_BASE_URL, REACT_APP_OMDB_API_KEY)
   - Deploy

## CI/CD Pipeline Recommendations

### GitHub Actions Pipeline

```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test

    - name: Build
      run: npm run build
      env:
        REACT_APP_BASE_URL: ${{ secrets.BASE_URL }}
        REACT_APP_OMDB_API_KEY: ${{ secrets.OMDB_API_KEY }}

    - name: Deploy to Vercel
      if: github.ref == 'refs/heads/main'
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```
