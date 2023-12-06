using Backend.Models;
using FluentValidation;

namespace Backend.Validators.Cinema;

public class GiftCardValidator: AbstractValidator<GiftCardModel>
{
    public GiftCardValidator()
    {
       
        RuleFor(gift => gift.IsUsed)
             .NotNull().WithMessage("A propriedade IsUsed é obrigatória.")
             .Equal(false).WithMessage("A propriedade IsUsed deve ser inicialmente definida como false.");
        RuleFor(gift => gift.GiftCodigo).NotEmpty().WithMessage("A representação do GUID não pode ser vazia.");
    }

  
   
}
