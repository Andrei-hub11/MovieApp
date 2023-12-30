import { useEffect, useState } from "react";
import { BtnList } from "../../types";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import {
  setCategorySelected,
  setSearchMovie,
} from "../../utils/account/sliceAccount";

const useNavBar = () => {
  const { Rooms } = useTypedSelector((state) => state.cinema);
  const { User, categorySelected } = useTypedSelector((state) => state.account);

  const dispatch = useAppDispatch();

  const [categoryList, setCategoryList] = useState<[] | string[]>([]);

  useEffect(() => {
    if (Rooms) {
      // Para permitir apenas categorias de filmes em exibição
      setCategoryList(
        Array.from(new Set(Rooms.map((room) => room.MovieCategory)))
      );
    }
  }, [Rooms]);

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

  return { User, btnList, handleSearchMovie };
};

export default useNavBar;
