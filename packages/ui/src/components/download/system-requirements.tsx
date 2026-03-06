import { Cpu, HardDrive, MonitorCheck } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";

const platforms = [
  {
    platform: "macOS",
    icon: <MonitorCheck className="size-6" />,
    requirements: [
      "macOS 11.0 (Big Sur) or later",
      "Intel or Apple Silicon (M1/M2/M3)",
      "4 GB RAM minimum (8 GB recommended)",
      "200 MB free disk space",
    ],
    status: "Coming Soon",
  },
  {
    platform: "Windows",
    icon: <MonitorCheck className="size-6" />,
    requirements: [
      "Windows 10 version 1809 or later",
      "64-bit processor",
      "4 GB RAM minimum (8 GB recommended)",
      "200 MB free disk space",
    ],
    status: "In Development",
  },
  {
    platform: "Linux",
    icon: <MonitorCheck className="size-6" />,
    requirements: [
      "Ubuntu 20.04 LTS or equivalent",
      "64-bit processor",
      "4 GB RAM minimum (8 GB recommended)",
      "200 MB free disk space",
    ],
    status: "Planned",
  },
];

export function SystemRequirements() {
  return (
    <section className="w-full py-14 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Cpu className="size-8" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">System Requirements</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Gately Desktop is optimized to run smoothly on modern hardware with minimal system resources
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full border-border/40 bg-gradient-to-b from-card to-card/50 backdrop-blur hover:shadow-lg transition-all hover:border-primary/20 group">
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                        {platform.icon}
                      </div>
                      <h3 className="text-xl font-bold">{platform.platform}</h3>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium px-3 py-1 rounded-full bg-muted">
                      {platform.status}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {platform.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <HardDrive className="size-4 mt-0.5 shrink-0 text-primary" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Note:</span> These are minimum requirements. For the best
            experience with large circuits, we recommend higher specifications.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
