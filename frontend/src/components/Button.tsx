import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  block?: boolean;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  const variant = props.variant || "primary";

  const buttonClass = classNames(
    "px-6 py-2",
    "text-sm",
    "text-center",
    "font-bold",
    "rounded",
    {
      "bg-blue-500 hover:bg-blue-700 text-white": variant === "primary",
      "bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400":
        variant === "secondary",
    },
    {
      "w-full": props.block,
      "w-fit": !props.block,
    }
  );

  return (
    <button onClick={props.onClick} type="button" className={buttonClass}>
      {props.children}
    </button>
  );
}
