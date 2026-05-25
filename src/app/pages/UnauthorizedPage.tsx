import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/layout";
import { ROUTES } from "@/config/routes";

const linkClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const UnauthorizedPage = () => {
  return (
    <PageContainer maxWidth="md">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <ShieldAlert className="size-6" aria-hidden="true" />
        </div>
        <PageHeader
          title="Access denied"
          description="You do not have permission to access this page or action."
        />
        <Link to={ROUTES.DASHBOARD} className={linkClass}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to dashboard
        </Link>
      </div>
    </PageContainer>
  );
};

export default UnauthorizedPage;
