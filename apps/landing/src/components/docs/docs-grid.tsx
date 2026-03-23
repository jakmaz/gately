import { ArrowRight } from "lucide-react";
import { docsSections } from "./docs-config";

export function DocsGrid() {
  return (
    <section className="w-full py-14 md:py-24 relative isolate bg-muted/20">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {docsSections.map((section) => (
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
