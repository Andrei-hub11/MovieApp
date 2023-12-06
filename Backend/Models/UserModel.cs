using Microsoft.AspNetCore.Identity;


namespace Backend.Models;

public class ApplicationUser : IdentityUser
{
    public ICollection<TicketModel> Tickets { get; set; }
    public string ProfileImagePath { get; set; }
    public byte[] ProfileImage { get; set; }


    public ApplicationUser()
    {
        // Inicializa a propriedade Seats com uma lista vazia caso não seja fornecida na requisição
        Tickets = new List<TicketModel>();
    }
}