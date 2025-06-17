import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export type IntentConfig = {
    essences: string[];
    ethics: string[];
};

export function loadIntentConfig(): IntentConfig {
    const configPath = path.resolve(process.cwd(), '.intentrc.json');

    if (!fs.existsSync(configPath)) {
        console.error(chalk.bold(chalk.red(`Missing the intentrc.json. Run ${chalk.dim('`intent init`')}`)))
        throw new Error('Missing .intentrc.json file in project root.');
    }

    const raw = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(raw);
}
