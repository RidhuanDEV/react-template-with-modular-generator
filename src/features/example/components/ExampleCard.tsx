const ExampleCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <div className="example-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export { ExampleCard };
