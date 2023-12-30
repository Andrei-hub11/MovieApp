import { toast } from "react-toastify";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "dayjs/locale/pt-br";

import { useAppDispatch, useTypedSelector } from "../../app/store";
import { Room, Seat } from "../../types";

import useRedirect from "../../utils/customHook/useRedirect/useRedirect";
import addSeatsInGroups from "../../utils/addSeatsInGroups";
import {
  ManagerReset,
  getRoomsByMovieTitle,
} from "../../utils/cinema/sliceCinema";
import addGapsToSeats from "../../utils/addGapToSpecificSeats";
import {
  addToCart,
  getOrderId,
  removeToCart,
  resetPurchase,
  setCurrentRoom,
  startPurchaseProcess,
} from "../../utils/purchase/purchaseSlice";

interface SeatsState {
  [key: string]: boolean;
}

const useRoom = () => {
  const { isProcessing, cartItems, subtotal } = useTypedSelector(
    (state) => state.purchase
  );
  const { RoomListMovieSelected, seatsGroup, isManagerSuccess, movieOfRoom } =
    useTypedSelector((state) => state.cinema);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { redirectTo } = useRedirect();
  const [chosenDate, setChosenDate] = useState<string>("");
  const [chosenTime, setChosenTime] = useState<string>("");
  const [dateList, setDateList] = useState<Room[] | []>([]);
  const [isSeatSelected, setIsSeatSelected] = useState<SeatsState>({});
  const prevChosenTime = useRef<string | null>(null);
  const prevChosenDate = useRef<string | null>(null);

  useEffect(() => {
    if (!movieOfRoom) {
      navigate("/room");
    }

    dispatch(getRoomsByMovieTitle(movieOfRoom));
  }, [movieOfRoom, dispatch, navigate]);

  //se a sala mudar, refaz as cadeiras mostradas
  const handleChangeSeats = useCallback(
    (rooms: Room[]): Seat[] => {
      const roomList = rooms?.filter((room) => {
        const DefaultDateTime = dayjs(RoomListMovieSelected[0]?.EventDateTime);
        const eventDateTime = dayjs(room.EventDateTime);
        if (chosenDate && chosenTime) {
          const fullDateTime = `${chosenDate}T${chosenTime}:00`;

          return eventDateTime.isSame(fullDateTime, "hour");
        }

        return eventDateTime.isSame(DefaultDateTime, "day");
      });

      dispatch(setCurrentRoom(roomList[0]));

      return roomList[0].Seats;
    },
    [chosenDate, dispatch, RoomListMovieSelected, chosenTime]
  );

  useEffect(() => {
    if (isManagerSuccess || (chosenDate && chosenTime)) {
      addSeatsInGroups(handleChangeSeats(RoomListMovieSelected), dispatch);
      // Formatando as datas na lista
      setDateList(formatDates(RoomListMovieSelected));

      dispatch(ManagerReset());
    }

    // resetando o estado de pagamento, quando a sala muda
    if (
      chosenDate !== prevChosenDate.current ||
      chosenTime !== prevChosenTime.current
    ) {
      dispatch(resetPurchase());
      setIsSeatSelected({});
    }

    prevChosenDate.current = chosenDate;
    prevChosenTime.current = chosenTime;
  }, [
    RoomListMovieSelected,
    isManagerSuccess,
    chosenTime,
    chosenDate,
    handleChangeSeats,
    dispatch,
  ]);

  useEffect(() => {
    if (seatsGroup.length > 1) {
      addGapsToSeats(dispatch);
    }
  }, [seatsGroup, dispatch]);

  function formatDates(rooms: Room[]): Room[] {
    const formattedDatesSet = new Set<string>(); // Conjunto para armazenar datas já formatadas
    const dateList: Room[] = [];

    rooms.forEach((event) => {
      const eventDate = dayjs(event.EventDateTime).format("YYYY-MM-DD");

      // Verifica se a data já foi formatada antes
      if (!formattedDatesSet.has(eventDate)) {
        dateList.push(event);
        formattedDatesSet.add(eventDate); // Adiciona a data formatada ao conjunto
      }
    });

    return dateList;
  }

  const handleSelectedDate = (date: dayjs.Dayjs): boolean => {
    for (const event of RoomListMovieSelected) {
      const eventDate = dayjs(event.EventDateTime).format("YYYY-MM-DD");
      if (
        eventDate === chosenDate &&
        eventDate === dayjs(date).format("YYYY-MM-DD")
      ) {
        return true;
      }
    }

    return false;
  };

  const handleSelectedTime = (time: dayjs.Dayjs): boolean => {
    for (const event of RoomListMovieSelected) {
      const eventDate = dayjs(event.EventDateTime).format("HH:mm");
      if (
        eventDate === chosenTime &&
        eventDate === dayjs(time).format("HH:mm")
      ) {
        return true;
      }
    }

    return false;
  };

  const filteredEvents = useMemo(() => {
    return RoomListMovieSelected?.filter((event) => {
      let targetDateTime;
      const eventDateTime = dayjs(event.EventDateTime);
      const DefaultDateTime = dayjs(RoomListMovieSelected[0]?.EventDateTime);
      if (chosenDate && chosenTime) {
        const fullDateTime = `${chosenDate}T${chosenTime}:00`;
        targetDateTime = dayjs(fullDateTime);
      }

      return eventDateTime.isSame(targetDateTime || DefaultDateTime, "day");
    });
  }, [RoomListMovieSelected, chosenDate, chosenTime]);

  const hoursList: Room[] = filteredEvents?.map((event) => {
    return event;
  });

  if (!chosenDate && dateList.length > 0) {
    setChosenDate(dayjs(filteredEvents[0].EventDateTime).format("YYYY-MM-DD"));
  }

  // Define a primeira hora da lista como a hora escolhida ao inicializar
  if (!chosenTime && hoursList.length > 0) {
    setChosenTime(dayjs(filteredEvents[0].EventDateTime).format("HH:mm"));
  }

  const handleSelectedSeat = (seat: Seat) => {
    if (isProcessing !== true) {
      dispatch(startPurchaseProcess());
      dispatch(getOrderId());
    }

    if (!isSeatSelected[seat.Id] && cartItems.length === 6) {
      toast.warning("Máximo de 6 cadeiras por pedido.");
      return;
    }

    if (!isSeatSelected[seat.Id]) {
      dispatch(addToCart(seat));
      setIsSeatSelected((prevState) => ({
        ...prevState,
        [seat.Id]: true,
      }));
      return;
    }

    dispatch(removeToCart({ seatId: seat.Id }));
    setIsSeatSelected((prevState) => ({
      ...prevState,
      [seat.Id]: false,
    }));
  };

  const handleRedirectToPayment = () => {
    if (cartItems.length === 0) {
      toast.warning("Nenhum assento foi selecionado");
      return;
    }
    redirectTo("/pagamento");
  };

  return {
    isProcessing,
    RoomListMovieSelected,
    seatsGroup,
    isManagerSuccess,
    subtotal,
    dispatch,
    redirectTo,
    chosenDate,
    setChosenDate,
    chosenTime,
    setChosenTime,
    dateList,
    setDateList,
    isSeatSelected,
    setIsSeatSelected,
    handleRedirectToPayment,
    handleChangeSeats,
    formatDates,
    handleSelectedDate,
    handleSelectedTime,
    filteredEvents,
    hoursList,
    handleSelectedSeat,
  };
};

export default useRoom;
