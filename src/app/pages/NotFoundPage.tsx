import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/Button";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <div className="grid min-h-svh place-items-center bg-background p-6">
      <div className="grid max-w-md gap-4 text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">
          404
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t("pageNotFound")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("pageNotFoundDesc")}</p>
        <div className="mt-2 flex justify-center">
          <Link to={ROUTES.HOME} className="no-underline">
            <Button className="flex items-center gap-2">
              <Home className="size-4" aria-hidden="true" />
              <span>{t("goHome")}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
