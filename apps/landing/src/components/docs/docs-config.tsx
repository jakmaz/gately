import { BookOpen, Lightbulb, Rocket, Wrench } from "lucide-react";

export const docsSections = [
  {
    title: "Getting Started",
    description: "Quick start guide to building your first circuit",
    icon: <Rocket className="size-5" />,
    topics: [
      { label: "Creating your first circuit", href: "/learn/first-circuit" },
      { label: "Understanding the interface", href: "/learn/interface" },
      { label: "Basic gate operations", href: "/learn/gate-operations" },
      { label: "Saving and loading projects", href: "/learn/saving-projects" },
    ],
  },
  {
    title: "Gate Reference",
    description: "Complete guide to all available logic gates",
    icon: <BookOpen className="size-5" />,
    topics: [
      { label: "AND, OR, NOT gates", href: "/learn/basic-gates" },
      { label: "NAND and NOR gates", href: "/learn/nand-nor-gates" },
      { label: "XOR and XNOR gates", href: "/learn/xor-xnor-gates" },
      { label: "Truth tables explained", href: "/learn/truth-tables" },
    ],
  },
  {
    title: "Editor Features",
    description: "Master the circuit editor tools",
    icon: <Wrench className="size-5" />,
    topics: [
      { label: "Drag and drop components", href: "/learn/drag-drop" },
      { label: "Wiring and connections", href: "/learn/wiring" },
      { label: "Labeling and organization", href: "/learn/labeling" },
      { label: "Keyboard shortcuts", href: "/learn/shortcuts" },
    ],
  },
  {
    title: "Tutorials",
    description: "Step-by-step project guides",
    icon: <Lightbulb className="size-5" />,
    topics: [
      { label: "Build a half adder", href: "/learn/half-adder" },
      { label: "Create a full adder", href: "/learn/full-adder" },
      { label: "Design a multiplexer", href: "/learn/multiplexer" },
      { label: "Complex circuit patterns", href: "/learn/patterns" },
    ],
  },
];
