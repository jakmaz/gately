import { ArrowRight, BookOpen, Lightbulb, Rocket, Wrench } from "lucide-react";

const sections = [
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

export function DocsGrid() {
  return (
    <section className="w-full py-14 md:py-24 relative isolate bg-muted/20">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <div key={section.title} className="group relative">
              <div className="h-full border border-border/40 bg-gradient-to-b from-card to-card/50 backdrop-blur hover:shadow-lg transition-all hover:border-primary/20 rounded-lg p-6 space-y-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  {section.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{section.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                </div>

                <ul className="space-y-2.5 text-sm">
                  {section.topics.map((topic) => (
                    <li
                      key={topic.label}
                      className="flex items-start gap-2 text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      <ArrowRight className="size-3.5 mt-0.5 shrink-0 text-primary/60" />
                      {topic.href ? (
                        <a href={topic.href} className="hover:text-primary transition-colors hover:underline">
                          {topic.label}
                        </a>
                      ) : (
                        <span>{topic.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
