"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";

export const faqs = [
  {
    question: "Is Gately free?",
    answer:
      "Yes. The editor and learning material are free to use. Gately is open source, and you can read the code on GitHub.",
  },
  {
    question: "Do I need to know digital logic?",
    answer:
      "No. Start with two input switches and an AND gate. The interactive lessons explain gates, truth tables, and how to combine them into circuits.",
  },
  {
    question: "Where are my circuits saved?",
    answer:
      "Circuit files are stored locally in your browser. Export a JSON file to keep a backup or move a circuit to another device. Clearing browser data can remove locally saved work.",
  },
  {
    question: "Can I share a circuit?",
    answer:
      "You can export a circuit as a JSON file and send that file to someone else to import. Sharing through a public circuit link is not available.",
  },
  {
    question: "What can I simulate?",
    answer:
      "Build digital logic with switches, outputs, basic gates, multiplexers, and demultiplexers. Gately evaluates binary states; it does not model analog voltages or physical electronics.",
  },
];

function FAQItem({ question, answer }: (typeof faqs)[number]) {
  const [open, setOpen] = useState(false);
  const answerId = useId();

  return (
    <div className="faq-item" data-open={open}>
      <h3>
        <button
          type="button"
          className="faq-toggle"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={() => setOpen((previous) => !previous)}
        >
          {question}
          <Plus className="icon" aria-hidden="true" />
        </button>
      </h3>
      <div id={answerId} className="faq-answer" aria-hidden={!open} inert={!open}>
        <div className="faq-answer-inner">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="section faq-section" aria-labelledby="faq-title">
      <div className="faq-heading">
        <h2 id="faq-title">A few useful answers.</h2>
        <p>Before you open your first canvas.</p>
      </div>
      <div className="faq-list">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} {...faq} />
        ))}
      </div>
    </section>
  );
}
