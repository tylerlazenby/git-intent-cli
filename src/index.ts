#!/usr/bin/env ts-node

import {Command} from 'commander';
import simpleGit from 'simple-git';
import chalk from 'chalk';

const program = new Command();
const git = simpleGit()

type CommitActionOptions = {
    essence?: string | null | undefined;
    ethic?: string | null | undefined;
    expression?: string | null | undefined;
    autoStage?: boolean;
}

program
    .name('indent')
    .description('Add doctrinal structure to your Git commits')
    .version('0.1.0')
    .helpOption("-h, --help", "Display help for command");

program
    .command('commit')
    .requiredOption('--essence <essence>', 'The core doctrine or goal')
    .requiredOption('--ethic <ethic>', 'The principle guiding the commit')
    .requiredOption('--expression <expression>', 'The actual change')
    .option('--auto-stage', 'Automatically stage all changes before committing')
    .addHelpText('after', `
Examples:
  $ intent commit --essence "Simplicity" --ethic "Clarity" --expression "Refactored nav bar"
  $ intent commit --auto-stage --essence "Security" --ethic "Transparency" --expression "Logged invalid access attempts"
`)
    .action(async (options: CommitActionOptions) => {
        const { essence, ethic, expression, autoStage} = options;
        const plainMessage = `[Essence ${essence}] [Ethic ${ethic}] ${expression}`;
        const message = `[${chalk.dim('Essence')} ${essence}] [${chalk.dim('Ethic')} ${ethic}] ${expression}`;
        try {
            if (autoStage) {
                console.group(chalk.bold(chalk.yellow('📥 Staging all regular changes...')))
                await git.add('.')

                const status = await git.status();

                if (
                    status.created.length > 0 &&
                    status.modified.length > 0 &&
                    status.deleted.length > 0
                ) {
                    console.log(chalk.grey('No Changes detected'))
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