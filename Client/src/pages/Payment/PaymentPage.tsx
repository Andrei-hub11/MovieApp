import {
  BtnContainer,
  Divider,
  FormControl,
  FormInput,
  FormMsg,
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
import usePayment from "./usePayment";

function PaymentPage() {
  const {
    checked,
    giftCodeIsValid,
    handleChecked,
    handleSubmitPayment,
    handleChangeGiftCode,
    redirectTo,
    cartItems,
    isProcessing,
    subtotal,
    discount,
    total,
    orderId,
  } = usePayment();

  const iconProps: IconProps = {
    src: returnIcon,
    srcset: `${returnIcon} 400w, ${bigReturnIcon} 600w`,
    alt: "ícone para retornar",
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
          <InformationText>{`R$ ${discount}`}</InformationText>
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
            $isValid={giftCodeIsValid}
            onChange={handleChangeGiftCode}
          />
          <LabelForm htmlFor="name">Codigo</LabelForm>
          <FormMsg $isValid={giftCodeIsValid}>
            O gift não tem um código válido, ou já foi usado.
          </FormMsg>
        </FormControl>
        <BtnContainer $hasMargin="3rem">
          <PaymentBtn $primary $isUnique onClick={handleSubmitPayment}>
            Confirmar
          </PaymentBtn>
        </BtnContainer>
      </InformationContainer>
    </PaymentContainer>
  );
}

export default PaymentPage;
