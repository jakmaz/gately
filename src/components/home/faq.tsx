import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    question: "What is Gately?",
    answer:
      "Gately is a modern, visual editor for designing logic circuits. It allows you to build, customize, and share logic gate diagrams with a smooth and intuitive interface.",
  },
  {
    question: "Is Gately free to use?",
    answer:
      "Yes, Gately is completely free to use. We may add optional premium features in the future, but all core functionality will remain free.",
  },
  {
    question: "Do I need to know digital logic to use Gately?",
    answer:
      "No prior experience is required! Gately is designed to be beginner-friendly, with visual tools that let anyone experiment with logic gates. That said, some knowledge of digital logic can help you build more complex circuits.",
  },
  {
    question: "Can I share my circuits with others?",
    answer:
      "Absolutely. Every circuit can be shared with a unique link, making it easy to collaborate, teach, or showcase your designs.",
  },
  {
    question: "Does Gately support custom logic blocks?",
    answer:
      "Support for reusable/custom logic blocks is on our roadmap. In the meantime, you can manually recreate frequently used patterns.",
  },
  {
    question: "Can I use Gately for teaching or presentations?",
    answer:
      "Yes! Gately is perfect for education and demos. You can build circuits, walk through logic visually, and export or share them with ease.",
  },
  {
    question: "Is Gately open source?",
    answer:
      "Yes :) Gately is open source. You can explore the code on GitHub, contribute to development, or join the community on Discord for help and feedback.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full py-20 md:py-32">
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
            <span className="mr-1 text-primary">✦</span> FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Find answers to common questions about Gately.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border-b border-border/40 py-2 group"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline group-hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
