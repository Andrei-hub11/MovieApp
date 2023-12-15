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
  PaymentBtn,
  PaymentContainer,
  PaymentSettingsContainer,
  PaymentText,
  RadioContainer,
  RadioInput,
  Seats,
  SeatsCarousel,
  SeatsInformationContainer,
} from "./PaymentPageStyles";

import { IconProps } from "../../types";
import Icon from "../../components/Icon/Icon";

import returnIcon from "../../assets/solar_arrow-left-linear.svg";
import bigReturnIcon from "../../assets/solar_arrow-left-linear-big.svg";
import useRedirect from "../../utils/customHook/useRedirect/useRedirect";
import { useTypedSelector } from "../../app/store";
import { toast } from "react-toastify";

function PaymentPage() {
  const { cartItems, isProcessing, orderId, subtotal, total } =
    useTypedSelector((state) => state.purchase);

  const [checked, setChecked] = useState<string>("code");
  const { redirectTo } = useRedirect();

  const iconProps: IconProps = {
    src: returnIcon,
    srcset: `${returnIcon} 400w, ${bigReturnIcon} 600w`,
    alt: "ícone para retornar",
  };

  const handleChecked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === "card") {
      toast.error(
        "O pagamento com o cartão de credito está indisponivel no momento"
      );
      return;
    }

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
        {isProcessing ? (
          <InnerInformationContainer>
            <InformationText $primary>Pedido incompleto</InformationText>
            <InformationText $hasColor="1">Em progresso</InformationText>
          </InnerInformationContainer>
        ) : null}

        <Divider />
        <InnerInformationContainer>
          <InformationText>ID do pedido</InformationText>
          <InformationText $isUnique>{orderId}</InformationText>
        </InnerInformationContainer>
        <InnerInformationContainer $hasMargin="3.4rem">
          <SeatsInformationContainer>
            <InformationText>Assentos Selecionados:</InformationText>
            <SeatsCarousel>
              {cartItems.map((seat) =>
                seat.SeatNumber.map((seatNumber) => (
                  <Seats key={seat.Id}>{seatNumber}</Seats>
                ))
              )}
            </SeatsCarousel>
          </SeatsInformationContainer>
        </InnerInformationContainer>
        <Divider />
        <InnerInformationContainer>
          <InformationText>Subtotal</InformationText>
          <InformationText>{`R$ ${subtotal}`}</InformationText>
        </InnerInformationContainer>
        <InnerInformationContainer $hasMargin="3.4rem">
          <InformationText>Desconto aplicado</InformationText>
          <InformationText>R$ 10</InformationText>
        </InnerInformationContainer>
        <Divider />
        <InnerInformationContainer>
          <InformationText>TOTAL</InformationText>
          <InformationText>{`R$ ${total}`}</InformationText>
        </InnerInformationContainer>
        <PaymentSettingsContainer $hasMargin="4rem">
          <PaymentText>Pagamento</PaymentText>
          <RadioContainer>
            <InnerRadioContainer>
              <RadioInput
                type="radio"
                value="code"
                name="card"
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
                name="card"
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
          <PaymentBtn $primary $isUnique>
            Confirmar
          </PaymentBtn>
        </BtnContainer>
      </InformationContainer>
    </PaymentContainer>
  );
}

export default PaymentPage;
