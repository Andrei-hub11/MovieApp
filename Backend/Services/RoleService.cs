using Microsoft.AspNetCore.Identity;
using Backend.Services.Interfaces;
using Backend.Models;

namespace Backend.Services;

public class RoleService : IRole
{
    private readonly RoleManager<IdentityRole> _roleManager;

    public RoleService(RoleManager<IdentityRole> roleManager)
    {
        _roleManager = roleManager;
    }

    public async Task<bool> CreateRoleAsync(string roleName)
    {
        if (string.IsNullOrWhiteSpace(roleName))
        {
            return false;
        }

        if (await _roleManager.RoleExistsAsync(roleName))
        {
            return false;
        }

        var role = new IdentityRole(roleName);
        var result = await _roleManager.CreateAsync(role);

        return result.Succeeded;
    }
}

    



