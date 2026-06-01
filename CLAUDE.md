# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **digital large-screen data visualization project** (数字大屏). It is designed for high-resolution display (typically 1920×1080 or 3840×2160) with real-time data updates, rich charts, and visual effects. SEO and server-side rendering are not concerns; the focus is on visual fidelity, animation performance, and real-time data presentation.

## Tech Stack

- **Framework**: Next.js 15 (App Router), configured for static export (`output: 'export'`) or client-side rendering
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + custom CSS for screen-specific theming
- **Charts**: ECharts (via `echarts-for-react`) as the primary charting library
- **Animation**: GSAP for complex timeline animations; CSS keyframes for simple looping effects
- **State Management**: Zustand for global UI state; TanStack Query (React Query) for server state and polling
- **Real-time Data**: Native WebSocket client, abstracted via a custom hook

## Common Commands

```bash
# Development server
npm run dev

# Production build (static export)
npm run build

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Install dependencies
npm install
```

## Architecture & Key Conventions

### Rendering Strategy

All pages and components for the screen display should use `'use client'` since digital screens rely on browser APIs (resize observers, WebSocket, ECharts canvas rendering) and do not benefit from SSR. Avoid adding SSR complexity to chart or animation components.

### Screen Adaptation (Resolution Scaling)

The project uses a **scale-based adaptation strategy**, not responsive breakpoints.

- The design baseline is typically **1920×1080**.
- The root layout container measures viewport dimensions on mount and applies a CSS `transform: scale(...)` to fit the 1920×1080 canvas into the actual screen size while preserving aspect ratio.
- All internal components use **fixed pixel values** matching the design稿 (e.g., `w-[400px] h-[300px]`), not relative units like `%` or `vw/vh` for layout.
- The scale logic is usually encapsulated in a top-level `ScreenAdapter` or `ScaleContainer` component in `app/layout.tsx`.

### Chart Component Pattern

Do not import `echarts-for-react` directly in page files. All charts must be wrapped in reusable components inside `app/components/charts/`:

- Each chart component accepts a `data` prop and internally configures ECharts `option`.
- Handle `resize` events via ECharts' `chart.resize()` bound to a window resize observer (or the scale container's resize).
- Dispose chart instances properly on unmount to prevent memory leaks.

### State Management Boundaries

- **Zustand**: Use for UI state that multiple unrelated components need (e.g., global theme toggle, selected region, alert banners).
- **TanStack Query**: Use for all server-fetched data, including polling intervals. Do not write manual `fetch` + `useEffect` patterns.
- **Local State**: Prefer `useState` for component-specific state (e.g., hover states, local form inputs).

### Data Flow for Real-Time Updates

- A single WebSocket connection is established at the layout level and managed by a custom hook (e.g., `useWebSocket`).
- Incoming messages are parsed and fed into Zustand stores or TanStack Query caches.
- Chart components react to data changes via props; they do not connect to WebSocket directly.

### Theming & Styling

- Tailwind configuration includes a custom color palette for dark-mode data screens (e.g., neon blues, cyans, accent colors).
- Avoid using Tailwind's default spacing scale arbitrarily; stick to design稿 values.
- CSS animations for decorative elements (border glows, background grids) are defined in global CSS or CSS modules, not inline styles.

### File Organization

```
app/
  layout.tsx              # Root layout with ScreenAdapter
  page.tsx                # Main dashboard entry
  globals.css             # Global animations, dark theme base
  components/
    charts/               # Reusable ECharts wrappers
    layout/               # Header, footer, grid containers
    ui/                   # Small reusable UI primitives
  hooks/
    useWebSocket.ts
    useScreenScale.ts
  stores/
    dashboardStore.ts     # Zustand store
  lib/
    websocket.ts          # WebSocket client abstraction
    constants.ts          # Design baseline width/height, API endpoints
```

### Performance Considerations

- ECharts instances are expensive. Do not conditionally render charts in a way that causes frequent mount/unmount.
- Use `willChange: 'transform'` on scaled containers sparingly.
- Debounce resize handlers.
- For large datasets in ECharts, enable `animation: false` or reduce animation duration to maintain 60fps.
