import fs from "node:fs";
import path from "node:path";

const componentName = process.argv[2];
const subdir = process.argv[3] ?? "ui";

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

const componentDir = path.resolve(process.cwd(), "src", "components", subdir);

fs.mkdirSync(componentDir, { recursive: true });

const componentFile = path.join(componentDir, `${pascalCase}.tsx`);
const indexFile = path.join(componentDir, "index.ts");

if (fs.existsSync(componentFile)) {
  console.error(`Component ${pascalCase}.tsx already exists.`);
  process.exit(1);
}

const componentContent = `import { clsx } from 'clsx';

interface ${pascalCase}Props {
  className?: string;
}

export const ${pascalCase} = ({ className }: ${pascalCase}Props) => {
  return (
    <div className={clsx('${className}', className)}>
      <p>${pascalCase} component</p>
    </div>
  );
};
`;

fs.writeFileSync(componentFile, componentContent, "utf-8");
console.info(`Created: ${componentFile}`);

// Append to index
const exportLine = `export { ${pascalCase} } from './${pascalCase}';\n`;
if (fs.existsSync(indexFile)) {
  const existing = fs.readFileSync(indexFile, "utf-8");
  if (!existing.includes(exportLine.trim())) {
    fs.appendFileSync(indexFile, exportLine, "utf-8");
  }
} else {
  fs.writeFileSync(indexFile, exportLine, "utf-8");
}

console.info(
  `Component "${pascalCase}" generated in src/components/${subdir}/`,
);
