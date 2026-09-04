import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Blocks,
  Code2,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/config/routes";
import { AppLogo } from "@/components/layout/AppLogo";
import { AppearanceTabs } from "@/components/ui/AppearanceTabs";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Button } from "@/components/ui/Button";
import { PlaceholderPattern } from "@/components/ui/PlaceholderPattern";

const WelcomePage: React.FC = () => {
  const { t } = useTranslation(["common", "auth", "dashboard"]);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const features = [
    {
      title: "Modular Feature Slices",
      description:
        "Encapsulated domains with dedicated schemas, services, types, and hooks.",
      icon: Blocks,
    },
    {
      title: "Strict TypeScript Contracts",
      description: "100% type safety with zero typecasting or loose any types.",
      icon: Code2,
    },
    {
      title: "Multi-Language & i18n",
      description:
        "Built-in localization with instant switching between English and Indonesian.",
      icon: Globe2,
    },
    {
      title: "Enterprise Auth & Security",
      description:
        "Full authentication workflows, two-factor auth (2FA), and session protection.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="relative flex min-h-svh flex-col bg-background text-foreground">
      {/* Background Pattern */}
      <PlaceholderPattern className="opacity-40" />

      {/* Header */}
      <header className="relative z-10 border-b bg-background/60 backdrop-blur-md">
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

      {/* Hero */}
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
          <Sparkles className="size-3.5" />
          <span>Enterprise React 19 Starter</span>
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Build scale-ready apps with{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            modular precision
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          A production-grade frontend architecture with automated CLI
          generators, complete authentication suites, 56+ accessible UI
          primitives, and typed internationalization.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
                  Sign In to Account
                </Button>
              </Link>
            </>
          )}
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
            &copy; {new Date().getFullYear()} {t("common:appName")}.{" "}
            {t("common:allRightsReserved")}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">{t("common:version")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
