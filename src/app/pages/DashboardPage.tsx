import React from "react";
import { ArrowUpRight, Blocks, Code2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { PageContainer, PageHeader } from "@/components/layout";

const DashboardPage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="A clean React starter with strict contracts, modular generators, and a shadcn-ready design foundation."
        actions={<Badge variant="primary">Modern template</Badge>}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Tailwind native",
            description:
              "Components now rely on utility classes and shadcn theme tokens instead of legacy CSS selectors.",
            icon: Sparkles,
          },
          {
            title: "Strict contracts",
            description:
              "The template keeps typed component props and avoids loose compatibility assumptions.",
            icon: Code2,
          },
          {
            title: "Modular base",
            description:
              "Shared UI, layout, feedback, and feature scaffolds stay organized for generated modules.",
            icon: Blocks,
          },
        ].map((item) => {
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
