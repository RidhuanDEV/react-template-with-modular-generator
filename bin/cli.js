#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");

// ANSI Color Helpers
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
};

// Curated ColorHunt Palettes (https://colorhunt.co/)
const PALETTES = [
  {
    name: "Modern Indigo",
    primary: "#4F46E5",
    secondary: "#64748B",
    accent: "#06B6D4",
    background: "#F8FAFC",
  },
  {
    name: "Cyber Teal",
    primary: "#00ADB5",
    secondary: "#393E46",
    accent: "#00FFF5",
    background: "#222831",
  },
  {
    name: "Sunset Coral",
    primary: "#FF6B6B",
    secondary: "#4ECDC4",
    accent: "#FFE66D",
    background: "#292F36",
  },
  {
    name: "Nordic Slate",
    primary: "#2B2D42",
    secondary: "#8D99AE",
    accent: "#EF233C",
    background: "#EDF2F4",
  },
  {
    name: "Emerald Tech",
    primary: "#059669",
    secondary: "#10B981",
    accent: "#34D399",
    background: "#F0FDF4",
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const printBanner = () => {
  console.clear();
  console.log(`
${c.cyan}${c.bold}  __  __           _       _             ____                 _   ${c.reset}
${c.cyan}${c.bold} |  \\/  | ___   __| |_   _| | __ _ _ __ |  _ \\ ___  __ _  ___| |_ ${c.reset}
${c.blue}${c.bold} | |\\/| |/ _ \\ / _\` | | | | |/ _\` | '__|| |_) / _ \\/ _\` |/ __| __|${c.reset}
${c.magenta}${c.bold} | |  | | (_) | (_| | |_| | | (_| | |   |  _ <  __/ (_| | (__| |_ ${c.reset}
${c.magenta}${c.bold} |_|  |_|\\___/ \\__,_|\\__,_|_|\\__,_|_|   |_| \\_\\___|\\__,_|\\___|\\__|${c.reset}
  ${c.yellow}✨ Enterprise Modular React 19 Starter CLI • by Ridhuan ✨${c.reset}
  ${c.dim}Features: Tailwind CSS v4 • ColorHunt Themes • TanStack Query • Zustand${c.reset}
`);
};

const copyRecursive = (src, dest) => {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    const basename = path.basename(src);
    // Ignore internal / cache / build directories
    if (
      basename === "node_modules" ||
      basename === ".git" ||
      basename === "dist" ||
      basename === "bin" ||
      basename === ".gemini"
    ) {
      return;
    }
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    // If copying _gitignore, rename to .gitignore in target
    const targetFile =
      path.basename(src) === "_gitignore"
        ? path.join(path.dirname(dest), ".gitignore")
        : dest;
    fs.copyFileSync(src, targetFile);
  }
};

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printBanner();
    console.log(`
${c.bold}Usage:${c.reset}
  npx modular-react-ridhuan [project-name]
  npm create modular-react-ridhuan [project-name]

${c.bold}Options:${c.reset}
  -h, --help       Show help
  -v, --version    Show version

${c.bold}Features:${c.reset}
  🎨 ColorHunt.co 4-color palette configuration (.env)
  🧩 Multi-select icon provider restrictions
  ⚡ React 19 + Tailwind CSS v4 + Vite + TanStack Query
  🚀 Enterprise feature-driven modular architecture
  🛠️ Built-in code generators (feature, component, page)
`);
    rl.close();
    process.exit(0);
  }

  if (args.includes("--version") || args.includes("-v")) {
    try {
      const pkgJson = JSON.parse(
        fs.readFileSync(path.join(packageRoot, "package.json"), "utf-8"),
      );
      console.log(pkgJson.version);
    } catch {
      console.log("1.0.2");
    }
    rl.close();
    process.exit(0);
  }

  printBanner();

  // 1. Target Directory Prompt
  const initialArg = args.find((a) => !a.startsWith("-"));
  let targetDir = initialArg;
  if (!targetDir) {
    const inputDir = await askQuestion(
      `${c.green}?${c.reset} ${c.bold}Project destination directory:${c.reset} ${c.dim}(default: modular-app)${c.reset} `,
    );
    targetDir = inputDir.trim() || "modular-app";
  }

  const destPath = path.resolve(process.cwd(), targetDir);

  if (fs.existsSync(destPath) && fs.readdirSync(destPath).length > 0) {
    console.log(
      `\n${c.red}✖ Error:${c.reset} Directory "${targetDir}" already exists and is not empty.\n`,
    );
    rl.close();
    process.exit(1);
  }

  console.log("");

  // 2. ColorHunt Palette Prompt
  console.log(
    `${c.magenta}?${c.reset} ${c.bold}Select Color Palette ${c.dim}(based on https://colorhunt.co/):${c.reset}`,
  );
  PALETTES.forEach((p, idx) => {
    console.log(
      `  ${c.cyan}[${idx + 1}]${c.reset} ${c.bold}${p.name.padEnd(16)}${c.reset} ${c.dim}P:${p.primary} S:${p.secondary} A:${p.accent} BG:${p.background}${c.reset}`,
    );
  });
  console.log(
    `  ${c.cyan}[6]${c.reset} ${c.bold}Custom Hex Palette${c.reset} ${c.dim}(Enter 4 custom colors)${c.reset}`,
  );

  const paletteChoice = (
    await askQuestion(
      `\n${c.yellow}Enter choice (1-6) [default: 1]:${c.reset} `,
    )
  ).trim();

  let chosenPalette = PALETTES[0];
  if (paletteChoice === "6") {
    console.log(`\n${c.dim}Enter 4 Hex values (e.g. #4F46E5):${c.reset}`);
    const primary =
      (await askQuestion(`  Primary Action Color: `)).trim() || "#4F46E5";
    const secondary =
      (await askQuestion(`  Secondary Neutral Color: `)).trim() || "#64748B";
    const accent =
      (await askQuestion(`  Accent / Highlight Color: `)).trim() || "#06B6D4";
    const background =
      (await askQuestion(`  Background Canvas Color: `)).trim() || "#F8FAFC";

    chosenPalette = {
      name: "Custom ColorHunt",
      primary,
      secondary,
      accent,
      background,
    };
  } else {
    const num = parseInt(paletteChoice, 10);
    if (!isNaN(num) && num >= 1 && num <= 5) {
      chosenPalette = PALETTES[num - 1];
    }
  }

  console.log(
    `\n${c.green}✔ Selected Palette:${c.reset} ${c.bold}${chosenPalette.name}${c.reset} (${chosenPalette.primary}, ${chosenPalette.secondary}, ${chosenPalette.accent}, ${chosenPalette.background})\n`,
  );

  // 3. Icon Library Multi-Select Prompt
  console.log(
    `${c.magenta}?${c.reset} ${c.bold}Choose Icon Library ${c.dim}(from DESIGN.md registry):${c.reset}`,
  );
  console.log(
    `  ${c.cyan}[1]${c.reset} ${c.bold}Lucide React${c.reset} ${c.dim}(Default • https://lucide.dev/)${c.reset}`,
  );
  console.log(
    `  ${c.cyan}[2]${c.reset} ${c.bold}Heroicons${c.reset} ${c.dim}(https://heroicons.com/)${c.reset}`,
  );
  console.log(
    `  ${c.cyan}[3]${c.reset} ${c.bold}Tabler Icons${c.reset} ${c.dim}(https://tabler.io/icons)${c.reset}`,
  );
  console.log(
    `  ${c.cyan}[4]${c.reset} ${c.bold}Multi-Provider${c.reset} ${c.dim}(Support all above in generator)${c.reset}`,
  );

  const iconChoice = (
    await askQuestion(
      `\n${c.yellow}Enter choice (1-4) [default: 1]:${c.reset} `,
    )
  ).trim();

  let selectedIcons = ["lucide-react"];
  if (iconChoice === "2") {
    selectedIcons = ["@heroicons/react"];
  } else if (iconChoice === "3") {
    selectedIcons = ["@tabler/icons-react"];
  } else if (iconChoice === "4") {
    selectedIcons = ["lucide-react", "@heroicons/react", "@tabler/icons-react"];
  }

  console.log(
    `\n${c.green}✔ Selected Icons:${c.reset} ${c.bold}${selectedIcons.join(", ")}${c.reset}\n`,
  );

  rl.close();

  // 4. Scaffolding Files
  console.log(
    `${c.cyan}📦 Scaffolding template into ${c.bold}${destPath}${c.reset}...`,
  );
  copyRecursive(packageRoot, destPath);

  // 5. Invalidate / Write .env with chosen ColorHunt palette
  const envFilePath = path.join(destPath, ".env");
  const envContent = `# Generated by modular-react-ridhuan
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=${path.basename(destPath)}
VITE_APP_ENV=development

# ColorHunt 4-Color Palette Configuration (${chosenPalette.name})
VITE_THEME_PALETTE_NAME=${chosenPalette.name.toLowerCase().replace(/\\s+/g, "-")}
VITE_COLOR_PRIMARY=${chosenPalette.primary}
VITE_COLOR_SECONDARY=${chosenPalette.secondary}
VITE_COLOR_ACCENT=${chosenPalette.accent}
VITE_COLOR_BACKGROUND=${chosenPalette.background}
`;
  fs.writeFileSync(envFilePath, envContent, "utf-8");

  // 6. Update modular.config.json with chosen options
  const configPath = path.join(destPath, "modular.config.json");
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      config.name = path.basename(destPath);
      config.theme.paletteName = chosenPalette.name;
      config.theme.colors = {
        primary: chosenPalette.primary,
        secondary: chosenPalette.secondary,
        accent: chosenPalette.accent,
        background: chosenPalette.background,
      };
      config.assets.icons.selected = selectedIcons;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
    } catch {
      // Ignore config JSON parse error
    }
  }

  // 7. Update target package.json
  const targetPkgPath = path.join(destPath, "package.json");
  if (fs.existsSync(targetPkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(targetPkgPath, "utf-8"));
      pkg.name = path.basename(destPath);
      pkg.version = "0.1.0";
      delete pkg.bin;
      delete pkg.files;
      pkg.private = true;
      fs.writeFileSync(targetPkgPath, JSON.stringify(pkg, null, 2), "utf-8");
    } catch {
      // Ignore package parse error
    }
  }

  // 8. Initialize git repository if git CLI is available (standard for modern CLIs)
  try {
    execSync("git init", { cwd: destPath, stdio: "ignore" });
  } catch {
    // Graceful fallback if git is not installed or available on PATH
  }

  // 9. Completion Announcement
  console.log(`
${c.green}${c.bold}🎉 SUCCESS!${c.reset} ${c.bold}Your modular React project is ready at:${c.reset} ${c.cyan}${destPath}${c.reset}

${c.bold}Next Steps:${c.reset}
  ${c.cyan}cd ${targetDir}${c.reset}
  ${c.cyan}npm install${c.reset}
  ${c.cyan}npm run dev${c.reset}

${c.bold}Built-in Generators:${c.reset}
  ${c.dim}npm run generate:feature <name>${c.reset}      Scaffold full vertical domain
  ${c.dim}npm run generate:component <Name>${c.reset}    Scaffold atomic UI primitive
  ${c.dim}npm run generate:page <Name>${c.reset}         Scaffold standalone route page

${c.magenta}✨ Happy coding with modular-react-ridhuan! ✨${c.reset}
`);
}

main().catch((err) => {
  console.error(`\n${c.red}✖ Unexpected Error:${c.reset}`, err);
  process.exit(1);
});
