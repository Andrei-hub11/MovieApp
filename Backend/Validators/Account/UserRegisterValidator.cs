using FluentValidation;
using Backend.Models;

namespace Backend.Validators.Account;

public class UserRegisterValidator : AbstractValidator<UserRegisterModel>
{
    public UserRegisterValidator()
    {
        RuleFor(user => user.UserName).NotEmpty().MaximumLength(30)
                .WithMessage("O nome não pode ter mais de 30 caracteres.");
        RuleFor(user => user.Email).NotEmpty().WithMessage("O campo de e-mail não pode estar vazio.")
        .EmailAddress().WithMessage("Por favor, forneça um endereço de e-mail válido.");
        RuleFor(user => user.Password).NotEmpty().WithMessage("A senha não pode estar vazia.")
        .MinimumLength(8).WithMessage("A senha deve conter no mínimo 8 caracteres.")
        .Matches(@"[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]")
        .WithMessage("A senha deve conter pelo menos 2 caracteres especiais.");
        RuleFor(user => user.Role)
        .NotEmpty().WithMessage("O campo 'Role' não pode estar vazio.")
        .Must(role => role == "Admin" || role == "User")
            .WithMessage("O campo 'Role' deve ser 'Admin' ou 'User'.");
    }
}
