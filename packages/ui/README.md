# @gately/ui

Shared React component library for the editor.

## What's Inside

- `components/simulator/` - Editor UI (LogicGateSimulator, FileExplorer, Toolbar, etc.)
- `components/nodes/` - Logic gate nodes (AND, OR, NOT, XOR, NAND, NOR, etc.)
- `components/ui/` - shadcn/ui primitives (Button, Dialog, Dropdown, etc.)
- `hooks/` - React hooks (useTheme, etc.)
- `styles/globals.css` - Design system

## Usage

```tsx
import { LogicGateSimulator } from "@gately/ui/components/simulator/simulator";
import { useTheme } from "@gately/ui/hooks/use-theme";
import "@gately/ui/globals.css";
```

## Development

```bash
bun build      # TypeScript compilation
bun typecheck  # Type checking
bun lint       # Biome linting
```
