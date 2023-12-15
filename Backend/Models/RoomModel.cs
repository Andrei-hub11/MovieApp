using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("Room")]
public class RoomModel
{
    public Guid Id { get; set; }
    public string MovieTitle { get; set; }
    public string? MovieSubtitle { get; set; }
    public string RoomNumber { get; set; }
    public string MovieCategory { get; set; }
    public string? MovieImagePath { get; set; }
    public string? MovieBackdropPath { get; set; }
    public DateTime? EventDateTime { get; set; }
    public ICollection<SeatModel> Seats { get; set; }

    public RoomModel()
    {
        // Inicializa a propriedade Seats com uma lista vazia caso não seja fornecida na requisição
        Seats = new List<SeatModel>();
    }
}
