import fs from "node:fs";
import path from "node:path";

const featureName: string | undefined = process.argv[2];

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
const templateDir = path.resolve(process.cwd(), "scripts", "templates", "feature");

const dirs = ["components", "hooks", "services", "schemas", "types", "pages"];

const fileMapping: Record<string, string> = {
  [`types/${kebabCase}.types.ts`]: "types/types.ts.tpl",
  ["types/index.ts"]: "types/index.ts.tpl",
  [`services/${kebabCase}.service.ts`]: "services/service.ts.tpl",
  ["services/index.ts"]: "services/index.ts.tpl",
  [`schemas/${kebabCase}.schema.ts`]: "schemas/schema.ts.tpl",
  ["schemas/index.ts"]: "schemas/index.ts.tpl",
  [`hooks/use${pascalCase}s.ts`]: "hooks/hook.ts.tpl",
  ["hooks/index.ts"]: "hooks/index.ts.tpl",
  [`components/${pascalCase}Card.tsx`]: "components/Card.tsx.tpl",
  ["components/index.ts"]: "components/index.ts.tpl",
  [`pages/${pascalCase}ListPage.tsx`]: "pages/ListPage.tsx.tpl",
  ["pages/index.ts"]: "pages/index.ts.tpl",
  ["index.ts"]: "index.ts.tpl",
};

// Create directories
for (const dir of dirs) {
  const dirPath = path.join(featureDir, dir);
  fs.mkdirSync(dirPath, { recursive: true });
}

// Generate files dynamically
for (const [targetPath, templateRelativePath] of Object.entries(fileMapping)) {
  const fullTargetPath = path.join(featureDir, targetPath);
  const fullTemplatePath = path.join(templateDir, templateRelativePath);

  if (fs.existsSync(fullTargetPath)) {
    console.warn(`  Skipping (exists): ${targetPath}`);
    continue;
  }

  if (!fs.existsSync(fullTemplatePath)) {
    console.error(`Template not found: ${templateRelativePath}`);
    process.exit(1);
  }

  let content = fs.readFileSync(fullTemplatePath, "utf-8");
  content = content
    .replace(/\{\{pascalCase\}\}/g, pascalCase)
    .replace(/\{\{kebabCase\}\}/g, kebabCase)
    .replace(/\{\{camelCase\}\}/g, camelCase);

  fs.writeFileSync(fullTargetPath, content, "utf-8");
  console.info(`  Created: ${targetPath}`);
}

console.info(
  `\nFeature "${kebabCase}" generated at src/features/${kebabCase}/`,
);
