import {
  type ReactNode,
  useState,
  useCallback,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? "");

  const handleTabClick = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);
      onChange?.(tabId);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const enabledTabs = tabs.filter((t) => !t.disabled);
      let newIndex = -1;

      if (e.key === "ArrowRight") {
        newIndex = (index + 1) % enabledTabs.length;
      } else if (e.key === "ArrowLeft") {
        newIndex = (index - 1 + enabledTabs.length) % enabledTabs.length;
      }

      if (newIndex >= 0) {
        const tab = enabledTabs[newIndex];
        if (tab) handleTabClick(tab.id);
      }
    },
    [tabs, handleTabClick],
  );

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={cn("grid gap-4", className)}>
      <div
        className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground"
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            className={cn(
              "inline-flex h-8 items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              activeTab === tab.id && "bg-background text-foreground shadow-sm",
            )}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        className="text-sm animate-in fade-in-0 slide-in-from-bottom-1 duration-200"
        aria-labelledby={activeTab}
      >
        {activeContent}
      </div>
    </div>
  );
};
