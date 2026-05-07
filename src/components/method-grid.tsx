type MethodStep = {
  number: string;
  name: string;
  body: string;
};

const method: ReadonlyArray<MethodStep> = [
  {
    number: "01",
    name: "Purpose.",
    body: "Articulating the why. We will not redesign a structure we cannot explain the purpose of.",
  },
  {
    number: "02",
    name: "Sight.",
    body: "Patient observation of the operating model as it actually is. We replace assumed reality with observed reality.",
  },
  {
    number: "03",
    name: "Design.",
    body: "The future state across structure, spans, layers, centralisation choices, process, and technology.",
  },
  {
    number: "04",
    name: "Practice.",
    body: "Embedding, governance, control, and measurement. The discipline that keeps the design alive after we leave.",
  },
];

export function MethodGrid() {
  return (
    <ol className="border-rule grid gap-px border-t sm:grid-cols-2 lg:grid-cols-4">
      {method.map((step) => (
        <li
          key={step.name}
          className="border-rule bg-paper flex flex-col gap-6 border-b p-8 sm:p-10 lg:border-r lg:p-12 lg:last:border-r-0"
        >
          <span className="text-small text-sightline font-mono">{step.number}</span>
          <h3 className="text-heading-2 text-ink font-serif font-light">{step.name}</h3>
          <p className="text-body text-meridian text-pretty">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
