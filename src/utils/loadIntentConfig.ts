import fs from 'fs';
import path from 'path';

export type IntentConfig = {
    essences: string[];
    ethics: string[];
};

export function loadIntentConfig(): IntentConfig {
    const configPath = path.resolve(process.cwd(), '.intentrc.json');

    if (!fs.existsSync(configPath)) {
        throw new Error('Missing .intentrc.json file in project root.');
    }

    const raw = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(raw);
}
