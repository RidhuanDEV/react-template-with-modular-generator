import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/locales/i18n";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  className?: string;
  variant?: "dropdown" | "compact";
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  variant = "dropdown",
}) => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.slice(0, 2) as SupportedLanguage) || "en";

  const currentOption =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === currentLang) ??
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleLanguageChange = (code: SupportedLanguage): void => {
    void i18n.changeLanguage(code);
  };

  const menuItems = SUPPORTED_LANGUAGES.map((lang) => ({
    label: `${lang.flag} ${lang.name}`,
    onClick: () => handleLanguageChange(lang.code),
    disabled: currentLang === lang.code,
  }));

  const trigger = (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5 text-xs font-medium text-foreground shadow-2xs transition-colors hover:bg-accent/70 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label="Change language"
    >
      <Globe className="size-3.5 text-muted-foreground" aria-hidden="true" />
      <span>{currentOption.flag}</span>
      {variant !== "compact" && (
        <span className="font-semibold uppercase">{currentOption.code}</span>
      )}
    </div>
  );

  return <DropdownMenu trigger={trigger} items={menuItems} />;
};
