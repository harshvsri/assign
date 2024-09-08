export const formatErrorMessage = (stderr: string) => {
  const lines = stderr.split("\n");
  return lines.map((line, index) => (
    <span key={index} className="block">
      {line}
    </span>
  ));
};
