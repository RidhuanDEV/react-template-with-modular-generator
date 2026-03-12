import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useAuth";

export const LoginForm: React.FC = () => {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData): void => {
    login.mutate(data);
  };

  return (
    <Card className="login-form-card">
      <CardHeader>
        <div>
          <h2>Sign in</h2>
          <p>Use your company account to access the dashboard.</p>
        </div>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}
          className="login-form"
        >
          <Input
            id="email"
            type="email"
            label="Email"
            error={errors.email?.message}
            placeholder="Enter your email"
            autoComplete="email"
            {...register("email")}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            error={errors.password?.message}
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password")}
          />

          {login.isError && (
            <Alert variant="danger" title="Authentication failed">
              {login.error?.message ?? "Login failed. Please try again."}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting || login.isPending}
          >
            {login.isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
