import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import { useAppDispatch, useTypedSelector } from "../../app/store";
import useRedirect from "../../utils/customHook/useRedirect/useRedirect";
import { Room, TicketData } from "../../types";
import { ManagerReset, getCheckGiftCard } from "../../utils/cinema/sliceCinema";
import {
  resetPurchase,
  setIsUsedGift,
} from "../../utils/purchase/purchaseSlice";
import { createTicket } from "../../utils/account/sliceAccount";

const usePayment = () => {
  const {
    isUsedGift,
    cartItems,
    currentRoom,
    orderId,
    total,
    discount,
    isProcessing,
    subtotal,
  } = useTypedSelector((state) => state.purchase);
  const { isGiftCardValid, ManagerMessage, isManagerError } = useTypedSelector(
    (state) => state.cinema
  );
  const dispatch = useAppDispatch();
  const { User } = useTypedSelector((state) => state.account);
  const [checked, setChecked] = useState<string>("code");
  const [giftCode, setGiftCode] = useState<string>("");
  const [giftCodeIsValid, setGiftCodeIsValid] = useState<string | boolean>("");
  const navigate = useNavigate();
  const { redirectTo } = useRedirect();

  useEffect(() => {
    setGiftCodeIsValid(isGiftCardValid);
    dispatch(
      setIsUsedGift(
        typeof isGiftCardValid === "boolean" ? isGiftCardValid : false
      )
    );
  }, [isGiftCardValid, dispatch]);

  useEffect(() => {
    if (isManagerError) {
      toast.error(ManagerMessage);
      dispatch(ManagerReset());
      dispatch(resetPurchase());
    }
  }, [isManagerError, ManagerMessage, dispatch, isUsedGift]);

  const handleChecked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === "card") {
      toast.error(
        "O pagamento com o cartão de crédito está indisponível no momento"
      );
      return;
    }

    setChecked(e.target.value);
  };

  const handleChangeGiftCode: React.ChangeEventHandler<
    HTMLInputElement
  > = async (e) => {
    if (e.target.value.length < 36) {
      return;
    }

    try {
      const result = await dispatch(getCheckGiftCard(e.target.value));
      if (result.payload) {
        setGiftCode(e.target.value);
      }
    } catch (error) {
      toast.error("Algo deu errado");
    }
  };

  const isRoomValid = (room: Room) => {
    return (
      room.Id !== undefined &&
      room.MovieTitle !== undefined &&
      room.MovieSubtitle !== undefined &&
      room.MovieCategory !== undefined &&
      room.RoomNumber !== undefined &&
      room.MovieImagePath !== undefined &&
      room.MovieBackdropPath !== undefined &&
      room.EventDateTime !== undefined &&
      room.Seats !== undefined
    );
  };

  const handleSubmitPayment = async () => {
    if (!currentRoom || !isRoomValid(currentRoom)) {
      return;
    }

    const newOrder: TicketData = {
      MovieTitle: currentRoom.MovieTitle,
      MovieSubtitle: currentRoom?.MovieSubtitle,
      RoomNumber: currentRoom.RoomNumber,
      EventDateTime: {
        Date: currentRoom.EventDateTime,
        Time: dayjs(currentRoom.EventDateTime).format("HH:mm:ss"),
      },
      OrderId: orderId,
      AmountPaid: isUsedGift ? 0 : total,
      PurchasedSeats: cartItems.flatMap(({ SeatNumber }) => SeatNumber),
      UserId: User.Id,
    };

    if (!isUsedGift) {
      toast.error(
        "Nenhum codigo foi usado, ou o que foi usado não é válido. Por isso o pagamento não pode ser concluído"
      );
      return;
    }

    try {
      dispatch(
        createTicket({
          roomId: currentRoom.Id,
          ticket: newOrder,
          giftCode: giftCode,
        })
      );
      navigate("/home");
    } catch (error) {
      toast.error("Algo deu errado");
    }
  };

  return {
    checked,
    giftCodeIsValid,
    handleChecked,
    handleChangeGiftCode,
    handleSubmitPayment,
    redirectTo,
    cartItems,
    isProcessing,
    subtotal,
    discount,
    total,
    orderId,
  };
};

export default usePayment;
