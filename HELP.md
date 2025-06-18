
# Git Intent CLI — Help Reference

## Commands

### `intent commit`

Creates a structured commit based on declared intent.

**Options:**
- `--essence <value>`: Higher purpose (e.g. Security, Simplicity)
- `--ethic <value>`: Principle guiding the change (e.g. Protect users)
- `--expression <text>`: What the change actually is
- `--auto-stage`: Automatically stage all changes before committing

If values are not provided, interactive prompts will guide you.

**Example:**
```bash
intent commit --essence "Trust" --ethic "Transparency" --expression "Added audit logs"
```

---

### `intent init`

Creates an `.intentrc.json` file in your project root for customizing your available essences and ethics.

**Behavior:**
- Prompts you to define essences and ethics.
- Warns if file already exists and confirms before overwriting.

**Example:**
```bash
intent init
```

---

### `intent branch` *(Planned)*

Creates a doctrinally tagged branch.

**Options:**
- `--essence`
- `--ethic`
- `--name` (or direct branch name)

**Example:**
```bash
intent branch fix-login --essence "Security" --ethic "Improve access control"
# => branch: security/improve-access-control/fix-login
```

---

## Planned Features

- `intent config init` ✅ (covered in `init`)
- `intent preset save/load`
- `intent dashboard`

---

> Need help or want to contribute? Check out the README or submit an issue on GitHub.
