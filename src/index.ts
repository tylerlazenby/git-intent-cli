#!/user/bin/env ts-node

import {Command} from 'commander';
import simpleGit from 'simple-git';
import chalk from 'chalk';

const program = new Command();
const git = simpleGit()

type CommitActionOptions = {
    essence?: string | null | undefined;
    ethic?: string | null | undefined;
    expression?: string | null | undefined;
    autostage: string | null | undefined;
}

program
    .name('indent')
    .description('Add doctrinal structure to your Git commits')
    .version('0.1.0');

program
    .command('commit')
    .requiredOption('--essence <essence>', 'The core doctrine or goal')
    .requiredOption('--ethic <ethic>', 'The principle guiding the commit')
    .requiredOption('--expression <expression>', 'The actual change')
    .option('--autostage', 'If the CLI should automatically stage all regular changes.')
    .action(async (options: CommitActionOptions) => {
        const { essence, ethic, expression, autostage } = options;
        const plainMessage = `[Essence ${essence}] [Ethic ${ethic}] ${expression}`;
        const message = `[${chalk.dim('Essence')} ${essence}] [${chalk.dim('Ethic')} ${ethic}] ${expression}`;
        try {
            if (autostage) {
                console.log(chalk.bold(chalk.yellow('📥 Staging all changes...')))
                await git.add('.')
            }

            await git.commit(plainMessage);
            console.log(chalk.bold(chalk.green('✅ Commit Created')), chalk.italic(message))
        } catch (err) {
            console.error(chalk.red('❌ Git commit failed:', err))
        }
    });

program.parse()