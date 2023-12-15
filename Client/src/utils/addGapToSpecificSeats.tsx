import { AppDispatch } from "../app/store";
import { addGapToSpecificItems } from "./cinema/sliceCinema";

const addGapsToSeats = (dispatch: AppDispatch) => {
  const gaps = [
    { groupNumber: 1, seatIndex: 1, gap: "1.6rem" },
    { groupNumber: 1, seatIndex: 5, gap: "1.6rem" },
    { groupNumber: 1, seatIndex: 9, gap: "1.6rem" },
    { groupNumber: 4, seatIndex: 5, gap: "4.8rem" },
    { groupNumber: 5, seatIndex: 5, gap: "4.8rem" },
    { groupNumber: 6, seatIndex: 5, gap: "4.8rem" },
    // Adicione outros objetos de gap conforme necessário
  ];
  gaps.forEach(({ groupNumber, seatIndex, gap }) => {
    dispatch(addGapToSpecificItems({ groupNumber, seatIndex, gap }));
  });
};

export default addGapsToSeats;
