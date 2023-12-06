using Microsoft.AspNetCore.Identity;


namespace Backend.Models;

public class ApplicationUser : IdentityUser
{
    public ICollection<TicketModel> Tickets { get; set; }
    public string ProfileImagePath { get; set; }
    public byte[] ProfileImage { get; set; }


    public ApplicationUser()
    {
        // Inicializa a propriedade Seats com uma lista vazia caso n�o seja fornecida na requisi��o
        Tickets = new List<TicketModel>();
    }
}