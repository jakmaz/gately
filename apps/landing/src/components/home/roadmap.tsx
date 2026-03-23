import { Badge } from "@gately/ui/components/ui/badge";
import { Card, CardContent } from "@gately/ui/components/ui/card";
import { Brain, Folder, Grid, Layers, Share2, Users } from "lucide-react";

const roadmapItems = [
  {
    title: "One-Click Sharing",
    description: "Instantly generate shareable links to collaborate or demonstrate your circuits.",
    status: "In Progress",
    icon: <Share2 className="size-5" />,
  },
  {
    title: "Multi-Project Dashboard",
    description: "Organize and switch between multiple circuit projects from a unified dashboard.",
    status: "Planned",
    icon: <Layers className="size-5" />,
  },
  {
    title: "Circuit Validation Tools",
    description: "Run automated checks to identify errors and optimize your circuit designs.",
    status: "Planned",
    icon: <Grid className="size-5" />,
  },
  {
    title: "Reusable Circuit Library",
    description: "Save and reuse commonly used logic modules across projects for faster circuit design.",
    status: "Coming Soon",
    icon: <Folder className="size-5" />,
  },
  {
    title: "Automatic Gate Alignment",
    description: "Automatically arrange your logic gates for a cleaner and more readable circuit layout.",
    status: "Coming Soon",
    icon: <Brain className="size-5" />,
  },
  {
    title: "Community Circuits",
    description: "Browse, submit, and rate circuits created by the Gately community.",
    status: "Coming Soon",
    icon: <Users className="size-5" />,
  },
];

export function Roadmap() {
  return (
    <section
      id="roadmap"
      className="from-muted/30 relative isolate w-full overflow-hidden bg-linear-180 from-50% to-transparent py-14 md:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(from_var(--secondary)_r_g_b_/0.05),transparent_50%)]"></div>

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm" variant="secondary">
            <span className="text-primary mr-1">✦</span> Roadmap
          </Badge>
          <h2 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            What&apos;s Coming Next
          </h2>
          <p className="text-muted-foreground max-w-[800px] md:text-lg">
            We&apos;re constantly working to improve Gately and add new features. Here&apos;s what&apos;s on our
            roadmap.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roadmapItems.map((item) => (
            <div key={item.title}>
              <Card className="border-border/40 from-card to-card/50 hover:border-primary/20 h-full overflow-hidden bg-gradient-to-b backdrop-blur transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                <CardContent>
                  <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-full">
                    {item.icon}
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <Badge
                      variant={
                        item.status === "In Progress"
                          ? "default"
                          : item.status === "Coming Soon"
                            ? "secondary"
                            : "outline"
                      }
                      className="shadow-sm"
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
