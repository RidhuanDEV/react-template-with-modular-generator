import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/layout";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/Button";

const UnauthorizedPage: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <PageContainer maxWidth="md">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive shadow-xs">
          <ShieldAlert className="size-6" aria-hidden="true" />
        </div>
        <PageHeader
          title={t("accessDenied")}
          description={t("accessDeniedDesc")}
        />
        <div className="mt-6">
          <Link to={ROUTES.DASHBOARD} className="no-underline">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>{t("backToDashboard")}</span>
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default UnauthorizedPage;
