import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Blocks, Code2, Globe2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { PageContainer, PageHeader } from "@/components/layout";

const DashboardPage: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"]);

  const featureCards = [
    {
      title: t("dashboard:tailwindNative"),
      description: t("dashboard:tailwindNativeDesc"),
      icon: Sparkles,
    },
    {
      title: t("dashboard:strictContracts"),
      description: t("dashboard:strictContractsDesc"),
      icon: Code2,
    },
    {
      title: t("dashboard:modularBase"),
      description: t("dashboard:modularBaseDesc"),
      icon: Blocks,
    },
    {
      title: t("dashboard:i18nReady"),
      description: t("dashboard:i18nReadyDesc"),
      icon: Globe2,
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title={t("dashboard:title")}
        description={t("dashboard:subtitle")}
        actions={<Badge variant="primary">{t("dashboard:badge")}</Badge>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="group overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:hover:translate-y-0"
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
