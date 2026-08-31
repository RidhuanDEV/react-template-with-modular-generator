import React from "react";
import { PasswordForm } from "../components/PasswordForm";
import { TwoFactorAuthSection } from "../components/TwoFactorAuthSection";
import { ActiveSessionsSection } from "../components/ActiveSessionsSection";
import { DeleteAccountSection } from "../components/DeleteAccountSection";

const SecurityPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PasswordForm />
      <TwoFactorAuthSection />
      <ActiveSessionsSection />
      <DeleteAccountSection />
    </div>
  );
};

export default SecurityPage;
