import { ButtonProps } from "../../types";
import { Btn } from "./ButtonStyles";

interface BtnProps {
  btn: ButtonProps;
  children: React.ReactNode;
}

function Button({ btn, children }: BtnProps) {
  const { $primary, $isUnique, onClick } = btn;

  return (
    <Btn
      role="button"
      $primary={$primary}
      $isUnique={$isUnique}
      onClick={onClick}
    >
      {children}
    </Btn>
  );
}

export default Button;
