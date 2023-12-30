import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GiftCard,
  Room,
  Seat,
  SeatsGroup,
  TicketData,
  User,
  UserTickets,
} from "../../types";
import cinemaService from "./cinemaService";

interface CinemaState {
  UserFound: User;
  Tickets: [] | TicketData;
  Rooms: Room[] | [];
  movieOfRoom: string;
  RoomListMovieSelected: Room[] | [];
  GiftCards: GiftCard[] | [];
  isGiftCardValid: boolean | "";
  seatsGroup: SeatsGroup[] | [];
  isManagerError: boolean;
  isManagerSuccess: boolean;
  isManagerLoading: boolean;
  ManagerMessage: string;
}

const initialState: CinemaState = {
  UserFound: {
    Id: "",
    UserName: "",
    Email: "",
    ProfileImagePath: "",
    Tickets: [],
  },
  Tickets: [],
  Rooms: [],
  movieOfRoom: "",
  RoomListMovieSelected: [],
  seatsGroup: [
    { group: 1, seats: [] },
    { group: 2, seats: [] },
    { group: 3, seats: [] },
    { group: 4, seats: [] },
    { group: 5, seats: [] },
    { group: 6, seats: [] },
  ],
  GiftCards: [],
  isGiftCardValid: "",
  isManagerError: false,
  isManagerSuccess: false,
  isManagerLoading: false,
  ManagerMessage: "",
};

export const getUserByEmail = createAsyncThunk(
  "cinema/get-user-email",
  async (email: string) => {
    try {
      return await cinemaService.getUserByEmail(email);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  }
);

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

export const getCheckGiftCard = createAsyncThunk(
  "cinema/get-checkgift",
  async (giftCode: string) => {
    try {
      return await cinemaService.getCheckGiftCard(giftCode);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  }
);

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

export const markTicketUsed = createAsyncThunk(
  "cinema/mark-ticket-used",
  async (tickets: UserTickets[]) => {
    try {
      return await cinemaService.markTicketUsed(tickets);
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
    resetUserManager: (state) => {
      state.UserFound = {
        Id: "",
        UserName: "",
        Email: "",
        ProfileImagePath: "",
        Tickets: [],
      };
    },
    setMovieOfRoom: (state, action: PayloadAction<string>) => {
      state.movieOfRoom = action.payload;
    },
    // função auxiliar, para ajudar a ordernar as cadeiras conforme planejado para a interface
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

        const updatedGroups = [...state.seatsGroup];
        updatedGroups[groupIndex] = updatedGroup;

        return {
          ...state,
          seatsGroup: updatedGroups,
        };
      }

      // Retorna o estado original se o grupo não for encontrado
      return state;
    },
    // função auxiliar, para ajudar a ordernar as cadeiras conforme planejado para a interface
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
    resetGiftValidState: (state) => {
      state.isGiftCardValid = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByEmail.pending, (state) => {
        state.isManagerLoading = true;
      })
      .addCase(
        getUserByEmail.fulfilled,
        (state, action: PayloadAction<{ User: User }>) => {
          state.isManagerLoading = false;
          state.isManagerSuccess = true;
          state.UserFound = action.payload.User;
        }
      )
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.isManagerLoading = false;
        state.isManagerError = true;
        state.ManagerMessage = action.error?.message || "Unknown error";
      })
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
          state.RoomListMovieSelected = action.payload.Rooms;
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
      .addCase(getCheckGiftCard.pending, (state) => {
        state.isManagerLoading = true;
      })
      .addCase(
        getCheckGiftCard.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.isManagerLoading = false;
          state.isManagerSuccess = true;
          state.isGiftCardValid = action.payload;
        }
      )
      .addCase(getCheckGiftCard.rejected, (state, action) => {
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
      })
      .addCase(markTicketUsed.pending, (state) => {
        state.isManagerLoading = true;
      })
      .addCase(markTicketUsed.fulfilled, (state) => {
        state.isManagerLoading = false;
        state.isManagerSuccess = true;
      })
      .addCase(markTicketUsed.rejected, (state, action) => {
        state.isManagerLoading = false;
        state.isManagerError = true;
        state.ManagerMessage = action.error?.message || "Unknown error";
      });
  },
});

export const {
  ManagerReset,
  resetUserManager,
  setMovieOfRoom,
  addGroupSeats,
  addGapToSpecificItems,
  resetSeatsGroup,
  resetGiftValidState,
} = cinemaSlice.actions;
export default cinemaSlice.reducer;
