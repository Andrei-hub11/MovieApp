using Backend.Models;
using FluentValidation;

namespace Backend.Validators.Account;

public class UserLoginValidator : AbstractValidator<UserLoginModel>
{
    public UserLoginValidator()
    {
        RuleFor(user => user.Email).NotNull()
            .WithMessage("A propriedade Email é obrigatória")
            .NotEmpty().WithMessage("O campo de e-mail não pode estar vazio.")
                .EmailAddress().WithMessage("Por favor, forneça um endereço de e-mail válido.");
        RuleFor(user => user.Password).NotNull()
            .WithMessage("A propriedade Password é obrigatória")
            .NotEmpty().WithMessage("A senha não pode estar vazia.")
        .MinimumLength(8).WithMessage("A senha deve conter no mínimo 8 caracteres.")
        .Matches(@"[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]")
        .WithMessage("A senha deve conter pelo menos 2 caracteres especiais.");
    }
}
