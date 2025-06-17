#!/usr/bin/env ts-node

import {Command} from 'commander';
import simpleGit from 'simple-git';
import chalk from 'chalk';
import {input, select} from "@inquirer/prompts";
import { loadIntentConfig } from './utils/loadIntentConfig';
import fs from "fs";
import path from "path";

const program = new Command();
const git = simpleGit()
const config = loadIntentConfig(); // Load from .intentrc.json

type CommitActionOptions = {
    essence?: string | null | undefined;
    ethic?: string | null | undefined;
    expression?: string | null | undefined;
    autoStage?: boolean;
}

program
    .command('init')
    .description('Create a new .intentrc.json file in the project root')
    .action(async () => {
        const configPath = path.resolve(process.cwd(), '.intentrc.json');

        if (fs.existsSync(configPath)) {
            const overwrite = await select({
                message: `.intentrc.json already exists. Overwrite?`,
                choices: [
                    { name: 'Yes, overwrite it', value: true },
                    { name: 'No, cancel', value: false }
                ]
            });

            if (!overwrite) {
                console.log(chalk.yellow('❌ Init cancelled.'));
                return;
            }
        }

        const essencesInput = await input({
            message: 'Enter comma-separated essences (e.g. Simplicity, Security, Performance):'
        });

        const ethicsInput = await input({
            message: 'Enter comma-separated ethics (e.g. Clarity, Transparency, Stability):'
        });

        const config = {
            essences: essencesInput.split(',').map((s) => s.trim()).filter(Boolean),
            ethics: ethicsInput.split(',').map((s) => s.trim()).filter(Boolean)
        };

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log(chalk.green(`✅ .intentrc.json created successfully.`));
    });


program
    .name('indent')
    .description('Add doctrinal structure to your Git commits')
    .version('0.1.0')
    .helpOption("-h, --help", "Display help for command");

program
    .command('commit')
    .option('--essence <essence>', 'The core doctrine or goal')
    .option('--ethic <ethic>', 'The principle guiding the commit')
    .option('--expression <expression>', 'The actual change')
    .option('--auto-stage', 'Automatically stage all changes before committing')
    .addHelpText('after', `
Examples:
  $ intent commit --essence "Simplicity" --ethic "Clarity" --expression "Refactored nav bar"
  $ intent commit --auto-stage --essence "Security" --ethic "Transparency" --expression "Logged invalid access attempts"
`)
    .action(async (options: CommitActionOptions) => {
        let { essence, ethic, expression, autoStage } = options;

        if (!essence) {
            essence = await select({
                message: 'Select your essence (purpose):',
                choices: config.essences.map((val: string) => ({name: val, value: val}))
            })
        }

        if (!ethic) {
            ethic = await select({
                message: 'Select your ethic (principle):',
                choices: config.ethics.map((val: string) => ({name: val, value: val}))
            })
        }

        if (!expression) {
            expression = await input({message: 'What did you do?'})
        }

        const plainMessage = `[Essence ${essence}] [Ethic ${ethic}] ${expression}`;
        const message = `[${chalk.dim('Essence')} ${essence}] [${chalk.dim('Ethic')} ${ethic}] ${expression}`;

        try {
            if (autoStage) {
                console.group(chalk.bold(chalk.yellow('📥 Staging all regular changes...')))
                await git.add('.')

                const status = await git.status();

                if (
                    !status.created.length &&
                    !status.modified.length &&
                    !status.deleted.length
                ) {
                    console.log(chalk.gray('⚠️ Nothing to commit.'));
                    return;
                } else {
                    if (status.created.length)
                        console.log(chalk.green('🆕 Added:'), status.created.join(', '));
                    if (status.modified.length)
                        console.log(chalk.cyan('✏️ Modified:'), status.modified.join(', '));
                    if (status.deleted.length)
                        console.log(chalk.red('❌ Deleted:'), status.deleted.join(', '));
                }

                console.groupEnd()
            }

            await git.commit(plainMessage);
            console.log(chalk.bold(chalk.green('✅ Commit Created')), chalk.italic(message))
        } catch (err) {
            console.error(chalk.red('❌ Git commit failed:', err))
        }
    });

program.parse()