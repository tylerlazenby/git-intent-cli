#!/user/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const simple_git_1 = __importDefault(require("simple-git"));
const chalk_1 = __importDefault(require("chalk"));
const program = new commander_1.Command();
const git = (0, simple_git_1.default)();
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
        await git.commit(message);
        console.log(chalk_1.default.green('✅ Commit Created'), message);
    }
    catch (err) {
        console.error(chalk_1.default.red('❌ Git commit failed:', err));
    }
});
program.parse();
