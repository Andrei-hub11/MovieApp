using Microsoft.AspNetCore.Identity;

namespace Backend.Services.Interfaces;

public interface IRole
{

    Task<bool> CreateRoleAsync(string roleName);
}
