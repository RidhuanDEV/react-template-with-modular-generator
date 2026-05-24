import fs from "node:fs";
import path from "node:path";

const componentName: string | undefined = process.argv[2];
const subdir: string = process.argv[3] ?? "ui";

if (!componentName) {
  console.error("Usage: npm run generate:component <Name> [subdirectory]");
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

const pascalCase = toPascalCase(componentName);
const className = toKebabCase(componentName);

const sharedDir = path.resolve(process.cwd(), "src", "shared");
const componentDir = path.resolve(sharedDir, "components", subdir);

fs.mkdirSync(componentDir, { recursive: true });

const componentFile = path.join(componentDir, `${pascalCase}.tsx`);
const indexFile = path.join(componentDir, "index.ts");

if (fs.existsSync(componentFile)) {
  console.error(`Component ${pascalCase}.tsx already exists.`);
  process.exit(1);
}

// Load templates
const templateDir = path.resolve(process.cwd(), "scripts", "templates", "component");
const componentTplPath = path.join(templateDir, "Component.tsx.tpl");
const indexTplPath = path.join(templateDir, "index.ts.tpl");

if (!fs.existsSync(componentTplPath) || !fs.existsSync(indexTplPath)) {
  console.error("Template files not found in scripts/templates/component/");
  process.exit(1);
}

let componentContent = fs.readFileSync(componentTplPath, "utf-8");
componentContent = componentContent
  .replace(/\{\{pascalCase\}\}/g, pascalCase)
  .replace(/\{\{className\}\}/g, className);

fs.writeFileSync(componentFile, componentContent, "utf-8");
console.info(`Created: ${componentFile}`);

// Append to index
let indexExportLine = fs.readFileSync(indexTplPath, "utf-8");
indexExportLine = indexExportLine.replace(/\{\{pascalCase\}\}/g, pascalCase);

if (fs.existsSync(indexFile)) {
  const existing = fs.readFileSync(indexFile, "utf-8");
  if (!existing.includes(indexExportLine.trim())) {
    fs.appendFileSync(indexFile, indexExportLine, "utf-8");
  }
} else {
  fs.writeFileSync(indexFile, indexExportLine, "utf-8");
}

console.info(
  `Component "${pascalCase}" generated in src/shared/components/${subdir}/`,
);
