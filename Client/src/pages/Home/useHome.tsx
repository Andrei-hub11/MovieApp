import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import manageJWTCookieState from "../../utils/customHook/useJwt/useJwt";
import useSignalRConnection from "../../utils/customHook/useSignalRConnection/useSignalRConnection";
import {
  ManagerReset,
  getRooms,
  setMovieOfRoom,
} from "../../utils/cinema/sliceCinema";
import { setNewNotification } from "../../utils/account/sliceAccount";
import { BtnList } from "../../types";
// Importe as funções e tipos necessários

const useHome = () => {
  const { Rooms, isManagerSuccess, isManagerError, ManagerMessage } =
    useTypedSelector((state) => state.cinema);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { token } = manageJWTCookieState();
  const { notifications } = useSignalRConnection(token);
  const [categoryList, setCategoryist] = useState<[] | string[]>([]);

  const handleSelectedMovie = (movieTitle: string) => {
    dispatch(setMovieOfRoom(movieTitle));
    navigate("/salas");
  };

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length > 1) {
      dispatch(setNewNotification(notifications));
    }
  }, [notifications, dispatch]);

  useEffect(() => {
    if (isManagerSuccess) {
      dispatch(ManagerReset());
    }

    if (Rooms) {
      setCategoryist(
        Array.from(new Set(Rooms.map((room) => room.MovieCategory)))
      );
    }
  }, [isManagerError, isManagerSuccess, ManagerMessage, Rooms, dispatch]);

  const btnList: BtnList[] = categoryList?.map((category) => {
    return {
      btn: {
        $primary: true,
        onClick: undefined,
      },
      btn_text: category,
    };
  });

  return {
    btnList,

    Rooms,
    handleSelectedMovie,
  };
};

export default useHome;
