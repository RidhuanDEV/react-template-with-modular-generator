import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { ROUTES } from "@/config/routes";

const linkClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground no-underline shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:text-primary-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const NotFoundPage: React.FC = () => {
  return (
    <div className="grid min-h-svh place-items-center bg-background p-6">
      <div className="grid max-w-md gap-4 text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="text-3xl font-semibold tracking-normal text-foreground">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <div className="mt-2 flex justify-center">
          <Link to={ROUTES.HOME} className={linkClass}>
            <Home className="size-4" aria-hidden="true" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
