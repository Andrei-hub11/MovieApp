using Backend.Models;
using FluentValidation;

namespace Backend.Validators.Account;

public class UserUpdateValidator : AbstractValidator<UserUpdateModel>
{
    public UserUpdateValidator() {
         RuleFor(user => user.UserName).NotEmpty().MaximumLength(30)
                .WithMessage("O nome não pode ter mais de 30 caracteres.");
    RuleFor(user => user.Email).NotEmpty().WithMessage("O campo de e-mail não pode estar vazio.")
        .EmailAddress().WithMessage("Por favor, forneça um endereço de e-mail válido.");
}
}
