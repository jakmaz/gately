import { BookOpen, Lightbulb, Rocket, Wrench } from "lucide-react";

export const docsSections = [
    {
        title: "Getting Started",
        description: "Quick start guide to building your first circuit",
        icon: <Rocket className="size-5" />,
        topics: [
            { label: "Creating your first circuit", href: "/docs/first-circuit" },
            { label: "Understanding the interface" },
            { label: "Basic gate operations", href: "/docs/basic-gates" },
            { label: "Saving and loading projects" },
        ],
    },
    {
        title: "Gate Reference",
        description: "Complete guide to all available logic gates",
        icon: <BookOpen className="size-5" />,
        topics: [
            { label: "AND, OR, NOT gates", href: "/docs/basic-gates" },
            { label: "NAND and NOR gates" },
            { label: "XOR and XNOR gates" },
            { label: "Truth tables explained" },
        ],
    },
    {
        title: "Editor Features",
        description: "Master the circuit editor tools",
        icon: <Wrench className="size-5" />,
        topics: [
            { label: "Drag and drop components" },
            { label: "Wiring and connections" },
            { label: "Labeling and organization" },
            { label: "Keyboard shortcuts", href: "/docs/shortcuts" },
        ],
    },
    {
        title: "Tutorials",
        description: "Step-by-step project guides",
        icon: <Lightbulb className="size-5" />,
        topics: [
            { label: "Build a half adder" },
            { label: "Create a full adder" },
            { label: "Design a multiplexer" },
            { label: "Complex circuit patterns" },
        ],
    },
];
