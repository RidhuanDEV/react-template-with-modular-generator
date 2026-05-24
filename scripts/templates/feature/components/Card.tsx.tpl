import type { {{pascalCase}} } from '../types/{{kebabCase}}.types';

interface {{pascalCase}}CardProps {
  item: {{pascalCase}};
}

export const {{pascalCase}}Card = ({ item }: {{pascalCase}}CardProps) => {
  return (
    <div className="{{kebabCase}}-card">
      <p>{{pascalCase}}: {item.id}</p>
    </div>
  );
};
