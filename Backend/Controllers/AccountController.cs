﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Backend.Validators.Account;
using Backend.DTOs;
using AutoMapper;
using System.Security.Claims;

namespace Backend.Controllers;

[Route("api/v1/")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly AccountService _accountService;
    private readonly RoleService _roleService;
    private readonly TokenService _tokenService;
    private readonly IMapper _mapper;
    public AccountController(AccountService accountService, RoleService roleService, TokenService tokenService, IMapper mapper)
    {
        _accountService = accountService;
        _roleService = roleService;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    [Authorize(Policy = "Admin")]
    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            var result = await _accountService.GetUsersAsync();
            return Ok(new { Users = result });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Message = "Ocorreu um erro durante a busca dos usuários.",
                Error = ex.Message
            });
        }
    }

    [Authorize(Policy = "UserOrAdmin")]
    [HttpGet("get-me")]
    public async Task<IActionResult> GetMe()
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Obtém o ID do usuário do token JWT
            var result = await _accountService.GetUserByIdAsync(userId);
            var identityUser = await _accountService.FindByEmailAsync(result.Email);
            var roles = await _accountService.GetRolesAsync(identityUser);

            return Ok(new { User = result, Roles = roles});
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Message = "Ocorreu um erro durante a busca dos usuários.",
                Error = ex.Message
            });
        }
    }

    [Authorize(Policy = "Admin")]
    [HttpPost("create-role")]
    public async Task<IActionResult> CreateRole([FromBody] string roleName)
    {
        try
        {
            var created = await _roleService.CreateRoleAsync(roleName);

            if (!created)
            {
                return BadRequest(new { Message = "Ocorreu um erro ao criar a função." });

            }
            return Ok(new { Message = "Função criada com sucesso." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Ocorreu um erro durante o login.", Error = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginModel user)
    {
        try
        {
            var identityUser = await _accountService.FindByEmailAsync(user.Email);

            if (identityUser != null && await _accountService.CheckPasswordAsync(identityUser, user.Password))
            {
                var roles = await _accountService.GetRolesAsync(identityUser);
                var token = _tokenService.GenerateJwtToken(identityUser, roles);

                var userDTO = _mapper.Map<ApplicationUser, UserDTO>(identityUser);
                return Ok(new { Token = token, User = userDTO, Role = roles });
            }

            return Unauthorized(new { Message = "Credenciais inválidas." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Ocorreu um erro durante o login.", Error = ex.Message });
        }

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterModel user)
    {
        try
        {
            var validator = new UserRegisterValidator();
            var validationResult = validator.Validate(user);
            if (!validationResult.IsValid)
            {
                var erros = validationResult.Errors.Select(erro => erro.ErrorMessage).ToList();
                return BadRequest(new { Message = "Os campos não foram corretamente preenchidos", Errors = erros });
            }

            var newIdentityUser = new ApplicationUser { UserName = user.UserName, Email = user.Email };
            var result = await _accountService.CreateAsync(newIdentityUser, user.Password);

            if (!result.Succeeded)
            {

                var errorMessages = result.Errors.Select(error => error.Description);
                return BadRequest(new { Message = "Algo deu errado na criação do usuário", Errors = errorMessages });
            }


            var userDTO = _mapper.Map<ApplicationUser, UserDTO>(newIdentityUser);

            await _accountService.AddToRoleAsync(newIdentityUser, user.Role);
            var roles = await _accountService.GetRolesAsync(newIdentityUser);
            var token = _tokenService.GenerateJwtToken(newIdentityUser, new List<string> { user.Role });


            return Ok(new { Token = token, User = userDTO, Role = new List<string> { user.Role } });
        }
        catch (Exception ex)
        {

            return StatusCode(500, new { Message = "Ocorreu um erro durante o registro.", Error = ex.Message });
        }
    }

    [Authorize(Policy = "UserOrAdmin")]
    [HttpPost("upload-image/{id}")]
    public async Task<IActionResult> UploadProfileImage([FromForm] IFormFile image, string id)
    {
        if (image == null || image.Length < 0)
        {
            return BadRequest(new { Message = "Os campos não foram corretamente preenchidos" });
        }

        if (image.Length > 2 * 1024 * 1024) // 2 megabytes
        {
            return BadRequest(new { Message = "A imagem deve ter um tamanho menor que 2 megabytes." });
        }

        try
        {
            var result = await _accountService.UploadProfileImageAsync(image, id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Message = "Ocorreu um erro.",
                Error = ex.Message
            });
        }
    }
}