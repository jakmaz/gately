import { Battery, CloudOff, Gauge, HardDrive, Keyboard, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";

const features = [
  {
    title: "Native Performance",
    description: "Lightning-fast rendering and simulation powered by native code. No browser overhead.",
    icon: <Zap className="size-5" />,
    gradient: "from-yellow-500/10 to-orange-500/10",
  },
  {
    title: "Offline First",
    description: "Work on your circuits anywhere, anytime. No internet connection required.",
    icon: <CloudOff className="size-5" />,
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "System Integration",
    description: "Native file system access, drag-and-drop, and OS-level shortcuts.",
    icon: <HardDrive className="size-5" />,
    gradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    title: "Optimized Battery",
    description: "Efficient resource usage means longer battery life on laptops.",
    icon: <Battery className="size-5" />,
    gradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Advanced Shortcuts",
    description: "Full keyboard navigation and customizable shortcuts for power users.",
    icon: <Keyboard className="size-5" />,
    gradient: "from-indigo-500/10 to-violet-500/10",
  },
  {
    title: "Better Responsiveness",
    description: "Smoother animations and instant feedback, even with complex circuits.",
    icon: <Gauge className="size-5" />,
    gradient: "from-red-500/10 to-rose-500/10",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function DesktopFeatures() {
  return (
    <section className="w-full py-14 md:py-24 relative isolate bg-muted/20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(from_var(--primary)_r_g_b_/_0.05),transparent_60%)]"></div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Why Choose Desktop?
          </h2>
          <p className="text-muted-foreground text-lg">
            Get the best possible experience with native desktop power and flexibility
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
              <Card
                className={`h-full overflow-hidden border-border/40 bg-gradient-to-br ${feature.gradient} backdrop-blur transition-all hover:shadow-xl hover:border-primary/30 group relative`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
