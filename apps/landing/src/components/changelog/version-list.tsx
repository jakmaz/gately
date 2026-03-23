import { Badge } from "@gately/ui/components/ui/badge";
import { Card, CardContent } from "@gately/ui/components/ui/card";
import { Check, Plus, Sparkles, Wrench } from "lucide-react";

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
    version: "0.0.1",
    date: "2026-03-23",
    status: "latest",
    changes: [
      { type: "added", description: "Initial public release" }
    ],
  }
];

const changeTypeConfig = {
  added: {
    icon: <Plus className="size-3.5" />,
    label: "Added",
  },
  improved: {
    icon: <Sparkles className="size-3.5" />,
    label: "Improved",
  },
  fixed: {
    icon: <Wrench className="size-3.5" />,
    label: "Fixed",
  },
};

export function VersionList() {
  return (
    <section className="w-full py-14 md:py-24 relative isolate">
      {/* Graph paper background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block"></div>

          <div className="space-y-6">
            {versions.map((version) => (
              <div key={version.version} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-8 top-6 size-3 rounded-full bg-primary border-4 border-background shadow-lg hidden md:block -translate-x-1/2 z-10"></div>

                <Card className="md:ml-20 border-border/40 bg-card/80 backdrop-blur hover:shadow-md hover:border-primary/30 transition-all group">
                  <CardContent className="p-5">
                    {/* Compact header */}
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold">v{version.version}</h3>
                      {version.status === "latest" && (
                        <Badge variant="default" className="shadow-sm h-5 text-xs">
                          <Check className="size-3 mr-1" />
                          Latest
                        </Badge>
                      )}
                      {version.status === "beta" && (
                        <Badge variant="secondary" className="shadow-sm h-5 text-xs">
                          Beta
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(version.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Compact changes - grouped by type */}
                    <div className="space-y-3">
                      {(["added", "improved", "fixed"] as const).map((type) => {
                        const items = version.changes.filter((c) => c.type === type);
                        if (items.length === 0) return null;

                        const config = changeTypeConfig[type];
                        return (
                          <div key={type} className="space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                              <div className="size-6 rounded bg-primary/10 flex items-center justify-center text-primary">
                                {config.icon}
                              </div>
                              <span className="uppercase tracking-wider">{config.label}</span>
                            </div>
                            <ul className="ml-8 space-y-1">
                              {items.map((item) => (
                                <li
                                  key={item.description}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-start gap-2 group/item"
                                >
                                  <span className="text-primary/40 group-hover/item:text-primary/70 transition-colors mt-1">
                                    •
                                  </span>
                                  <span className="flex-1">{item.description}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
