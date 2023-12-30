import { useState, useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import { toast } from "react-toastify";
import usePurchaseReset from "../../utils/customHook/usePurchaseReset/usePurchaseReset";
import {
  ManagerReset,
  getUserByEmail,
  markTicketUsed,
  resetUserManager,
} from "../../utils/cinema/sliceCinema";
import { User, UserTickets } from "../../types";

const useUserManagement = () => {
  const { User } = useTypedSelector((state) => state.account);
  const { UserFound, isManagerSuccess, isManagerError } = useTypedSelector(
    (state) => state.cinema
  );

  const dispatch = useAppDispatch();

  usePurchaseReset();

  const [showUser, setShowUser] = useState<boolean>(false);
  const [showTickets, setShowTickets] = useState<boolean>(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [ticketsNumber, setTicketsNumber] = useState<number>(0);
  const [emailUser, setEmailUser] = useState<string>("");
  const [userTickets, setUserTickets] = useState<UserTickets[] | []>([]);

  const isEmptyUser = (user: User): boolean => {
    return (
      user.Id === "" &&
      user.UserName === "" &&
      user.Email === "" &&
      user.ProfileImagePath === "" &&
      user.Tickets.length === 0
    );
  };

  useEffect(() => {
    dispatch(resetUserManager());
    setShowUser(false);
  }, [dispatch]);

  useEffect(() => {
    if (isManagerError) {
      dispatch(ManagerReset());
    }

    if (isManagerSuccess && !isEmptyUser(UserFound)) {
      setShowUser(true);
      dispatch(ManagerReset());
    }

    if (isManagerSuccess && showTickets) {
      dispatch(ManagerReset());
      setShowTickets(!showTickets);
      setShowUser(!showUser);
    }
  }, [
    isManagerSuccess,
    isManagerError,
    showTickets,
    showUser,
    UserFound,
    dispatch,
  ]);

  const handlShowTickets = () => {
    if (UserFound.Tickets.length === 0) {
      toast.warning("Este usuário ainda não possui ingressos");
      return;
    }
    setShowTickets(!showTickets);
    setShowUser(!showUser);
  };

  const handleCloseTickets = () => {
    setShowTickets(!showTickets);
    setShowUser(!showUser);
  };

  const handleSumTicketsNumber = (ticket: UserTickets) => {
    setTicketsNumber((prevState) => prevState + 1);
    setUserTickets((prevTickets) => [...prevTickets, ticket]);
  };

  const handleDecrementTicketsNumber = (ticket: UserTickets) => {
    setTicketsNumber((prevState) => prevState - 1);
    setUserTickets((prevTickets) => {
      return prevTickets.filter(
        (currentTicket) => currentTicket.Id !== ticket.Id
      );
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newEmail = event.target.value || "";

    if (!regex.test(newEmail)) {
      setIsValidEmail(false);
      return;
    }

    setIsValidEmail(true);
  };

  const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setEmailUser("");
      setIsValidEmail(true);
      return;
    }
    setEmailUser(event.target.value);
    handleEmailChange(event);
  };

  const handleGetUserByEmail = () => {
    if (!isValidEmail) {
      toast.error("O email usado não é válido");
    }
    dispatch(getUserByEmail(emailUser));
  };

  const handleMarkTicketUsed = () => {
    if (userTickets.length === 0) {
      toast.error("Pelo menos um ingresso precisa estar selecionado");
    }
    dispatch(markTicketUsed(userTickets));
  };

  return {
    User,
    UserFound,
    emailUser,
    isValidEmail,
    showUser,
    showTickets,
    ticketsNumber,
    handleCloseTickets,
    setShowTickets,
    handlShowTickets,
    handleMarkTicketUsed,
    handleSumTicketsNumber,
    handleDecrementTicketsNumber,
    handleOnChangeSearch,
    handleGetUserByEmail,
  };
};

export default useUserManagement;
