using Microsoft.AspNetCore.Identity;
using Backend.Models;
using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface IAccount
{
    Task<List<UserDTO>> GetUsersAsync();
    Task<UserDTO> GetUserByIdAsync(string userId);
    Task<ApplicationUser> FindByEmailAsync(string userName);
    Task<bool> CheckPasswordAsync(ApplicationUser user, string password);
    Task<IdentityResult> CreateAsync(ApplicationUser user, string password);
    Task<IdentityResult> AddToRoleAsync(ApplicationUser user, string role);
    Task<IList<string>> GetRolesAsync(ApplicationUser user);
    Task<bool> UploadProfileImageAsync(IFormFile image, string id);

}
