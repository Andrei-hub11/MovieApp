import { AppDispatch } from "../app/store";
import { Seat } from "../types";
import { addGroupSeats, resetSeatsGroup } from "./cinema/sliceCinema";

const addSeatsInGroups = (movieSeats: Seat[], dispatch: AppDispatch) => {
  dispatch(resetSeatsGroup());

  const seatGroups = [
    { groupNumber: 1, startIndex: 0, endIndex: 11 },
    { groupNumber: 2, startIndex: 12, endIndex: 25 },
    { groupNumber: 3, startIndex: 26, endIndex: 39 },
    { groupNumber: 4, startIndex: 40, endIndex: 51 },
    { groupNumber: 5, startIndex: 52, endIndex: 63 },
    { groupNumber: 6, startIndex: 64, endIndex: 75 },
  ];

  seatGroups.forEach((group) => {
    dispatch(
      addGroupSeats({
        groupNumber: group.groupNumber,
        startIndex: group.startIndex,
        endIndex: group.endIndex,
        newSeats: movieSeats,
      })
    );
  });
};

export default addSeatsInGroups;
