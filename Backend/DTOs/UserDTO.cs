using Backend.Models;

namespace Backend.DTOs;

public record UserDTO(string Id, string UserName, string Email,
    string ProfileImagePath, ICollection<TicketModel> Tickets);