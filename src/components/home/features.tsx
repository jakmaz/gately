import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import {
  Share2,
  Table,
  Zap,
  Settings,
  LayoutTemplate,
  Cpu,
} from "lucide-react";

const features = [
  {
    title: "Modern & Smooth Interface",
    description:
      "Built with performance and polish in mind—Gately offers a sleek and intuitive experience on all devices.",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Drag-and-Drop Editor",
    description:
      "Design circuits with a user-friendly drag-and-drop canvas. Connect gates and build logic visually and efficiently.",
    icon: <LayoutTemplate className="size-5" />,
  },
  {
    title: "Logic Gate Toolbox",
    description:
      "Access a full set of gates including AND, OR, NOT, XOR, NAND, NOR and more. Everything you need to build powerful logic flows.",
    icon: <Cpu className="size-5" />,
  },
  {
    title: "Circuit Sharing",
    description:
      "Easily share your logic circuits with a link—perfect for collaboration, teaching, or showcasing your designs.",
    icon: <Share2 className="size-5" />,
  },
  {
    title: "Truth Table Generation",
    description:
      "Automatically generate comprehensive truth tables for any logical circuit or boolean expression.",
    icon: <Table className="size-5" />,
  },
  {
    title: "Customizable Settings",
    description:
      "Tweak grid snapping, labels, themes, and more to personalize your logic editor environment.",
    icon: <Settings className="size-5" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="w-full py-14 md:py-32 relative isolate">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(from_var(--primary)_r_g_b_/_0.03),transparent_70%)]"></div>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
            variant="secondary"
          >
            <span className="mr-1 text-primary">✦</span> Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Powerful Customization Tools
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Gately provides all the tools you need to build and customize your logic circuits.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-card to-card/50 backdrop-blur transition-all hover:shadow-lg hover:border-primary/20 group">
                <CardContent>
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
