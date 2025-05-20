#!/usr/bin/env node

/**
 * No-Build Application Generator
 * 
 * This script creates a new Rails application using the no-build approach
 * with vanilla ES6, Import Maps, and Propshaft asset pipeline.
 * 
 * It simply copies the template files from this repo to a new directory.
 */

import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { program } from 'commander';
import os from 'os';

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log(chalk.yellow('\nOperation cancelled by user.'));
  process.exit(0);
});

// Since we're using ES modules, we need this to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');

// Set up CLI options
program
  .name('no-build')
  .description('Create a new Rails application using the no-build approach')
  .version('0.1.0')
  .argument('[project-name]', 'Name of the project')
  .parse(process.argv);

let projectName = program.args[0];

async function run() {
  try {
    // If no project name provided, prompt for one
    if (!projectName) {
      try {
        const answer = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'What would you like to name your project?',
            default: 'my-no-build-app',
            validate: (input) => {
              if (/^[a-zA-Z0-9-_]+$/.test(input)) return true;
              return 'Project name may only include letters, numbers, underscores and dashes';
            }
          }
        ]);
        projectName = answer.projectName;
      } catch (promptError) {
        // Handle prompt interruption
        console.log(chalk.yellow('\nOperation cancelled by user.'));
        process.exit(0);
      }
    }

    const projectDir = path.resolve(process.cwd(), projectName);
    
    // Check if the target directory is a subdirectory of the package root
    const relPath = path.relative(packageRoot, projectDir);
    if (relPath && !relPath.startsWith('..') && !path.isAbsolute(relPath)) {
      console.log(chalk.yellow(`Cannot create project inside the no-build package directory.`));
      console.log(chalk.yellow(`Please run the command from a different directory or use an absolute path.`));
      return;
    }

    // Check if directory already exists
    if (fs.existsSync(projectDir)) {
      try {
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: `Directory ${projectName} already exists. Overwrite?`,
            default: false
          }
        ]);

        if (!overwrite) {
          console.log(chalk.yellow('Aborting.'));
          return;
        }
      } catch (promptError) {
        // Handle prompt interruption
        console.log(chalk.yellow('\nOperation cancelled by user.'));
        process.exit(0);
      }

      fs.removeSync(projectDir);
    }

    // Create project directory
    fs.mkdirSync(projectDir, { recursive: true });

    console.log(chalk.blue(`Creating a new No-Build Rails application in ${projectDir}...`));

    // Files and directories to include in the new project
    const filesToCopy = [
      'app',
      'bin',
      'config',
      'Gemfile',
      'Gemfile.lock',
      'LICENSE',
      'README.md',
      'config.ru'
    ];

    // Copy each required file/directory
    filesToCopy.forEach(file => {
      const sourcePath = path.join(packageRoot, file);
      const destPath = path.join(projectDir, file);
      
      if (fs.existsSync(sourcePath)) {
        if (fs.lstatSync(sourcePath).isDirectory()) {
          fs.copySync(sourcePath, destPath, {
            filter: (src) => {
              // Skip the no-build.js script in the bin directory
              return !src.endsWith('no-build.js');
            }
          });
        } else {
          fs.copySync(sourcePath, destPath);
        }
      }
    });

    // Create package.json for the new project
    const packageJson = {
      name: projectName,
      private: true,
      type: "module",
      version: "0.1.0",
      scripts: {
        "start": "bin/rails server"
      }
    };
    
    fs.writeFileSync(
      path.join(projectDir, 'package.json'), 
      JSON.stringify(packageJson, null, 2)
    );

    // Make bin files executable
    const binDir = path.join(projectDir, 'bin');
    if (fs.existsSync(binDir)) {
      const binFiles = fs.readdirSync(binDir);
      binFiles.forEach(file => {
        const filePath = path.join(binDir, file);
        fs.chmodSync(filePath, '755');
      });
    }

    console.log(chalk.green(`
Successfully created ${projectName}!

Next steps:
1. cd ${projectName}
2. bundle install
3. bin/rails server
    `));

  } catch (error) {
    console.error(chalk.red('Error creating project:'), error);
    process.exit(1);
  }
}

run();