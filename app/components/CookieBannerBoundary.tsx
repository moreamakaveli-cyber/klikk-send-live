"use client";

import React from "react";
import CookieBanner from "./CookieBanner";

class CookieErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Logg til konsoll i dev, men ikke krasj hele appen
    console.error("CookieBanner feil:", error);
  }

  render() {
    if (this.state.hasError) {
      // Skjul cookiebanneret hvis det feiler
      return null;
    }
    return this.props.children;
  }
}

export default function CookieBannerBoundary() {
  return (
    <CookieErrorBoundary>
      <CookieBanner />
    </CookieErrorBoundary>
  );
}

