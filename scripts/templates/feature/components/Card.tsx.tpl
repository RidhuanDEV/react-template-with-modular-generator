import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import type { {{pascalCase}} } from '../types/{{kebabCase}}.types';

interface {{pascalCase}}CardProps {
  item: {{pascalCase}};
}

export const {{pascalCase}}Card: React.FC<{{pascalCase}}CardProps> = ({ item }) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <h3 className="text-base font-semibold text-foreground">
          {{pascalCase}} #{item.id}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Details and actions for this {{camelCase}} item.
        </p>
      </CardContent>
    </Card>
  );
};