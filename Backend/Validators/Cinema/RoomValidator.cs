namespace Backend.Validators.Cinema;

using Backend.Models;
using FluentValidation;

public class RoomValidator : AbstractValidator<RoomModel>
{
    public RoomValidator()
    {
        RuleFor(room => room.RoomNumber).NotNull().WithMessage("A propriedade RoomNumber é obrigatória")
            .NotEmpty().WithMessage("O RoomNumber não pode estar vazio.")
            .MaximumLength(10).WithMessage("O número da sala deve ter no máximo 50 caracteres.");
        RuleFor(room => room.EventDateTime)
           .NotNull().WithMessage("A data do evento é obrigatória.")
           .Must(BeInFuture).WithMessage("A data do evento deve ser posterior à data atual.");

    }

    private bool BeInFuture(DateTime? eventDateTime)
    {
        if (eventDateTime.HasValue)
        {
            return eventDateTime.Value > DateTime.Now;
        }

        // Se o evento for nulo, a validação falha
        return false;
    }
}

