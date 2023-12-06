using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("Room")]
public class RoomModel
{
    public Guid Id { get; set; }
    public string RoomNumber {  get; set; }
    public DateTime? EventDateTime { get; set; }
    public ICollection<SeatModel> Seats { get; set; }

    public RoomModel()
    {
        // Inicializa a propriedade Seats com uma lista vazia caso não seja fornecida na requisição
        Seats = new List<SeatModel>();
    }
}
