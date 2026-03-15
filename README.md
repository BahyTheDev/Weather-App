# Meteora - Modern Weather Dashboard

A beautiful, responsive weather dashboard built with Next.js 16, TypeScript, and Tailwind CSS. Features real-time weather data from Open-Meteo with a stunning glassmorphism UI.

![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-181717?logo=github)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

## Features

- 🌤️ Real-time weather data from Open-Meteo API
- 🎨 Modern glassmorphism design with weather-responsive backgrounds
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔍 City search with geocoding
- 📍 Geolocation support
- 🌓 Dark/light mode compatible
- ⚡ Static export for GitHub Pages hosting
- 🔒 Security headers and best practices

## Quick Start

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The static site will be generated in the `out/` directory.

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Enable GitHub Pages in Repository Settings**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Build and deployment**, select:
     - Source: **GitHub Actions**
   - Click **Save**

3. **Automatic Deployment**
   - Once you push to the `main` branch, the GitHub Actions workflow will:
     - Install dependencies
     - Build the static site
     - Deploy to GitHub Pages

4. **Access Your Site**
   - After deployment completes, your site will be live at:
     ```
     https://YOUR_USERNAME.github.io/REPO_NAME/
     ```

### Manual Trigger

You can also manually trigger a deployment from the "Actions" tab in your GitHub repository.

## Project Structure

```
weather-app/
├── app/
│   ├── layout.tsx          # Root layout with QueryProvider
│   ├── page.tsx            # Main page with hero section
│   ├── globals.css         # Global styles
│   └── middleware.ts       # Security headers middleware
├── components/
│   ├── weather/
│   │   ├── current-weather/  # Hero weather display
│   │   ├── hourly-forecast/  # 12-hour forecast
│   │   └── daily-forecast/   # 7-day forecast
│   ├── shared/
│   │   ├── location-search.tsx
│   │   ├── unit-toggle.tsx
│   │   └── weather-icon.tsx
│   └── providers/
│       └── query-provider.tsx
├── lib/
│   ├── api/
│   │   ├── open-meteo.ts   # Direct API calls (client-side)
│   │   └── types.ts        # TypeScript definitions
│   ├── config/             # Centralized configuration
│   ├── hooks/
│   │   ├── use-geolocation.ts
│   │   ├── use-local-storage.ts
│   │   └── use-weather.ts
│   └── utils/
│       ├── format.ts       # Date/temp formatting
│       └── weather-codes.ts # WMO code mapping
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
├── out/                    # Static output (generated)
├── next.config.ts          # Next.js configuration
└── package.json
```

## Technologies Used

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui
- **Icons:** Lucide React
- **Data Fetching:** TanStack Query (React Query)
- **API:** Open-Meteo (free, no API key required)
- **Deployment:** GitHub Pages

## Configuration

### Environment Variables

No environment variables required! Open-Meteo is a free API that doesn't need authentication.

### Customization

- **Colors:** Modify gradients in `app/page.tsx` → `getBackgroundStyle()`
- **Weather codes:** Update mappings in `lib/utils/weather-codes.ts`
- **API:** Change base URL in `lib/config/index.ts`

## Security Features

- ✅ Content Security Policy (CSP) headers
- ✅ XSS protection
- ✅ Clickjacking prevention
- ✅ Input validation & sanitization
- ✅ No hardcoded secrets
- ✅ Rate limiting ready (Upstash integration possible)

See [SECURITY_AUDIT.md](./SECURITY_AUDIT.md) for full security report.

## Performance

- Static site generation for optimal loading
- React Query caching (10-minute stale time)
- Image optimization disabled for static export
- Code splitting via Next.js
- Bundle analysis available via `npm run build`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the MIT License.

## Credits

- Weather data: [Open-Meteo](https://open-meteo.com/)
- Icons: Lucide
- UI Components: shadcn/ui
- Built with ❤️ using Next.js

---

**Need help?** Open an issue on GitHub or check the [Next.js docs](https://nextjs.org/docs).
