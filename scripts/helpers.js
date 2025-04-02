const fs = require('fs-extra');
const path = require('path');

// Simple color functions without using chalk
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Helper for colored console output
function log(message, color = 'white') {
  console.log(colors[color] + message + colors.reset);
}

function error(message) {
  console.error(colors.red + `Error: ${message}` + colors.reset);
}

// Validate package name (lowercase, letters, numbers, hyphens)
function validatePackageName(name) {
  return /^[a-z0-9-]+$/.test(name) && name.length > 0;
}

// Find all existing workspaces and their port numbers
async function findExistingPorts() {
  const workspacesDir = path.join(process.cwd(), 'workspaces');
  const ports = new Set();

  try {
    const workspaces = await fs.readdir(workspacesDir);

    for (const workspace of workspaces) {
      const packageJsonPath = path.join(workspacesDir, workspace, 'package.json');

      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);

        // Check various script entries for port declarations
        if (packageJson.scripts) {
          const scriptValues = Object.values(packageJson.scripts);

          for (const script of scriptValues) {
            // Look for port definitions in scripts
            const portMatch = script.match(/port=(\d+)/i) || script.match(/--port\s+(\d+)/i);
            if (portMatch && portMatch[1]) {
              ports.add(parseInt(portMatch[1], 10));
            }
          }
        }
      }
    }

    return ports;
  } catch (err) {
    error(`Error reading workspaces: ${err.message}`);
    return new Set([3000]); // Default to having port 3000 occupied if we can't read
  }
}

// Find the next available port number
async function findNextAvailablePort() {
  const existingPorts = await findExistingPorts();
  let port = 3000;

  while (existingPorts.has(port)) {
    port++;
  }

  return port;
}

// Copy template directory to target location
async function copyTemplate(templatePath, targetPath) {
  try {
    if (await fs.pathExists(targetPath)) {
      throw new Error(`Directory ${targetPath} already exists`);
    }

    await fs.ensureDir(path.dirname(targetPath));
    await fs.copy(templatePath, targetPath);

    log(`Template copied to ${targetPath}`, 'green');
    return true;
  } catch (err) {
    error(`Failed to copy template: ${err.message}`);
    throw err;
  }
}

// Replace placeholders in all template files
async function replacePackageName(targetPath, packageName, portNumber, templateType) {
  try {
    // Update package.json
    const packageJsonPath = path.join(targetPath, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);

    packageJson.name = packageName;

    // Update port in scripts if template is Vite
    if (templateType === 'vite') {
      if (packageJson.scripts['start:dev']) {
        packageJson.scripts['start:dev'] = `vite --port ${portNumber}`;
      }
      if (packageJson.scripts['preview']) {
        packageJson.scripts['preview'] = `vite preview --port ${portNumber}`;
      }

      // Update vite.config.js
      const viteConfigPath = path.join(targetPath, 'vite.config.js');
      if (await fs.pathExists(viteConfigPath)) {
        let viteConfig = await fs.readFile(viteConfigPath, 'utf8');
        viteConfig = viteConfig.replace(/port:\s*\d+/, `port: ${portNumber}`);
        await fs.writeFile(viteConfigPath, viteConfig, 'utf8');
      }
    } else if (templateType === 'webpack') {
      if (packageJson.scripts['start:dev']) {
        packageJson.scripts['start:dev'] = `set port=${portNumber} && react-app-rewired start`;
      }
    }

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    // Find and replace __PACKAGE_NAME__ in all files
    const replaceInFiles = async (dir) => {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          await replaceInFiles(fullPath);
        } else {
          // Skip binary files and node_modules
          if (fullPath.includes('node_modules') || path.extname(fullPath) === '.png' ||
            path.extname(fullPath) === '.jpg' || path.extname(fullPath) === '.jpeg' ||
            path.extname(fullPath) === '.gif' || path.extname(fullPath) === '.svg') {
            continue;
          }

          try {
            let content = await fs.readFile(fullPath, 'utf8');
            if (content.includes('__PACKAGE_NAME__')) {
              content = content.replace(/__PACKAGE_NAME__/g, packageName);
              await fs.writeFile(fullPath, content, 'utf8');
              log(`Updated references in ${fullPath}`, 'green');
            }
          } catch (e) {
            // Skip files that can't be read as text
            continue;
          }
        }
      }
    };

    await replaceInFiles(targetPath);
    return true;
  } catch (err) {
    error(`Failed to replace package name: ${err.message}`);
    throw err;
  }
}

module.exports = {
  log,
  error,
  validatePackageName,
  findExistingPorts,
  findNextAvailablePort,
  copyTemplate,
  replacePackageName
};