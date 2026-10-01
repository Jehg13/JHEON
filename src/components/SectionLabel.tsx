type SectionLabelProps = {
  number: string;
  children: string;
};

export default function SectionLabel({ number, children }: SectionLabelProps) {
  return (
    <span className="section-label eyebrow">
      <span>{number}</span>
      <span className="section-label-rule" />
      {children}
    </span>
  );
}
