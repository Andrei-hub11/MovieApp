import { ButtonProps } from "../../types";
import { Btn } from "./ButtonStyles";

interface BtnProps {
  btn: ButtonProps;
  children: React.ReactNode;
}

function Button({ btn, children }: BtnProps) {
  const { $primary, onClick } = btn;

  return (
    <Btn $primary={$primary} onClick={onClick}>
      {children}
    </Btn>
  );
}

export default Button;
