# Git Intent CLI — Help Reference

## Commands

### `intent commit`

Creates a structured commit based on declared intent.

**Options:**
- `--essence <value>`: Higher purpose (e.g. Security, Simplicity)
- `--ethic <value>`: Principle guiding the change (e.g. Protect users)
- `--expression <text>`: What the change actually is

**Example:**
```bash
intent commit --essence "Trust" --ethic "Transparency" --expression "Added audit logs"
```

### `intent branch`

Creates a doctrinally tagged branch.

**Options:**

- `--essence`
- `--ethic`
- `--name` (or direct branch name)

**Example**

```bash
intent branch fix-login --essence "Security" --ethic "Improve access control"
# => branch: security/improve-access-control/fix-login
```

## Planned

- `intent config init`
- `intent preset save/load`
- `intent dashboard`