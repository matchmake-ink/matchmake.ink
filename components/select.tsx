interface SelectProps {
  label: string;
  defalutValue: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function Select({
  label,
  defalutValue,
  onChange,
  options,
}: SelectProps) {
  return (
    <div className="flex flex-col bg-secondary-600 p-2 m-2 border-text border rounded-lg">
      <label className="text-text text-lg font-bold mb-2" htmlFor={label}>
        {label}
      </label>
      <select
        className="border border-text rounded-md p-1 focus:outline-none focus:bg-secondary-800 bg-secondary-700"
        id={label}
        defaultValue={defalutValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
