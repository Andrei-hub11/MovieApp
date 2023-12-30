import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import manageJWTCookieState from "../../utils/customHook/useJwt/useJwt";
import useSignalRConnection from "../../utils/customHook/useSignalRConnection/useSignalRConnection";
import {
  ManagerReset,
  getRooms,
  setMovieOfRoom,
} from "../../utils/cinema/sliceCinema";
import {
  reset,
  setCategorySelected,
  setNewNotification,
  setSearchMovie,
} from "../../utils/account/sliceAccount";
import { BtnList } from "../../types";
import { toast } from "react-toastify";
import usePurchaseReset from "../../utils/customHook/usePurchaseReset/usePurchaseReset";
// Importe as funções e tipos necessários

const useHome = () => {
  const { Rooms, isManagerSuccess, isManagerError, ManagerMessage } =
    useTypedSelector((state) => state.cinema);
  const { categorySelected, searchMovie, isSuccess } = useTypedSelector(
    (state) => state.account
  );

  usePurchaseReset();

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
    if (notifications.length > 0 && isSuccess) {
      dispatch(setNewNotification(notifications));
      toast.success("Ingresso garantido. 😀");
      dispatch(reset());
    }
  }, [notifications, isSuccess, dispatch]);

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

  const handleSearchMovie = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchMovie(event.target.value));
  };

  const handleSelectedCategory = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (event.currentTarget.textContent) {
      dispatch(setCategorySelected(event.currentTarget.textContent));
    }
  };

  const btnList: BtnList[] = categoryList?.map((category) => {
    return {
      btn: {
        $primary: !categorySelected
          ? true
          : categorySelected === category
          ? true
          : false,
        onClick: handleSelectedCategory,
      },
      btn_text: category,
    };
  });

  const roomsFiltered = useMemo(() => {
    if (categorySelected.trim() === "" && searchMovie.trim() === "") {
      return [];
    }
    return Rooms?.filter((room) => {
      return categorySelected
        ? room.MovieCategory.toLowerCase().includes(
            categorySelected.toLowerCase()
          )
        : room.MovieTitle.toLowerCase().includes(searchMovie.toLowerCase()) ||
            room.MovieSubtitle.toLowerCase().includes(
              searchMovie.toLowerCase()
            );
    });
  }, [Rooms, categorySelected, searchMovie]);

  return {
    btnList,
    roomsFiltered,
    Rooms,
    categorySelected,
    searchMovie,
    handleSearchMovie,
    handleSelectedMovie,
  };
};

export default useHome;
