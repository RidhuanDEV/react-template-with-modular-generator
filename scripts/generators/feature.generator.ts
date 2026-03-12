import fs from "node:fs";
import path from "node:path";

const featureName = process.argv[2];

if (!featureName) {
  console.error("Usage: npm run generate:feature <name>");
  process.exit(1);
}

const toKebabCase = (value: string): string => {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

const toPascalCase = (value: string): string => {
  return toKebabCase(value)
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
};

const toCamelCase = (value: string): string => {
  const pascalCaseValue = toPascalCase(value);
  return pascalCaseValue.charAt(0).toLowerCase() + pascalCaseValue.slice(1);
};

const kebabCase = toKebabCase(featureName);
const pascalCase = toPascalCase(featureName);
const camelCase = toCamelCase(featureName);

const featureDir = path.resolve(process.cwd(), "src", "features", kebabCase);

const dirs = ["components", "hooks", "services", "schemas", "types", "pages"];

const files: Record<string, string> = {
  [`types/${kebabCase}.types.ts`]: `import type { BaseEntity } from '@/types/common.types';

export interface ${pascalCase} extends BaseEntity {
}
`,

  ["types/index.ts"]: `export type { ${pascalCase} } from './${kebabCase}.types';
`,

  [`services/${kebabCase}.service.ts`]: `import { apiClient } from '@/lib/apiClient';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';
import type { ${pascalCase} } from '../types/${kebabCase}.types';
import { buildPaginationQueryString } from '@/utils/pagination';

export const ${camelCase}Service = {
  list: async (params: PaginationParams): Promise<PaginatedResponse<${pascalCase}>> => {
    const qs = buildPaginationQueryString(params);
    const response = await apiClient.get<PaginatedResponse<${pascalCase}>>(\`/${kebabCase}s?\${qs}\`);
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<${pascalCase}>> => {
    const response = await apiClient.get<ApiResponse<${pascalCase}>>(\`/${kebabCase}s/\${encodeURIComponent(id)}\`);
    return response.data;
  },
};
`,

  ["services/index.ts"]: `export { ${camelCase}Service } from './${kebabCase}.service';
`,

  [`schemas/${kebabCase}.schema.ts`]: `import { z } from 'zod/v4';

export const ${camelCase}Schema = z.object({
  // Define your schema fields here
});

export type ${pascalCase}FormData = z.infer<typeof ${camelCase}Schema>;
`,

  ["schemas/index.ts"]: `export { ${camelCase}Schema, type ${pascalCase}FormData } from './${kebabCase}.schema';
`,

  [`hooks/use${pascalCase}s.ts`]: `import { useQuery } from '@tanstack/react-query';
import type { ApiError, ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';
import { ${camelCase}Service } from '../services/${kebabCase}.service';
import type { ${pascalCase} } from '../types/${kebabCase}.types';

const ${camelCase}QueryKey = ['${kebabCase}s'] as const;

export const use${pascalCase}s = (params: PaginationParams) => {
  return useQuery<PaginatedResponse<${pascalCase}>, ApiError>({
    queryKey: [...${camelCase}QueryKey, params],
    queryFn: () => ${camelCase}Service.list(params),
  });
};

export const use${pascalCase} = (id: string) => {
  return useQuery<ApiResponse<${pascalCase}>, ApiError>({
    queryKey: [...${camelCase}QueryKey, id],
    queryFn: () => ${camelCase}Service.getById(id),
    enabled: !!id,
  });
};
`,

  ["hooks/index.ts"]: `export { use${pascalCase}s, use${pascalCase} } from './use${pascalCase}s';
`,

  [`components/${pascalCase}Card.tsx`]: `import type { ${pascalCase} } from '../types/${kebabCase}.types';

interface ${pascalCase}CardProps {
  item: ${pascalCase};
}

export const ${pascalCase}Card = ({ item }: ${pascalCase}CardProps) => {
  return (
    <div className="${kebabCase}-card">
      <p>${pascalCase}: {item.id}</p>
    </div>
  );
};
`,

  ["components/index.ts"]: `export { ${pascalCase}Card } from './${pascalCase}Card';
`,

  [`pages/${pascalCase}ListPage.tsx`]: `import { EmptyState } from '@/components/feedback';
import { PageContainer, PageHeader } from '@/components/layout';

const ${pascalCase}ListPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="${pascalCase}s"
        description="Generated feature page. Replace this empty state with your real domain workflow."
      />
      <EmptyState
        title="${pascalCase} feature ready"
        description="Wire the generated hooks to your API and evolve this page into a production list view."
      />
    </PageContainer>
  );
};

export default ${pascalCase}ListPage;
`,

  ["pages/index.ts"]: `export { default as ${pascalCase}ListPage } from './${pascalCase}ListPage';
`,

  ["index.ts"]: `export { ${pascalCase}Card } from './components';
export { use${pascalCase}s, use${pascalCase} } from './hooks';
export { ${pascalCase}ListPage } from './pages';
export { ${camelCase}Schema, type ${pascalCase}FormData } from './schemas';
export type { ${pascalCase} } from './types';
`,
};

// Create directories
for (const dir of dirs) {
  const dirPath = path.join(featureDir, dir);
  fs.mkdirSync(dirPath, { recursive: true });
}

// Create files
for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(featureDir, filePath);
  if (fs.existsSync(fullPath)) {
    console.warn(`  Skipping (exists): ${filePath}`);
    continue;
  }
  fs.writeFileSync(fullPath, content, "utf-8");
  console.info(`  Created: ${filePath}`);
}

console.info(
  `\nFeature "${kebabCase}" generated at src/features/${kebabCase}/`,
);
