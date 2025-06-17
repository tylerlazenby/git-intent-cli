#!/user/bin/env ts-node

import {Command} from 'commander';
import simpleGit from 'simple-git';
import chalk from 'chalk';

const program = new Command();
const git = simpleGit()

program
    .name('indent')
    .description('Add doctrinal structure to your Git commits')
    .version('0.1.0');

program
    .command('commit')
    .requiredOption('--essence <essence>', 'The core doctrine or goal')
    .requiredOption('--ethic <ethic>', 'The principle guiding the commit')
    .requiredOption('--expression <expression>', 'The actual change')
    .action(async ({ essence, ethic, expression }) => {
        const message = `[Essence ${essence}] [Ethic ${ethic}] ${expression}`;
        try {
            await git.add('.')
            await git.commit(message);
            console.log(chalk.bold(chalk.green('✅ Commit Created')), message)
        } catch (err) {
            console.error(chalk.red('❌ Git commit failed:', err))
        }
    });

program.parse()