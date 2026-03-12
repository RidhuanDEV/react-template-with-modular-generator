import { Link } from "react-router-dom";
import { PageContainer, PageHeader } from "@/components/layout";
import { ROUTES } from "@/config/routes";

const UnauthorizedPage = () => {
  return (
    <PageContainer maxWidth="md">
      <PageHeader
        title="Access denied"
        description="You do not have permission to access this page or action."
      />
      <Link to={ROUTES.DASHBOARD} className="btn btn--primary btn--md">
        Back to dashboard
      </Link>
    </PageContainer>
  );
};

export default UnauthorizedPage;
