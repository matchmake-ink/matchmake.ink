"use client";
export interface ButtonProps {
  label?: string; // this exists because I made a poor design decision. Don't use it and pass children to the button instead
  onClick: () => void;
  color?: "primary" | "secondary" | "accent";
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const baseClasses =
  "text-text font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition-all rounded-lg outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-secondary-200";

export default function Button({
  onClick,
  label = "",
  className = "",
  color = "primary",
  disabled = false,
  children = null,
}: ButtonProps) {
  return (
    <>
      {color === "primary" && (
        <PrimaryButton
          onClick={onClick}
          disabled={disabled}
          className={className}
        >
          {label}
          {children}
        </PrimaryButton>
      )}
      {color === "secondary" && (
        <SecondaryButton
          onClick={onClick}
          disabled={disabled}
          className={className}
        >
          {label}
          {children}
        </SecondaryButton>
      )}
      {color === "accent" && (
        <AccentButton
          onClick={onClick}
          disabled={disabled}
          className={className}
        >
          {label}
          {children}
        </AccentButton>
      )}
    </>
  );
}

interface PrivateButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

function PrimaryButton(props: PrivateButtonProps) {
  return (
    <button
      className={`bg-primary-500 hover:bg-primary-400 ${baseClasses} ${props.className}`}
      onClick={props.onClick}
      type="button"
      disabled={props.disabled}
      role="button"
    >
      {props.children}
    </button>
  );
}

function SecondaryButton(props: PrivateButtonProps) {
  return (
    <button
      className={`bg-secondary-500 hover:bg-secondary-400 ${baseClasses} ${props.className}`}
      onClick={props.onClick}
      type="button"
      disabled={props.disabled}
      role="button"
    >
      {props.children}
    </button>
  );
}

function AccentButton(props: PrivateButtonProps) {
  return (
    <button
      className={`bg-accent-500 hover:bg-accent-400 ${baseClasses} ${props.className}`}
      onClick={props.onClick}
      type="button"
      disabled={props.disabled}
      role="button"
    >
      {props.children}
    </button>
  );
}
