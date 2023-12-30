using System.Security.Claims;
using Backend.Context;
using Backend.Controllers;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Xunit;
using AutoMapper;
using Backend.DTOs;
using Moq;
using Microsoft.Extensions.Configuration;
using CinemaAppUnitTest.Utils;
using Microsoft.VisualStudio.TestPlatform.CommunicationUtilities;
using ErrorOr;

namespace CinemaAppUnitTest.Tests2;

public class CinemaAccountTests
{


    private AccountService GetTestAccountService()
    {
        var userManager = GetTestUserManager();
        var mapper = GetTestMapper();

        return new AccountService(userManager, mapper);
    }

    private UserManager<ApplicationUser> GetTestUserManager()
    {
        var _accountOptions = new DbContextOptionsBuilder<AccountDBContext>()
           .UseInMemoryDatabase(databaseName: "InMemoryAccountDB")
           .Options;
        var accountDbContext = new AccountDBContext(_accountOptions);
        IUserStore<ApplicationUser> userStore = new UserStore<ApplicationUser>(accountDbContext);
        IOptions<IdentityOptions> identityOptions = Options.Create(new IdentityOptions());
        IPasswordHasher<ApplicationUser> passwordHasher = new PasswordHasher<ApplicationUser>();
        IEnumerable<IUserValidator<ApplicationUser>> userValidators = new List<IUserValidator<ApplicationUser>>();
        IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators = new List<IPasswordValidator<ApplicationUser>>();
        ILookupNormalizer lookupNormalizer = new UpperInvariantLookupNormalizer();
        IdentityErrorDescriber errorDescriber = new IdentityErrorDescriber();
        var serviceProvider = new Mock<IServiceProvider>().Object;
        var logger = new Mock<ILogger<UserManager<ApplicationUser>>>().Object;

        return new UserManager<ApplicationUser>(
            userStore,
            identityOptions,
            passwordHasher,
            userValidators,
            passwordValidators,
            lookupNormalizer,
            errorDescriber,
            serviceProvider,
            logger
        );
    }

    private RoleService GetTestRoleService()
    {
        var accountOptions = new DbContextOptionsBuilder<AccountDBContext>()
           .UseInMemoryDatabase(databaseName: "InMemoryCinemaDB")
           .Options;
        var accountDbContext = new AccountDBContext(accountOptions);

        var roleStore = new RoleStore<IdentityRole>(accountDbContext);
        var roleManager = new RoleManager<IdentityRole>(roleStore, null, null, null, null);
        return new RoleService(roleManager);
    }

    public static class ConfigurationHelper
    {
        public static IConfiguration GetTestConfiguration(Dictionary<string, string> settings)
        {
            var configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(settings)
                .Build();

            return configuration;
        }
    }

    private AccountController GetTestAccountController()
    {
        //simulando appsettings.json
        var inMemorySettings = new Dictionary<string, string> {
    {
        "Jwt:Key", "8FFC69F4-A432-46E0-BC80-7EEF14F54D9B"
    },
    {
        "Jwt:Issuer", "server"
    },
    {
        "Jwt:Audience", "users.com"
    },
    {
        "Jwt:DurationInMinutes", "4320"
    }
};


        var configuration = ConfigurationHelper.GetTestConfiguration(inMemorySettings);
        var mapper = GetTestMapper();

        var accountService = GetTestAccountService();
        var roleService = GetTestRoleService();
        var tokenService = new TokenService(configuration);
        var controller = new AccountController(accountService, roleService, tokenService, mapper);
        return controller;
    }

    private AccountController GetTestAccountControllerWithAuthorize()
    {
        //simulando appsettings.json
        var inMemorySettings = new Dictionary<string, string> {
    {
        "Jwt:Key", "8FFC69F4-A432-46E0-BC80-7EEF14F54D9B"
    },
    {
        "Jwt:Issuer", "server"
    },
    {
        "Jwt:Audience", "users.com"
    },
    {
        "Jwt:DurationInMinutes", "4320"
    }
};


        var configuration = ConfigurationHelper.GetTestConfiguration(inMemorySettings);
        var mapper = GetTestMapper();
        var accountService = GetTestAccountService();
        var roleService = GetTestRoleService();
        var tokenService = new TokenService(configuration);
        var controller = new AccountController(accountService, roleService, tokenService, mapper);
        var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
       {
            new Claim(ClaimTypes.Name, "TestUser"),

            new Claim(ClaimTypes.Role, "Admin"),
       }, "mock"));

        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = user }
        };
        return controller;
    }

    public AccountController GetAccountControllerForTesting()
    {
        return GetTestAccountControllerWithAuthorize();
    }

    private IMapper GetTestMapper()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<ApplicationUser, UserDTO>();
            cfg.CreateMap<TicketModel, TicketDTO>();
            cfg.CreateMap<TicketDTO, TicketModel>();
        });

        return configuration.CreateMapper();
    }

    [Fact]
    public async Task CreateRole_WithValidData_ReturnsOkObject()
    {
        var controller = GetTestAccountControllerWithAuthorize();
        var result = await controller.CreateRole("Admin");

        var okResult = Assert.IsType<OkObjectResult>(result);

        var message = TestResultHelpers.GetPropertyValue<string>(okResult.Value, "Message");

        Assert.NotNull(message);
        Assert.NotEmpty(message);
        Assert.Equal("Função criada com sucesso.", message);
    }

    [Fact]
    public async Task Register_WithValidUser_ReturnsTokenAndUserInfo()
    {
        // Arrange
        var controller = GetTestAccountController();

        var validUser = new UserRegisterModel
        {
            UserName = "test2user",
            Email = "nath@1gmail.com",
            Password = "16147538##Aa",
            Role = "Admin"
        };

        var result = await controller.Register(validUser);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Console.WriteLine(okResult);

        var token = TestResultHelpers.GetPropertyValue<string>(okResult.Value, "Token");
        var user = TestResultHelpers.GetPropertyValue<UserDTO>(okResult.Value, "User");
        var roleList = TestResultHelpers.GetPropertyValue<List<string>>(okResult.Value, "Role");

        Assert.NotNull(token);
        Assert.NotEmpty(token);
        Assert.Equal("test2user", user.UserName);
        Assert.Equal("nath@1gmail.com", user.Email);
        var propertyInfo = typeof(UserDTO).GetProperty("ProfileImagePath");
        Assert.NotNull(propertyInfo);
        foreach (var role in roleList)
        {
            Assert.NotNull(role);
            Assert.NotEmpty(role);
        }

    }


        [Fact]
    public async Task Login_ValidUser_ReturnsTokenAndUserInfo()
    {
        // Arrange
        var testuser = new UserRegisterModel
        {
            UserName = "test2user",
            Email = "nath@1gmail.com",
            Password = "16147538##Aa",
            Role = "Admin"
        };

        var controller = GetTestAccountController();

        var validUser = new UserLoginModel
        {
            Email = "nath@1gmail.com",
            Password = "16147538##Aa",
        };
       await controller.Register(testuser);
        var result = await controller.Login(validUser);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);

        var token = TestResultHelpers.GetPropertyValue<string>(okResult.Value, "Token");
        var user = TestResultHelpers.GetPropertyValue<UserDTO>(okResult.Value, "User");
        var roleList = TestResultHelpers.GetPropertyValue<List<string>>(okResult.Value, "Role");

        Assert.NotNull(token);
        Assert.NotEmpty(token);
        Assert.Equal("test2user", user.UserName);
        Assert.Equal("nath@1gmail.com", user.Email);
        var propertyInfo = typeof(UserDTO).GetProperty("ProfileImagePath");
        Assert.NotNull(propertyInfo);
        foreach (var role in roleList)
        {
            Assert.NotNull(role);
            Assert.NotEmpty(role);
        }

    }

    [Fact]
    public async Task GetUsers_ReturnsOkResultWhenNoExceptionThrown()
    {
        // Arrange
        var controller = GetTestAccountControllerWithAuthorize();


        var result = await controller.GetUsers();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Console.WriteLine(okResult);
        var userList = TestResultHelpers.GetPropertyValue<List<UserDTO>>(okResult.Value, "Users");


        Assert.NotNull(userList);
        Assert.NotEmpty(userList);

        foreach (var user in userList)
        {
            Assert.NotEmpty(user.UserName);
            Assert.NotEmpty(user.Email);
        }
    }

    [Fact]
    public async Task GetUsersByEmail_ReturnsOkResultWhenUserFound()
    {
        var testuser = new UserRegisterModel
        {
            UserName = "test2user",
            Email = "email_valido@example.com",
            Password = "16147538##Aa",
            Role = "Admin"
        };

        var controller = GetTestAccountControllerWithAuthorize();
        await controller.Register(testuser);
        string email = "email_valido@example.com"; 

        // Act
        var result = await controller.GetUserByEmail(email);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var userResponse = TestResultHelpers.GetPropertyValue<UserDTO>(okResult.Value, "User");

        Assert.NotNull(userResponse);
        Assert.Equal(email, userResponse.Email);
    }

    [Fact]
    public async Task GetUsersByEmail_ReturnsBadRequestWhenServiceFails()
    {
     
        var controller = GetTestAccountControllerWithAuthorize();
        string email = "email_invalido@example.com";
       
        var result = await controller.GetUserByEmail(email);
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        var errorsResponse = TestResultHelpers.GetPropertyValue<List<string>>(badRequestResult.Value, "Errors");

        foreach (var error in errorsResponse)
        {
            Assert.NotNull(error);
            Assert.NotEmpty(error);
        }

        Assert.Equal(errorsResponse[0], $"O usuário com o email {email} não foi encontrado");
    }
}
