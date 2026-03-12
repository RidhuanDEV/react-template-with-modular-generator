import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={ROUTES.HOME} className="btn btn--primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
