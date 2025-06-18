[![npm version](https://badge.fury.io/js/git-intent-cli.svg)](https://badge.fury.io/js/git-intent-cli)

# Git Intent CLI
🎯 A Git commit interface for developers who want their work to reflect **purpose**, **principles**, and **meaning** — not just code changes.

## ✨ What Is This?

`git-intent` helps you commit code with **intentional structure**, aligning each commit to:

- **Essence** – the higher purpose (e.g. Simplicity, Security)
- **Ethic** – the guiding principle (e.g. Clarity, Trust, Transparency)
- **Expression** – the actual implementation or change

It makes each Git commit a small doctrinal statement.


## 🚀 Example Usage

```bash
intent commit
```
You’ll be prompted to select from your configured essences and ethics (interactive mode), or you can pass flags directly:

```bash
intent commit \
  --essence "Simplicity" \
  --ethic "Reduce friction" \
  --expression "Removed redundant form step"
```

Creates a commit like:
```
[Essence Simplicity] [Ethic Reduce friction] Removed redundant form step
```


## 🧰 Initialize Config

Before using the CLI, create a config file with:

```bash
intent init
```

This will prompt you to define your own `essences` and `ethics`, then save them to `.intentrc.json` in your project root.


## 🔧 Installation

```bash
git clone https://github.com/tylerlazenby/git-intent-cli.git
cd git-intent-cli
npm install
npm link
```


## 📦 Features

- ✅ Interactive CLI commit prompts
- ✅ Autostaging and file change display
- ✅ `.intentrc.json` config support
- 🧠 Saved intent presets (planned)
- 🌿 `intent branch` with semantic naming (planned)
- 📊 Value dashboard/history tracking (planned)


## 💡 Why Use This?

Because Git history should reflect more than technical changes.  
It should document your **growth**, **values**, and **mission**.

> "Write code that matters. Commit with Intention."
