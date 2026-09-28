import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Blocks,
  Check,
  Code2,
  Copy,
  Globe2,
  Palette,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
  Layers,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/config/routes";
import { AppLogo } from "@/components/layout/AppLogo";
import { AppearanceTabs } from "@/components/ui/AppearanceTabs";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Card, CardContent } from "@/components/ui/Card";
import { PlaceholderPattern } from "@/components/ui/PlaceholderPattern";

const WelcomePage: React.FC = () => {
  const { t } = useTranslation(["common", "auth", "dashboard"]);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [copiedCommand, setCopiedCommand] = useState(false);

  useEffect(() => {
    document.title = "Home Page Modular React by Ridhuan";
  }, []);

  const handleCopyCommand = (command: string): void => {
    navigator.clipboard
      .writeText(command)
      .then(() => {
        setCopiedCommand(true);
        setTimeout(() => setCopiedCommand(false), 2000);
      })
      .catch(() => {
        // Clipboard fallback
      });
  };

  const usageTabs = [
    {
      id: "quickstart",
      label: "⚡ Quick Start",
      content: (
        <Card className="border-border/60 bg-card/80 backdrop-blur-xs">
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">
                  Scaffold with Interactive CLI
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 cursor-pointer gap-1.5 px-2 text-xs"
                onClick={() =>
                  handleCopyCommand("npx modular-react-ridhuan my-app")
                }
              >
                {copiedCommand ? (
                  <>
                    <Check className="size-3 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 font-mono text-xs text-zinc-100 dark:bg-black">
              <code>{`# 1. Run the interactive scaffolding CLI
npx modular-react-ridhuan my-app

# 2. Enter your project directory
cd my-app

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev`}</code>
            </pre>
            <p className="text-xs text-muted-foreground">
              The CLI prompts for your preferred ColorHunt.co 4-color palette
              and trusted icon library, then automatically writes your{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                .env
              </code>{" "}
              and configuration files.
            </p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "generators",
      label: "🛠️ Code Generators",
      content: (
        <Card className="border-border/60 bg-card/80 backdrop-blur-xs">
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <Wrench className="size-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                Automated Zero-Boilerplate Generators
              </span>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 font-mono text-xs text-zinc-100 dark:bg-black">
              <code>{`# Generate a complete vertical domain slice (components, hooks, schemas, types, services, pages)
npm run generate:feature <name>

# Generate an atomic UI primitive in shared/components/
npm run generate:component <Name> [ui/layout/feedback]

# Generate a standalone route page
npm run generate:page <Name> [feature]`}</code>
            </pre>
            <p className="text-xs text-muted-foreground">
              Generators use strict templates with 100% typed contracts, Zod
              schemas, TanStack Query hooks, and zero loose{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                any
              </code>
              .
            </p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "colorhunt",
      label: "🎨 ColorHunt Themes",
      content: (
        <Card className="border-border/60 bg-card/80 backdrop-blur-xs">
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <Palette className="size-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                4-Color Palette Architecture (https://colorhunt.co/)
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-background/50 p-3">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Color 1 (Background)
                </span>
                <p className="mt-1 font-mono text-xs font-semibold text-foreground">
                  VITE_COLOR_BACKGROUND
                </p>
                <span className="text-[11px] text-muted-foreground">
                  Page & root canvas
                </span>
              </div>
              <div className="rounded-lg border bg-background/50 p-3">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Color 2 (Secondary)
                </span>
                <p className="mt-1 font-mono text-xs font-semibold text-foreground">
                  VITE_COLOR_SECONDARY
                </p>
                <span className="text-[11px] text-muted-foreground">
                  Cards & surfaces
                </span>
              </div>
              <div className="rounded-lg border bg-background/50 p-3">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Color 3 (Primary CTA)
                </span>
                <p className="mt-1 font-mono text-xs font-semibold text-foreground">
                  VITE_COLOR_PRIMARY
                </p>
                <span className="text-[11px] text-muted-foreground">
                  Brand action & buttons
                </span>
              </div>
              <div className="rounded-lg border bg-background/50 p-3">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Color 4 (Accent)
                </span>
                <p className="mt-1 font-mono text-xs font-semibold text-foreground">
                  VITE_COLOR_ACCENT
                </p>
                <span className="text-[11px] text-muted-foreground">
                  Badges & highlights
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Change palettes anytime simply by editing the 4 color variables in
              your{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                .env
              </code>{" "}
              file. The runtime theme engine applies them instantly.
            </p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "stack",
      label: "🏗️ Enterprise Stack",
      content: (
        <Card className="border-border/60 bg-card/80 backdrop-blur-xs">
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <Layers className="size-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                Cutting-Edge Core Foundations
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-2.5 rounded-lg border bg-background/50 p-3">
                <Code2 className="mt-0.5 size-4 text-primary" />
                <div>
                  <h4 className="text-xs font-semibold text-foreground">
                    React 19 + TypeScript 5.8+
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Native React 19 hooks with zero typecasting or loose any.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-lg border bg-background/50 p-3">
                <Palette className="mt-0.5 size-4 text-primary" />
                <div>
                  <h4 className="text-xs font-semibold text-foreground">
                    Tailwind CSS v4 + OKLCH
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Next-gen CSS engine with wide-gamut OKLCH design tokens.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-lg border bg-background/50 p-3">
                <Blocks className="mt-0.5 size-4 text-primary" />
                <div>
                  <h4 className="text-xs font-semibold text-foreground">
                    TanStack Query & Zustand
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Robust server-state caching and lightweight client stores.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ];

  const features = [
    {
      title: "Modular Feature Slices",
      description:
        "Encapsulated vertical domains with dedicated schemas, services, types, and custom hooks.",
      icon: Blocks,
    },
    {
      title: "Strict TypeScript Contracts",
      description:
        "100% strict type safety with custom type guards, generics, and zero loose any.",
      icon: Code2,
    },
    {
      title: "Multi-Language & i18n",
      description:
        "Native internationalization with instant switching between English and Indonesian.",
      icon: Globe2,
    },
    {
      title: "Enterprise Auth & Security",
      description:
        "Production-grade auth workflows, two-factor authentication (2FA), and session management.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="relative flex min-h-svh flex-col bg-background text-foreground">
      {/* Background Pattern */}
      <PlaceholderPattern className="opacity-30" />

      {/* Top Header */}
      <header className="relative z-10 border-b bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <AppLogo />
          <div className="flex items-center gap-2.5 sm:gap-3">
            <LanguageSelector />
            <AppearanceTabs />
            <div className="h-6 w-px bg-border/60" aria-hidden="true" />
            {isAuthenticated ? (
              <Link to={ROUTES.DASHBOARD} className="no-underline">
                <Button size="sm" className="flex items-center gap-1.5">
                  <span>{t("common:dashboard")}</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link to={ROUTES.LOGIN} className="no-underline">
                  <Button variant="ghost" size="sm">
                    {t("auth:signIn")}
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER} className="no-underline">
                  <Button size="sm">{t("auth:createAccount")}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section (Default React Style with Modular Twist) */}
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
        {/* React Spinning Atom Logo & Modular Badge */}
        <div className="flex items-center justify-center gap-6">
          <div className="relative flex size-20 items-center justify-center rounded-2xl bg-primary/10 p-2 shadow-inner ring-1 ring-primary/20">
            <svg
              viewBox="-11.5 -10.23174 23 20.46348"
              width={56}
              height={56}
              className="size-14 text-primary animate-[spin_20s_linear_infinite]"
              fill="none"
              aria-label="React Logo"
            >
              <circle cx="0" cy="0" r="2.05" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          </div>
        </div>

        {/* Status Pill */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
          <Sparkles className="size-3.5" />
          <span>React 19 • Tailwind CSS v4 • ColorHunt Theming</span>
        </div>

        {/* Title */}
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Home Page{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Modular React
          </span>{" "}
          by Ridhuan
        </h1>

        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          An enterprise-ready React 19 architecture with feature-driven modular
          boundaries, live ColorHunt palette theming, built-in code generators,
          and complete auth workflows.
        </p>

        {/* Quick CLI Copy Box */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-muted/60 px-4 py-2 shadow-xs backdrop-blur-xs">
            <Terminal className="size-4 text-primary" />
            <code className="font-mono text-xs sm:text-sm">
              npx modular-react-ridhuan my-app
            </code>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 cursor-pointer px-2 text-xs"
              onClick={() =>
                handleCopyCommand("npx modular-react-ridhuan my-app")
              }
            >
              {copiedCommand ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {isAuthenticated ? (
              <Link to={ROUTES.DASHBOARD} className="no-underline">
                <Button size="lg" className="flex items-center gap-2">
                  <span>Go to Dashboard</span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to={ROUTES.REGISTER} className="no-underline">
                  <Button
                    size="lg"
                    className="flex items-center gap-2 shadow-md shadow-primary/20"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link to={ROUTES.LOGIN} className="no-underline">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Interactive Usage Tabs Section */}
        <div className="mt-14 w-full max-w-4xl text-left">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              Usage & Guide
            </h2>
            <Badge variant="primary" className="text-[11px]">
              v1.0.2
            </Badge>
          </div>
          <Tabs tabs={usageTabs} defaultTab="quickstart" />
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-xs backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-border hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t py-6 text-center text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Modular React by Ridhuan. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">v1.0.2 • React 19</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
