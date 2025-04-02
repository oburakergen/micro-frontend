const fs = require('fs-extra');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = 'white') {
  console.log(colors[color] + message + colors.reset);
}

function error(message) {
  console.error(colors.red + `Error: ${message}` + colors.reset);
}

function validatePackageName(name) {
  return /^[a-z0-9-]+$/.test(name) && name.length > 0;
}

async function findExistingPorts() {
  const workspacesDir = path.join(process.cwd(), 'workspaces');
  const ports = new Set();

  try {
    const workspaces = await fs.readdir(workspacesDir);

    for (const workspace of workspaces) {
      const packageJsonPath = path.join(workspacesDir, workspace, 'package.json');

      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);

        if (packageJson.scripts) {
          const scriptValues = Object.values(packageJson.scripts);

          for (const script of scriptValues) {
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

async function findNextAvailablePort() {
  const existingPorts = await findExistingPorts();
  let port = 3000;

  while (existingPorts.has(port)) {
    port++;
  }

  return port;
}

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

async function replacePackageName(targetPath, packageName, portNumber, templateType) {
  try {
    const packageJsonPath = path.join(targetPath, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);

    packageJson.name = packageName;

    if (templateType === 'vite') {
      if (packageJson.scripts['start:dev']) {
        packageJson.scripts['start:dev'] = `vite --port ${portNumber}`;
      }
      if (packageJson.scripts['preview']) {
        packageJson.scripts['preview'] = `vite preview --port ${portNumber}`;
      }

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

    const replaceInFiles = async (dir) => {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          await replaceInFiles(fullPath);
        } else {
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