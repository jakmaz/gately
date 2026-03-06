import { Battery, CloudOff, Gauge, HardDrive, Keyboard, Zap } from "lucide-react";

const features = [
  {
    title: "Native Performance",
    description: "Lightning-fast rendering and simulation powered by native code",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Offline First",
    description: "Work on your circuits anywhere, no internet connection required",
    icon: <CloudOff className="size-5" />,
  },
  {
    title: "System Integration",
    description: "Native file system access, drag-and-drop support",
    icon: <HardDrive className="size-5" />,
  },
  {
    title: "Optimized Battery",
    description: "Efficient resource usage for longer battery life",
    icon: <Battery className="size-5" />,
  },
  {
    title: "Advanced Shortcuts",
    description: "Full keyboard navigation and customizable shortcuts",
    icon: <Keyboard className="size-5" />,
  },
  {
    title: "Better Responsiveness",
    description: "Smoother animations and instant feedback",
    icon: <Gauge className="size-5" />,
  },
];

export function DesktopFeatures() {
  return (
    <section className="w-full py-14 md:py-24 relative isolate">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Why Choose Desktop?
          </h2>
          <p className="text-muted-foreground">
            Native desktop power and flexibility for the best circuit design experience
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="group relative">
              <div className="h-full border border-border/40 bg-gradient-to-b from-card to-card/50 backdrop-blur hover:shadow-lg transition-all hover:border-primary/20 hover:-translate-y-1 duration-300 rounded-lg p-5 space-y-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-base group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
