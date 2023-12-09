using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Backend.DTOs;
using ErrorOr;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services;

public class AccountService : IAccount
{

    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public AccountService(UserManager<ApplicationUser> userManager, IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<List<UserDTO>> GetUsersAsync()
    {
        var users = await _userManager.Users.Include(user => user.Tickets).ToListAsync();
        var usersDTO = users.Select(_mapper.Map<UserDTO>).ToList();
        return usersDTO;
    }

    public async Task<ErrorOr<UserDTO>> GetUserByIdAsync(string userId)
    {
        List<Error> errors = new();
        var user = await _userManager.Users.FirstOrDefaultAsync((user) => user.Id == userId);

        if (user == null)
        {
            errors.Add(
            Error.Validation(
                description: $"O usuário com o id {userId} não foi encontrado"
            )
        );
            return errors;
        }

        var userDTO = _mapper.Map<ApplicationUser, UserDTO>(user);
        return userDTO;
    }

    public async Task<IdentityResult> AddToRoleAsync(ApplicationUser user, string role)
    {

        try
        {
            var result = await _userManager.AddToRoleAsync(user, role);
            return result;
        }
        catch (Exception ex)
        {
            return IdentityResult.Failed(new IdentityError { Description = ex.Message });
        }
    }

    public async Task<bool> CheckPasswordAsync(ApplicationUser user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
    }

    public async Task<IdentityResult> CreateAsync(ApplicationUser user, string password)
    {
        try
        {
            var result = await _userManager.CreateAsync(user, password);

            return result;
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);


        }
    }


    public async Task<ApplicationUser> FindByEmailAsync(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }

    public async Task<IList<string>> GetRolesAsync(ApplicationUser user)
    {
        return await _userManager.GetRolesAsync(user);
    }

    public async Task<ErrorOr<UserDTO>> UploadProfileImageAsync(IFormFile image, string userId)
    {
        List<Error> errors = new();
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            errors.Add(
            Error.Validation(
                description: $"O usuário com o id {userId} não foi encontrado"
            )
        );
            return errors;
        }

        using (var stream = new MemoryStream())
        {

            await image.CopyToAsync(stream);
            var fileName = Guid.NewGuid().ToString() + ".jpg";
            // Salve a imagem no servidor (por exemplo, na pasta wwwroot/images)
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);
            File.WriteAllBytes(filePath, stream.ToArray());
            user.ProfileImagePath = "/images/" + fileName;
            await _userManager.UpdateAsync(user);
            var userDTO = _mapper.Map<ApplicationUser, UserDTO>(user);
            return userDTO;
        }
    }

    public async Task<ErrorOr<UserDTO>> UpdateUserAsync(UserUpdateModel userData, string userId) { 
        List<Error> errors = new();

        var user = await _userManager.Users.FirstOrDefaultAsync((user) => user.Id == userId);

        if (user == null)
        {
            errors.Add(
            Error.Validation(
                description: $"O usuário com o id {userId} não foi encontrado"
            )
        );
            return errors;
        }

        var result = await _userManager.FindByEmailAsync(userData.Email);

        if (string.IsNullOrEmpty(userData.Email) && result != null)
        {
            errors.Add(
           Error.Validation(
               description: $"O email {userData.Email} já existe para outro usuário."
           )
       );
            return errors;
        }

        user.UserName = userData.UserName ?? user.UserName;
        user.Email = userData.Email ?? user.Email;

        await _userManager.UpdateAsync(user);

        var userDTO = _mapper.Map<ApplicationUser, UserDTO>(user);
        return userDTO;
    }

   
}
