import { type ReactNode, useState, useCallback } from "react";
import { clsx } from "clsx";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple],
  );

  return (
    <div className={clsx("accordion", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div
            key={item.id}
            className={clsx(
              "accordion__item",
              isOpen && "accordion__item--open",
            )}
          >
            <button
              type="button"
              className="accordion__trigger"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              {item.title}
              <span className="accordion__icon">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div
                id={`accordion-content-${item.id}`}
                className="accordion__content"
                role="region"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
