import { Boxes, Braces, Circle, GitBranch, Orbit, Zap } from "lucide-react";
import { Card, CardContent } from "@gately/ui/components/ui/card";
import { Badge } from "@gately/ui/components/ui/badge";

const categories = [
  {
    title: "Logic Gates",
    description: "Complete gate library",
    icon: <Circle className="size-5" />,
    items: [
      { name: "AND Gate", icon: "∧", description: "Basic conjunction logic" },
      { name: "OR Gate", icon: "∨", description: "Basic disjunction logic" },
      { name: "NOT Gate", icon: "¬", description: "Logic inverter" },
      { name: "XOR Gate", icon: "⊕", description: "Exclusive OR operation" },
      { name: "NAND Gate", icon: "⊼", description: "Universal logic gate" },
      { name: "NOR Gate", icon: "⊽", description: "Universal logic gate" },
    ],
  },
  {
    title: "Circuit Components",
    description: "Advanced building blocks",
    icon: <Boxes className="size-5" />,
    items: [
      { name: "Toggle Switch", icon: "◉", description: "Interactive input control" },
      { name: "LED Output", icon: "●", description: "Visual output indicator" },
      { name: "Clock Signal", icon: "⌇", description: "Timed pulse generator" },
      { name: "Custom Labels", icon: "A", description: "Name your components" },
    ],
  },
  {
    title: "Editor Features",
    description: "Powerful editing tools",
    icon: <Braces className="size-5" />,
    items: [
      { name: "Drag & Drop", icon: "⇄", description: "Intuitive component placement" },
      { name: "Smart Wiring", icon: "─", description: "Auto-routing connections" },
      { name: "Grid Snapping", icon: "#", description: "Precise alignment" },
      { name: "Undo/Redo", icon: "↺", description: "Full history support" },
      { name: "Zoom & Pan", icon: "⊕", description: "Navigate large circuits" },
      { name: "Multi-Select", icon: "□", description: "Batch operations" },
    ],
  },
  {
    title: "Simulation",
    description: "Real-time circuit testing",
    icon: <Zap className="size-5" />,
    items: [
      { name: "Live Simulation", icon: "▶", description: "Instant feedback" },
      { name: "Truth Tables", icon: "⊞", description: "Auto-generated tables" },
      { name: "Signal Flow", icon: "→", description: "Visual signal tracing" },
      { name: "Step-by-Step", icon: "⊳", description: "Debug mode" },
    ],
  },
  {
    title: "Organization",
    description: "Manage your projects",
    icon: <GitBranch className="size-5" />,
    items: [
      { name: "Multiple Files", icon: "📁", description: "Organize circuits" },
      { name: "Local Storage", icon: "💾", description: "Auto-save to browser" },
      { name: "Import/Export", icon: "⇅", description: "JSON file support" },
      { name: "Quick Search", icon: "🔍", description: "Find components fast" },
    ],
  },
  {
    title: "Customization",
    description: "Make it your own",
    icon: <Orbit className="size-5" />,
    items: [
      { name: "Dark/Light Mode", icon: "☾", description: "Theme switching" },
      { name: "Custom Colors", icon: "🎨", description: "Personalize gates" },
      { name: "Grid Settings", icon: "⊞", description: "Adjust grid size" },
      { name: "Shortcuts", icon: "⌘", description: "Keyboard navigation" },
    ],
  },
];

export function FeatureShowcase() {
  return (
    <section className="w-full py-14 md:py-24 relative isolate">
      {/* Graph paper background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(from_var(--primary)_r_g_b_/_0.05),transparent_70%)]"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm mb-4" variant="secondary">
            ✦ Feature Categories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Comprehensive Toolset
          </h2>
          <p className="text-muted-foreground text-lg">
            From basic gates to advanced circuit design, every feature is crafted for your workflow
          </p>
        </div>

        {/* Asymmetric masonry-style grid layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, idx) => {
            // Vary card sizes for visual interest
            const isLarge = idx === 0 || idx === 2;
            const spanClass = isLarge ? "lg:col-span-2" : "lg:col-span-1";

            return (
              <div key={category.title} className={spanClass}>
                <Card className="h-full border-border/40 bg-card/50 backdrop-blur hover:shadow-lg hover:border-primary/30 transition-all duration-300 group relative overflow-hidden">
                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>

                  <CardContent className="relative">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/40">
                      <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-primary/15 transition-all duration-300 shadow-sm">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold tracking-tight">{category.title}</h3>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                      </div>
                    </div>

                    {/* Items in compact grid */}
                    <div className={`grid gap-2 ${isLarge ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                      {category.items.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-2.5 p-2.5 rounded-md bg-background/40 hover:bg-background/70 transition-all border border-border/20 hover:border-primary/20 hover:translate-x-0.5 duration-200 group/item"
                        >
                          <div className="text-xl w-7 h-7 flex items-center justify-center shrink-0 text-primary/80 group-hover/item:text-primary group-hover/item:scale-110 transition-all">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-xs leading-tight">{item.name}</div>
                            <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
