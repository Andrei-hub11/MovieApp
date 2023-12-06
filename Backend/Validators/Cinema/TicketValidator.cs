using Backend.Models;
using FluentValidation;

namespace Backend.Validators.Cinema;

public class TicketValidator: AbstractValidator<TicketModel>
{
    public TicketValidator()
    {
        RuleFor(ticket => ticket.Title)
            .NotEmpty().WithMessage("O titúlo não pode estar em branco.")
            .MaximumLength(30).WithMessage("O titúlo não pode ter mais de 30 caracteres.");
        RuleFor(ticket => ticket.EventDateTime).NotNull().
            WithMessage("A data e hora são necessários").SetValidator(new EventDateTimeValidator());
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