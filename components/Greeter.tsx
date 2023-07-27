export interface GreeterProps {
  name: string;
}

export default function Greeter({ name }: GreeterProps) {
  return (
    <div>
      <p>Hello {name}!</p>
    </div>
  );
}
