import { BookOpen, Lightbulb, Rocket, Wrench } from "lucide-react";

export const docsSections = [
  {
    title: "Getting started",
    description: "Build a circuit and learn the editor basics",
    icon: <Rocket className="size-5" />,
    topics: [
      { label: "Your first circuit", href: "/learn/first-circuit" },
      { label: "The interface", href: "/learn/interface" },
      { label: "Basic gate operations", href: "/learn/gate-operations" },
      { label: "Saving and loading", href: "/learn/saving-projects" },
    ],
  },
  {
    title: "Gate reference",
    description: "Compare gate behavior and truth tables",
    icon: <BookOpen className="size-5" />,
    topics: [
      { label: "AND, OR, NOT gates", href: "/learn/basic-gates" },
      { label: "NAND and NOR gates", href: "/learn/nand-nor-gates" },
      { label: "XOR and XNOR gates", href: "/learn/xor-xnor-gates" },
      { label: "Truth tables", href: "/learn/truth-tables" },
    ],
  },
  {
    title: "Editor features",
    description: "Place, connect, and organize components",
    icon: <Wrench className="size-5" />,
    topics: [
      { label: "Drag and drop", href: "/learn/drag-drop" },
      { label: "Wiring and connections", href: "/learn/wiring" },
      { label: "Labeling and organization", href: "/learn/labeling" },
      { label: "Keyboard shortcuts", href: "/learn/shortcuts" },
    ],
  },
  {
    title: "Tutorials",
    description: "Combine gates into larger circuits",
    icon: <Lightbulb className="size-5" />,
    topics: [
      { label: "Build a half adder", href: "/learn/half-adder" },
      { label: "Build a full adder", href: "/learn/full-adder" },
      { label: "Build a multiplexer", href: "/learn/multiplexer" },
      { label: "Circuit patterns", href: "/learn/patterns" },
    ],
  },
];
