# AGENTS.md

This guide is for agentic coding agents (AI assistants) working on the Gately codebase. Gately is a visual logic editor for building, simulating, and sharing digital circuits using Next.js, React, and ReactFlow.

## Package Manager & Development

**IMPORTANT**: This project uses **bun** as the package manager. Always use `bun` commands, never `npm` or `yarn`.

**CRITICAL**: Never start any development servers yourself. Do not run `bun dev`, `bun start`, or any server commands without explicit user permission.

## Build, Lint & Test Commands

```bash
# Development (DO NOT RUN WITHOUT PERMISSION)
bun dev                    # Start development server on localhost:3000

# Building
bun run build              # Build for production
bun start                  # Start production server (DO NOT RUN)

# Code Quality
bun run lint               # Run Biome linter and formatter checks
bun run format             # Format code with Biome

# Package Management
bun install                # Install dependencies
bun add <package>          # Add new dependency
bun remove <package>       # Remove dependency
```

**Note**: This project currently has no test setup. If tests need to be added, consider Vitest or Jest.

## Project Structure

```
src/
├── app/                   # Next.js App Router pages and layouts
├── components/            # React components
│   ├── nodes/            # Logic gate and circuit node components
│   │   ├── base/         # Shared gate infrastructure
│   │   ├── and.tsx       # Individual gate components (self-contained)
│   │   └── ...           # Other gates (or, not, xor, nand, etc.)
│   ├── ui/               # shadcn/ui components
│   ├── simulator/        # Circuit simulation components
│   └── home/             # Landing page components
├── lib/                  # Utilities and types
├── hooks/                # Custom React hooks
└── utils/                # Helper functions
```

## Code Style Guidelines

### Imports
```typescript
// Order: external, internal (@/), relative
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { type GateGeometry, GateRenderer } from "./base/index";

// Use type imports when importing only for types
import type { LogicGateProps } from "@/lib/types";
```

### Formatting
- **Formatter**: Biome (configured in `biome.json`)
- **Line width**: 120 characters
- **Indentation**: 2 spaces
- **Organize imports**: Automatic via Biome

### TypeScript Guidelines
```typescript
// Always use strict TypeScript with proper types
interface ComponentProps {
  id: string;
  data: GateNodeProps;
  isConnectable: boolean;
}

// Use type assertions sparingly, prefer type guards
function isValidNode(node: unknown): node is Node {
  return typeof node === 'object' && node !== null;
}

// Prefer type over interface for simple types
type Status = 'loading' | 'success' | 'error';

// Use interface for extensible object shapes
interface BaseProps {
  children: React.ReactNode;
}
```

### React Component Guidelines
```typescript
// Use memo for performance when appropriate
export const GateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  return <div>{/* component content */}</div>;
});

// Always set displayName for better debugging
GateNode.displayName = "GateNode";

// Use "use client" directive for client components
"use client";

// Prefer function declarations for components
function ComponentName() {
  return <div />;
}
```

### Naming Conventions
- **Files**: kebab-case for regular files, PascalCase for components (`gate-renderer.tsx`, `GateNode.tsx`)
- **Components**: PascalCase (`GateRenderer`, `InputNode`)
- **Variables/functions**: camelCase (`activeColor`, `getGeometry`)
- **Constants**: UPPER_SNAKE_CASE (`HANDLE_SIZE`, `DEFAULT_WIDTH`)
- **Types/Interfaces**: PascalCase (`GateGeometry`, `LogicGateProps`)

### CSS & Styling
```typescript
// Use Tailwind classes with cn() utility for conditional styling
import { cn } from "@/lib/utils";

className={cn(
  "base-classes",
  condition && "conditional-classes",
  className // Allow className override
)}

// Use CSS custom properties for theme colors (established pattern)
style={{
  borderColor: data.state ? "var(--color-success)" : "var(--color-primary)",
  background: "var(--card, #1a1a2e)"
}}

// Avoid hard-coded hex colors - use theme system
// ❌ borderColor: "#22c55e"  
// ✅ borderColor: "var(--color-success)"
```

### Gate Component Architecture
Each gate component should be self-contained with its own geometry:

```typescript
"use client";
import { memo } from "react";
import { type GateGeometry, GateRenderer, W, H, type LogicGateProps } from "./base/index";

function getGateGeometry(): GateGeometry {
  return {
    bodyPath: "M10 4 L70 30 L10 56 Z", // SVG path
    outputX: 70,
    outputY: 30,
    inputPinX: 10,
  };
}

export const GateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const geometry = getGateGeometry();
  
  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={geometry}
      label="GATE"
      symbol="&"
      inputHandles={2}
      outputHandles={1}
    />
  );
});
```

### Error Handling
```typescript
// Use Result pattern or throw meaningful errors
function parseCircuit(data: unknown): CircuitData | null {
  try {
    // validation logic
    return parsedData;
  } catch (error) {
    console.error("Failed to parse circuit data:", error);
    return null;
  }
}

// Handle async operations properly
async function saveCircuit(data: CircuitData) {
  try {
    await api.save(data);
  } catch (error) {
    console.error("Failed to save circuit:", error);
    throw new Error("Circuit save failed");
  }
}
```

## Key Technologies & Patterns

- **React Flow**: For circuit diagram nodes and edges
- **Tailwind CSS v4**: Using CSS custom properties and @theme inline syntax
- **Radix UI**: Accessible component primitives
- **Zustand**: State management for circuit data
- **Next.js App Router**: File-based routing
- **Motion**: Animation library (prefer over Framer Motion)

## File Modification Rules

1. **Always read files before editing** - Use Read tool first
2. **Preserve existing patterns** - Match established code style
3. **Component isolation** - Each gate owns its geometry and rendering
4. **Theme consistency** - Use CSS custom properties, not hard-coded colors
5. **Type safety** - Ensure all TypeScript types are properly defined

## Common Tasks

- **Adding gates**: Create self-contained component in `/components/nodes/`
- **Theme changes**: Modify `/src/app/globals.css` custom properties
- **UI components**: Use shadcn/ui patterns in `/components/ui/`
- **Simulation logic**: Update `/src/lib/simulator.ts`

Remember: This project prioritizes clean architecture with self-contained components, strong TypeScript typing, and consistent theming. Always maintain these principles when making changes.
