using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("GiftCard")]
public class GiftCardModel
{
    public Guid Id { get; set; }
    public Guid GiftCodigo { get; set; }
    public bool IsUsed { get; set; }
}
