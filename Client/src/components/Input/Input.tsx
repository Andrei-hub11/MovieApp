import { InputsProps } from "../../types";
import { CustomInput } from "./InputStyles";

interface InputProps {
  input: InputsProps;
}

function Input({ input }: InputProps) {
  const { placeholder, onChange } = input;
  return <CustomInput placeholder={placeholder} onChange={onChange} />;
}

export default Input;
