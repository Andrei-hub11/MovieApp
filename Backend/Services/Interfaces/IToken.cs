using Microsoft.AspNetCore.Identity;

namespace Backend.Services.Interfaces;

public interface IToken
{
    string GenerateJwtToken(IdentityUser user, IEnumerable<string> roles);
}
