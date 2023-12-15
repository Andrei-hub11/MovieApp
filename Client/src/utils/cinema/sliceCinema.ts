import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GiftCard, Room, Seat, SeatsGroup, User } from "../../types";
import cinemaService from "./cinemaService";

interface CinemaState {
  Users: User[];
  Tickets: [];
  Rooms: Room[] | [];
  MovieSelected: Room[] | [];
  GiftCards: GiftCard[] | null;
  seatsGroup: SeatsGroup[] | [];
  isManagerError: boolean;
  isManagerSuccess: boolean;
  isManagerLoading: boolean;
  ManagerMessage: string;
}

const initialState: CinemaState = {
  Users: [
    {
      Id: "",
      UserName: "",
      Email: "",
      ProfileImagePath: "",
      Tickets: [],
    },
  ],
  Tickets: [],
  Rooms: [],
  MovieSelected: [],
  seatsGroup: [
    { group: 1, seats: [] },
    { group: 2, seats: [] },
    { group: 3, seats: [] },
    { group: 4, seats: [] },
    { group: 5, seats: [] },
    { group: 6, seats: [] },
  ],
  GiftCards: null,
  isManagerError: false,
  isManagerSuccess: false,
  isManagerLoading: false,
  ManagerMessage: "",
};

export const getRooms = createAsyncThunk("cinema/get-rooms", async () => {
  try {
    return await cinemaService.getRooms();
  } catch (error) {
    const message = (error as Error).message;
    throw new Error(message);
  }
});

export const getRoomsByMovieTitle = createAsyncThunk(
  "cinema/get-rooms-by-movietitle",
  async (movietitle: string) => {
    try {
      return await cinemaService.getRoomsByMovieTitle(movietitle);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  }
);

export const getGiftCards = createAsyncThunk("cinema/get-gift", async () => {
  try {
    return await cinemaService.getGiftCards();
  } catch (error) {
    const message = (error as Error).message;
    throw new Error(message);
  }
});

export const createGiftCard = createAsyncThunk(
  "cinema/create-gift",
  async () => {
    try {
      return await cinemaService.createGiftCard();
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  }
);

const cinemaSlice = createSlice({
  name: "cinema",
  initialState: initialState,
  reducers: {
    ManagerReset: (state) => {
      state.isManagerLoading = false;
      state.isManagerSuccess = false;
      state.isManagerError = false;
      state.ManagerMessage = "";
    },
    resetSeatsGroup: (state) => {
      state.seatsGroup = [
        { group: 1, seats: [] },
        { group: 2, seats: [] },
        { group: 3, seats: [] },
        { group: 4, seats: [] },
        { group: 5, seats: [] },
        { group: 6, seats: [] },
      ];
    },
    addGroupSeats: (
      state,
      action: PayloadAction<{
        groupNumber: number;
        startIndex: number;
        endIndex: number;
        newSeats: Seat[];
      }>
    ) => {
      const { groupNumber, startIndex, endIndex, newSeats } = action.payload;

      const groupIndex = state.seatsGroup.findIndex(
        (room) => room.group === groupNumber
      );

      if (groupIndex !== -1) {
        const updatedGroup = {
          ...state.seatsGroup[groupIndex],
          seats: [
            ...state.seatsGroup[groupIndex].seats,
            ...newSeats.slice(startIndex, endIndex + 1),
          ],
        };

        // Cria um novo array de grupos com o grupo atualizado
        const updatedGroups = [...state.seatsGroup];
        updatedGroups[groupIndex] = updatedGroup;

        // Retorna o novo estado com os grupos atualizados
        return {
          ...state,
          seatsGroup: updatedGroups,
        };
      }

      // Retorna o estado original se o grupo não for encontrado
      return state;
    },
    addGapToSpecificItems: (
      state,
      action: PayloadAction<{
        groupNumber: number;
        seatIndex: number;
        gap: string;
      }>
    ) => {
      const { groupNumber, seatIndex, gap } = action.payload;

      const groupIndex = state.seatsGroup.findIndex(
        (group) => group.group === groupNumber
      );

      if (groupIndex !== -1) {
        const group = state.seatsGroup[groupIndex];

        if (group.seats[seatIndex] && !group.seats[seatIndex].gap) {
          const updatedSeats = [...group.seats];
          updatedSeats[seatIndex] = { ...updatedSeats[seatIndex], gap };

          const updatedGroup = {
            ...group,
            seats: updatedSeats,
          };

          const updatedGroups = [...state.seatsGroup];
          updatedGroups[groupIndex] = updatedGroup; // Atualiza o grupo modificado

          return {
            ...state,
            seatsGroup: updatedGroups,
          };
        }
      }

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        state.isManagerLoading = true;
      })
      .addCase(
        getRooms.fulfilled,
        (state, action: PayloadAction<CinemaState>) => {
          state.isManagerLoading = false;
          state.isManagerSuccess = true;
          state.Rooms = action.payload.Rooms;
        }
      )
      .addCase(getRooms.rejected, (state, action) => {
        state.isManagerLoading = false;
        state.isManagerError = true;
        state.ManagerMessage = action.error?.message || "Unknown error";
      })
      .addCase(getRoomsByMovieTitle.pending, (state) => {
        state.isManagerLoading = true;
      })
      .addCase(
        getRoomsByMovieTitle.fulfilled,
        (state, action: PayloadAction<CinemaState>) => {
          state.isManagerLoading = false;
          state.isManagerSuccess = true;
          state.MovieSelected = action.payload.Rooms;
        }
      )
      .addCase(getRoomsByMovieTitle.rejected, (state, action) => {
        state.isManagerLoading = false;
        state.isManagerError = true;
        state.ManagerMessage = action.error?.message || "Unknown error";
      })
      .addCase(getGiftCards.pending, (state) => {
        state.isManagerLoading = true;
      })
      .addCase(
        getGiftCards.fulfilled,
        (state, action: PayloadAction<CinemaState>) => {
          state.isManagerLoading = false;
          state.isManagerSuccess = true;
          state.GiftCards =
            action.payload.GiftCards?.filter((gift) => gift.IsUsed !== true) ??
            action.payload.GiftCards;
        }
      )
      .addCase(getGiftCards.rejected, (state, action) => {
        state.isManagerLoading = false;
        state.isManagerError = true;
        state.ManagerMessage = action.error?.message || "Unknown error";
      })
      .addCase(createGiftCard.pending, (state) => {
        state.isManagerLoading = true;
      })
      .addCase(createGiftCard.fulfilled, (state, action) => {
        state.isManagerLoading = false;
        state.isManagerSuccess = true;
        state.ManagerMessage = action.payload.Message || "Unknown error";
        state.GiftCards = Array.isArray(state?.GiftCards)
          ? [...state.GiftCards, action.payload.GiftCard]
          : [action.payload.GiftCard];
      })
      .addCase(createGiftCard.rejected, (state, action) => {
        state.isManagerLoading = false;
        state.isManagerError = true;
        state.ManagerMessage = action.error?.message || "Unknown error";
      });
  },
});

export const {
  ManagerReset,
  addGroupSeats,
  addGapToSpecificItems,
  resetSeatsGroup,
} = cinemaSlice.actions;
export default cinemaSlice.reducer;
