export interface ButtonProps {
  label: string;
  color: "primary" | "secondary" | "accent";
  onClick: () => void;
}
export default function Button({ label, color, onClick }: ButtonProps) {
  console.log(color);
  return (
    <button
      className={`bg-${color}-500 hover:bg-${color}-400 text-text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
