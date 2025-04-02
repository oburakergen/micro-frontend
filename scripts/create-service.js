#!/usr/bin/env node

const readline = require('readline');
const helpers = require('./helpers.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function createService() {
  try {
    helpers.log('🚀 Welcome to Micro Frontend Service Creator 🚀', 'cyan');
    helpers.log('-----------------------------------------------', 'cyan');

    // Step 1: Choose template (Vite or Webpack)
    let templateChoice;
    do {
      templateChoice = await promptUser('Choose a template (vite/webpack): ').then(answer => answer.toLowerCase());

      if (templateChoice !== 'vite' && templateChoice !== 'webpack') {
        helpers.error('Please choose either "vite" or "webpack"');
      }
    } while (templateChoice !== 'vite' && templateChoice !== 'webpack');

    // Step 2: Get package name
    let packageName;
    do {
      packageName = await promptUser('Enter package name: ');

      if (!helpers.validatePackageName(packageName)) {
        helpers.error('Invalid package name. Please use lowercase letters, numbers, and hyphens only.');
      }
    } while (!helpers.validatePackageName(packageName));

    // Step 3: Find next available port
    const nextPort = await helpers.findNextAvailablePort();

    // Step 4: Copy template and replace placeholders
    const templatePath = `${__dirname}/templates/react-${templateChoice}-template`;
    const targetPath = `${process.cwd()}/workspaces/${packageName}`;

    helpers.log(`Creating new ${templateChoice} service: ${packageName}`, 'green');
    helpers.log(`Using port: ${nextPort}`, 'green');

    await helpers.copyTemplate(templatePath, targetPath);
    await helpers.replacePackageName(targetPath, packageName, nextPort, templateChoice);

    helpers.log('-----------------------------------------------', 'cyan');
    helpers.log(`✅ Successfully created ${packageName} service!`, 'green');
    helpers.log(`📁 Location: workspaces/${packageName}`, 'green');
    helpers.log(`🔌 Port: ${nextPort}`, 'green');
    helpers.log(`🚀 To start development:`, 'yellow');
    helpers.log(`   cd workspaces/${packageName}`, 'yellow');
    helpers.log(`   npm install`, 'yellow');
    helpers.log(`   npm run start:dev`, 'yellow');
    helpers.log('-----------------------------------------------', 'cyan');

    rl.close();
  } catch (err) {
    helpers.error(`Failed to create service: ${err.message}`);
    rl.close();
    process.exit(1);
  }
}

createService();