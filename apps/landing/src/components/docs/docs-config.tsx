import { BookOpen, Lightbulb, Rocket, Wrench } from "lucide-react";

export const docsSections = [
    {
        title: "Getting Started",
        description: "Quick start guide to building your first circuit",
        icon: <Rocket className="size-5" />,
        topics: [
            { label: "Creating your first circuit", href: "/docs/first-circuit" },
            { label: "Understanding the interface", href: "/docs/interface" },
            { label: "Basic gate operations", href: "/docs/gate-operations" },
            { label: "Saving and loading projects", href: "/docs/saving-projects" },
        ],
    },
    {
        title: "Gate Reference",
        description: "Complete guide to all available logic gates",
        icon: <BookOpen className="size-5" />,
        topics: [
            { label: "AND, OR, NOT gates", href: "/docs/basic-gates" },
            { label: "NAND and NOR gates", href: "/docs/nand-nor-gates" },
            { label: "XOR and XNOR gates", href: "/docs/xor-xnor-gates" },
            { label: "Truth tables explained", href: "/docs/truth-tables" },
        ],
    },
    {
        title: "Editor Features",
        description: "Master the circuit editor tools",
        icon: <Wrench className="size-5" />,
        topics: [
            { label: "Drag and drop components", href: "/docs/drag-drop" },
            { label: "Wiring and connections", href: "/docs/wiring" },
            { label: "Labeling and organization", href: "/docs/labeling" },
            { label: "Keyboard shortcuts", href: "/docs/shortcuts" },
        ],
    },
    {
        title: "Tutorials",
        description: "Step-by-step project guides",
        icon: <Lightbulb className="size-5" />,
        topics: [
            { label: "Build a half adder", href: "/docs/half-adder" },
            { label: "Create a full adder", href: "/docs/full-adder" },
            { label: "Design a multiplexer", href: "/docs/multiplexer" },
            { label: "Complex circuit patterns", href: "/docs/patterns" },
        ],
    },
];
