import {
  type ReactNode,
  useState,
  useCallback,
  type KeyboardEvent,
} from "react";
import { clsx } from "clsx";

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
    <div className={clsx("tabs", className)}>
      <div className="tabs__list" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            className={clsx(
              "tabs__trigger",
              activeTab === tab.id && "tabs__trigger--active",
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
        className="tabs__content"
        aria-labelledby={activeTab}
      >
        {activeContent}
      </div>
    </div>
  );
};
