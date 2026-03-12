import fs from "node:fs";
import path from "node:path";

const pageName = process.argv[2];
const feature = process.argv[3];

if (!pageName) {
  console.error("Usage: npm run generate:page <Name> [feature]");
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

const pascalCase = toPascalCase(pageName);
const kebabCase = toKebabCase(pageName);

let pageDir: string;
if (feature) {
  const featureDir = path.resolve(process.cwd(), "src", "features", feature);

  if (!fs.existsSync(featureDir)) {
    console.error(`Feature directory not found: src/features/${feature}`);
    process.exit(1);
  }

  pageDir = path.resolve(process.cwd(), "src", "features", feature, "pages");
} else {
  pageDir = path.resolve(process.cwd(), "src", "app", "pages");
}

fs.mkdirSync(pageDir, { recursive: true });

const pageFile = path.join(pageDir, `${pascalCase}Page.tsx`);

if (fs.existsSync(pageFile)) {
  console.error(`Page ${pascalCase}Page.tsx already exists.`);
  process.exit(1);
}

const pageContent = `import { EmptyState } from '@/components/feedback';
import { PageContainer, PageHeader } from '@/components/layout';

const ${pascalCase}Page = () => {
  return (
    <PageContainer>
      <PageHeader
        title="${pascalCase}"
        description="Generated page scaffold. Replace this empty state with a real workflow."
      />
      <EmptyState
        title="${pascalCase} page ready"
        description="Add domain-specific content, queries, and actions here."
      />
    </PageContainer>
  );
};

export default ${pascalCase}Page;
`;

fs.writeFileSync(pageFile, pageContent, "utf-8");
console.info(`Created: ${pageFile}`);

// Update index
const indexFile = path.join(pageDir, "index.ts");
const exportLine = `export { default as ${pascalCase}Page } from './${pascalCase}Page';\n`;
if (fs.existsSync(indexFile)) {
  const existing = fs.readFileSync(indexFile, "utf-8");
  if (!existing.includes(exportLine.trim())) {
    fs.appendFileSync(indexFile, exportLine, "utf-8");
  }
} else {
  fs.writeFileSync(indexFile, exportLine, "utf-8");
}

const location = feature ? `src/features/${feature}/pages/` : "src/app/pages/";
console.info(`Page "${pascalCase}Page" generated at ${location}`);
console.info(
  `Don't forget to add the route to src/app/router.tsx:\n` +
    `  { path: '/${kebabCase}', element: <${pascalCase}Page /> }`,
);
