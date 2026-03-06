import { Check, Plus, Sparkles, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

interface ChangeEntry {
  type: "added" | "improved" | "fixed";
  description: string;
}

interface Version {
  version: string;
  date: string;
  status?: "latest" | "beta";
  changes: ChangeEntry[];
}

const versions: Version[] = [
  {
    version: "1.0.0",
    date: "2024-12-15",
    status: "latest",
    changes: [
      { type: "added", description: "Initial public release" },
      { type: "added", description: "Complete logic gate library (AND, OR, NOT, XOR, NAND, NOR)" },
      { type: "added", description: "Drag-and-drop circuit editor" },
      { type: "added", description: "Real-time circuit simulation" },
      { type: "added", description: "Automatic truth table generation" },
      { type: "added", description: "Dark and light theme support" },
      { type: "added", description: "Local storage for circuit persistence" },
      { type: "improved", description: "Smooth animations and transitions" },
      { type: "improved", description: "Responsive design for all devices" },
    ],
  },
  {
    version: "0.9.0",
    date: "2024-11-28",
    changes: [
      { type: "added", description: "Custom labels for gates and wires" },
      { type: "added", description: "Grid snapping and alignment tools" },
      { type: "improved", description: "Enhanced wire routing algorithm" },
      { type: "improved", description: "Performance optimizations for large circuits" },
      { type: "fixed", description: "Connection detection issues" },
      { type: "fixed", description: "Safari rendering bugs" },
    ],
  },
  {
    version: "0.8.0",
    date: "2024-11-10",
    changes: [
      { type: "added", description: "Multi-file project support" },
      { type: "added", description: "Import/export functionality" },
      { type: "improved", description: "Redesigned toolbar and toolbox" },
      { type: "fixed", description: "Memory leaks in simulation engine" },
      { type: "fixed", description: "Undo/redo state management" },
    ],
  },
];

const changeTypeConfig = {
  added: {
    icon: <Plus className="size-4" />,
    color: "text-green-500",
    bg: "bg-green-500/10",
    label: "Added",
  },
  improved: {
    icon: <Sparkles className="size-4" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    label: "Improved",
  },
  fixed: {
    icon: <Wrench className="size-4" />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    label: "Fixed",
  },
};

export function VersionList() {
  return (
    <section className="w-full py-14 md:py-24 relative isolate">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {versions.map((version, versionIdx) => (
            <motion.div
              key={version.version}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: versionIdx * 0.1 }}
            >
              <Card className="border-border/40 bg-gradient-to-b from-card to-card/50 backdrop-blur hover:shadow-lg transition-all overflow-hidden">
                <CardContent className="space-y-6">
                  {/* Version Header */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-border/40">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">v{version.version}</h3>
                        {version.status === "latest" && (
                          <Badge variant="default" className="shadow-sm">
                            <Check className="size-3 mr-1" />
                            Latest
                          </Badge>
                        )}
                        {version.status === "beta" && (
                          <Badge variant="secondary" className="shadow-sm">
                            Beta
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Released on{" "}
                        {new Date(version.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Changes List */}
                  <div className="space-y-3">
                    {version.changes.map((change) => {
                      const config = changeTypeConfig[change.type];
                      return (
                        <motion.div
                          key={change.description}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: versionIdx * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                        >
                          <div
                            className={`${config.bg} ${config.color} size-8 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                          >
                            {config.icon}
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                            </div>
                            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                              {change.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent -z-10 hidden md:block"
        ></motion.div>
      </div>
    </section>
  );
}
