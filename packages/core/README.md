# @gately/core

Core logic simulation engine - handles circuit evaluation and truth tables.

## What's Inside

- `simulator.ts` - Circuit simulation
- `types.ts` - Type definitions
- `utils.ts` - Utilities
- `export/` - Export functionality

## Usage

```tsx
import { simulateCircuit } from "@gately/core/simulator";
import type { CircuitNode } from "@gately/core/types";
```

## Development

```bash
bun build      # TypeScript compilation
bun typecheck  # Type checking
bun lint       # Biome linting
```
