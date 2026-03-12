import { LoginForm } from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account to continue</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
