import { useState } from "react";

import {
  BtnContainer,
  Divider,
  FormControl,
  FormInput,
  IconContainer,
  InformationContainer,
  InformationText,
  InnerInformationContainer,
  InnerRadioContainer,
  LabelForm,
  PaymentContainer,
  PaymentSettingsContainer,
  PaymentText,
  RadioContainer,
  RadioInput,
  Seats,
  SeatsCarousel,
  SeatsInformationContainer,
} from "./PaymentPageStyles";

import { ButtonProps, IconProps } from "../../types";
import Icon from "../../components/Icon/Icon";

import returnIcon from "../../assets/solar_arrow-left-linear.svg";
import bigReturnIcon from "../../assets/solar_arrow-left-linear-big.svg";
import useRedirect from "../../utils/customHook/useRedirect/useRedirect";
import Button from "../../components/Button/Button";

function PaymentPage() {
  const [checked, setChecked] = useState<string>("code");
  const { redirectTo } = useRedirect();

  const iconProps: IconProps = {
    src: returnIcon,
    srcset: `${returnIcon} 400w, ${bigReturnIcon} 600w`,
    alt: "ícone para retornar",
  };

  const btnProps: ButtonProps = {
    $primary: true,
    $isUnique: true,
  };

  const handleChecked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.target.value);
  };

  return (
    <PaymentContainer>
      <IconContainer
        onClick={() => {
          redirectTo("/salas");
        }}
      >
        <Icon icon={iconProps} />
      </IconContainer>

      <InformationContainer>
        <InnerInformationContainer>
          <InformationText $primary>Pedido incompleto</InformationText>
          <InformationText $hasColor="1">Em progresso</InformationText>
        </InnerInformationContainer>
        <Divider />
        <InnerInformationContainer>
          <InformationText>ID do pedido</InformationText>
          <InformationText>#257481-124</InformationText>
        </InnerInformationContainer>
        <InnerInformationContainer $hasMargin="3.4rem">
          <SeatsInformationContainer>
            <InformationText>Assentos Selecionados:</InformationText>
            <SeatsCarousel>
              <Seats>A-1</Seats>
              <Seats>A-1</Seats>
              <Seats>A-1</Seats>
            </SeatsCarousel>
          </SeatsInformationContainer>
        </InnerInformationContainer>
        <Divider />
        <InnerInformationContainer>
          <InformationText>Subtotal</InformationText>
          <InformationText>R$ 90</InformationText>
        </InnerInformationContainer>
        <InnerInformationContainer $hasMargin="3.4rem">
          <InformationText>Desconto aplicado</InformationText>
          <InformationText>R$ 10</InformationText>
        </InnerInformationContainer>
        <Divider />
        <InnerInformationContainer>
          <InformationText>TOTAL</InformationText>
          <InformationText>R$ 80</InformationText>
        </InnerInformationContainer>
        <PaymentSettingsContainer $hasMargin="4rem">
          <PaymentText>Pagamento</PaymentText>
          <RadioContainer>
            <InnerRadioContainer>
              <RadioInput
                type="radio"
                value="code"
                checked={checked == "code"}
                $isSelected={checked == "code"}
                onChange={handleChecked}
              />
              <PaymentText>Vale presente</PaymentText>
            </InnerRadioContainer>
            <InnerRadioContainer>
              <RadioInput
                type="radio"
                value="card"
                checked={checked == "card"}
                $isSelected={checked == "card"}
                onChange={handleChecked}
              />
              <PaymentText>Cartão de crédito/débito</PaymentText>
            </InnerRadioContainer>
          </RadioContainer>
        </PaymentSettingsContainer>
        <FormControl $hasMargin="3.4rem">
          <FormInput
            placeholder=""
            autoComplete="off"
            aria-autocomplete="none"
          />
          <LabelForm htmlFor="name">Codigo</LabelForm>
        </FormControl>
        <BtnContainer $hasMargin="3rem">
          <Button btn={btnProps}>Confirmar</Button>
        </BtnContainer>
      </InformationContainer>
    </PaymentContainer>
  );
}

export default PaymentPage;
