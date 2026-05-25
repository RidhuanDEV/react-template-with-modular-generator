import { ShieldCheck } from "lucide-react";
import { LoginForm } from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="grid min-h-svh place-items-center bg-[radial-gradient(circle_at_top_left,var(--color-primary)/0.12,transparent_32%),linear-gradient(180deg,var(--color-background),var(--color-muted)/0.45)] p-4">
      <div className="grid w-full max-w-md gap-6 animate-in fade-in-0 slide-in-from-bottom-3 duration-500">
        <div className="grid gap-3 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </div>
          <div className="grid gap-1">
            <h1 className="text-2xl font-semibold tracking-normal text-foreground">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
