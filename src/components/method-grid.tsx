type MethodStep = {
  name: string;
  body: string;
};

/**
 * The four word method, expanded.
 *
 * The brand's signature sequence is Purpose. Sight. Design.
 * Practice. Each card carries the named step at heading-2 plus a
 * single editorial paragraph. No numbers, no eyebrows; the four
 * word sequence in the section heading already names the order.
 */
const method: ReadonlyArray<MethodStep> = [
  {
    name: "Purpose.",
    body: "Articulating the why. We will not redesign a structure we cannot explain the purpose of.",
  },
  {
    name: "Sight.",
    body: "Patient observation of the operating model as it actually is. We replace assumed reality with observed reality.",
  },
  {
    name: "Design.",
    body: "The future state across structure, spans, layers, centralisation choices, process, and technology.",
  },
  {
    name: "Practice.",
    body: "Embedding, governance, control, and measurement. The discipline that keeps the design alive after we leave.",
  },
];

export function MethodGrid() {
  return (
    <ol className="border-rule grid border-t sm:grid-cols-2 lg:grid-cols-4">
      {method.map((step, index) => (
        <li
          key={step.name}
          className="border-rule bg-paper flex flex-col gap-6 border-b p-8 md:p-12 lg:border-r lg:[&:last-child]:border-r-0"
          aria-posinset={index + 1}
          aria-setsize={method.length}
        >
          <h3 className="text-heading-2 text-ink font-serif font-light hyphens-none">
            {step.name}
          </h3>
          <p className="text-body text-meridian text-pretty">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
