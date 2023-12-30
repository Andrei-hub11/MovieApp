using Backend.Models;
using FluentValidation;

namespace Backend.Validators.Cinema;

public class TicketValidator: AbstractValidator<TicketModel>
{
    public TicketValidator()
    {
        RuleFor(ticket => ticket.MovieTitle).NotNull().WithMessage("A propriedade MovieTitle é obrigatória")
            .NotEmpty().WithMessage("O titúlo não pode estar em branco.")
            .MaximumLength(30).WithMessage("O titúlo não pode ter mais de 30 caracteres.");
        RuleFor(ticket => ticket.MovieSubtitle)
        .Cascade(CascadeMode.Stop)
        .NotEmpty().When(ticket => ticket.MovieSubtitle != null)
        .WithMessage("O subtítulo não pode estar em branco.");
        RuleFor(ticket => ticket.OrderId).NotNull().WithMessage("A propriedade OrderId é obrigatória")
           .NotEmpty().WithMessage("O OrderId não pode estar vazio.")
           .MaximumLength(14).WithMessage("O OrderId não pode ter mais de 14 caracteres.");
        RuleFor(ticket => ticket.RoomNumber).NotNull().WithMessage("A propriedade RoomNumber é obrigatória")
            .NotEmpty().WithMessage("O RoomNumber não pode estar vazio.");
        RuleFor(ticket => ticket.PurchasedSeats).NotNull().
           WithMessage("A propriedade PurchasedSeats é obrigatória").NotEmpty().WithMessage("O PurchasedSeats não pode estar em branco.");
        RuleFor(ticket => ticket.EventDateTime).NotNull().
            WithMessage("A data e hora são necessárias").SetValidator(new EventDateTimeValidator());
    }
}

public class EventDateTimeValidator : AbstractValidator<EventDateTime>
{
    public EventDateTimeValidator()
    {
        RuleFor(dateTime => dateTime.Date)
            .NotEmpty().WithMessage("A data do evento é obrigatória.")
            .Must(BeInFuture).WithMessage("A data do evento deve estar no futuro.");

        RuleFor(dateTime => dateTime.Time)
            .NotEmpty().WithMessage("A hora do evento é obrigatória.");
    }

    private bool BeInFuture(DateTime date)
    {
        return date > DateTime.Now;
    }

}