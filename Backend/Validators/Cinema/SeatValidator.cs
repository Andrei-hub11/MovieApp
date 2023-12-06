using Backend.Models;
using FluentValidation;
using System.Net.Sockets;

namespace Backend.Validators.Cinema;

public class SeatValidator: AbstractValidator<SeatModel>
{
  public SeatValidator() {
        RuleFor(seat => seat.IsReserved)
           .NotNull().WithMessage("A propriedade IsUsed é obrigatória.")
           .Equal(false).WithMessage("A propriedade IsUsed deve ser inicialmente definida como false.");
        RuleFor(seat => seat.SeatNumber).NotNull().WithMessage("A propriedade SeatNumber é obrigatória.")
             .NotEmpty().WithMessage("A propriedade SeatNumber é obrigatória.");
        RuleFor(seat => seat.SeatPrice).NotNull().
            WithMessage("A propriedade SeatPrice é obrigatória").GreaterThan(0).
            WithMessage("O assento deve ter um preço maior que zero");
    }
  
}
