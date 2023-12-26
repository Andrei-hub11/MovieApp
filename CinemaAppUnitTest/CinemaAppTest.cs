using System.Security.Claims;
using System.Threading.Tasks;
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
using Microsoft.AspNetCore.Routing;
using CinemaAppUnitTest.Utils;
using ErrorOr;
using CinemaAppUnitTest.Tests2;
using Backend.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;
using Moq;


namespace CinemaAppUnitTest;

public class CinemaControllerTests
{

    private CinemaController GetTestCinemaController()
    {
        var options = new DbContextOptionsBuilder<AppDBContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryCinemaDB")
            .Options;
        var accountOptions = new DbContextOptionsBuilder<AccountDBContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryAccountDB")
            .Options;

        var dbContext = new AppDBContext(options);
        var accountDbContext = new AccountDBContext(accountOptions);
        var userManager = GetTestUserManager(accountOptions);
        var mapper = GetTestMapper();
        var hubContex = GetTestHubContext();



        var _cinemaService = new CinemaService(dbContext, accountDbContext, userManager);
        var controller = new CinemaController(_cinemaService, mapper, hubContex);
        var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.Name, "TestUser"),

            new Claim(ClaimTypes.Role, "User"),
             new Claim(ClaimTypes.NameIdentifier, "7ED43069-B436-4DD1-9172-69A6E253B1FD")
        }, "mock"));

        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = user }
        };

        return controller;
    }



    private UserManager<ApplicationUser> GetTestUserManager(DbContextOptions<AccountDBContext> accountOptions)
    {
        var accountDbContext = new AccountDBContext(accountOptions);
        IUserStore<ApplicationUser> userStore = new UserStore<ApplicationUser>(accountDbContext);
        IOptions<IdentityOptions> identityOptions = Options.Create(new IdentityOptions());
        IPasswordHasher<ApplicationUser> passwordHasher = new PasswordHasher<ApplicationUser>();
        IEnumerable<IUserValidator<ApplicationUser>> userValidators = new List<IUserValidator<ApplicationUser>>();
        IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators = new List<IPasswordValidator<ApplicationUser>>();
        ILookupNormalizer lookupNormalizer = new UpperInvariantLookupNormalizer();
        IdentityErrorDescriber errorDescriber = new IdentityErrorDescriber();
        IServiceProvider serviceProvider = null; // Substitua pelo sua implementação real
        ILogger<UserManager<ApplicationUser>> logger = null; // Substitua pelo sua implementação real

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

    private IHubContext<NotificationHub> GetTestHubContext()
    {
        var hubContext = new Mock<IHubContext<NotificationHub>>();

        // Configurar métodos ou comportamentos necessários para o Mock
        // Por exemplo:
        hubContext.Setup(h => h.Clients.All.SendCoreAsync(
           It.IsAny<string>(),  // Argumento obrigatório (o identificador do método)
           It.IsAny<object[]>(), // Argumento obrigatório (os argumentos do método)
           default(CancellationToken))) // Argumento opcional
       .Returns(Task.CompletedTask);

        return hubContext.Object;
    }



    [Fact]
    public async Task CreateRoom_ReturnsOkResultWhenValidationPassesAndAuthorizedUser()
    {
        // Arrange
        var controller = GetTestCinemaController();

        var validRoom = new RoomModel()
        {
            RoomNumber = "A-5",
            EventDateTime = new DateTime(2026, 1, 1, 0, 0, 0),
            MovieTitle = "Avatar",
            MovieCategory = "Aventura"
        };


        // Act
        var result = await controller.CreateRoom(validRoom);

        // Assert
        Assert.IsType<OkObjectResult>(result);


        var okResult = result as OkObjectResult;
        Assert.NotNull(okResult);


        var message = TestResultHelpers.GetPropertyValue<string>(okResult.Value, "Message");
        var room = TestResultHelpers.GetPropertyValue<RoomModel>(okResult.Value, "Room");

        Assert.NotNull(message);
        Assert.NotNull(room);
        Assert.Equal("Sala criada com sucesso", message);
        Assert.Equal("A-5", room.RoomNumber);
        Assert.Equal("Avatar", room.MovieTitle);
    }

    [Fact]
    public async Task CreateRoom_InvalidModel_ReturnsBadRequest()
    {
        // Arrange
        var controller = GetTestCinemaController();

        var invalidRoom = new RoomModel()
        {

        };

        // Act
        var result = await controller.CreateRoom(invalidRoom);

        var badResult = result as BadRequestObjectResult;
        Assert.NotNull(badResult);

        var message = TestResultHelpers.GetPropertyValue<string>(badResult.Value, "Message");
        var errors = TestResultHelpers.GetPropertyValue<List<string>>(badResult.Value, "Errors");

        Assert.NotNull(message);
        Assert.NotNull(errors);
        foreach (var error in errors)
        {
            Assert.NotEmpty(error);
        }
        Assert.Equal("Os campos não foram corretamente preenchidos", message);
    }

    [Fact]
    public async Task Should_Return_GuidForAuthorizedUser()
    {
        var controller = GetTestCinemaController();

        var result = await controller.CreateGiftCard();

        Assert.IsType<OkObjectResult>(result);

        var okResult = result as OkObjectResult;

        Assert.NotNull(okResult);

        var gift = TestResultHelpers.GetPropertyValue<GiftCardModel>(okResult.Value, "GiftCard");

        Assert.NotNull(gift);
        Assert.False(gift.IsUsed);
        Assert.True(Guid.TryParse(gift.GiftCodigo.ToString(), out var parsedGuid));
    }

    [Fact]
    public async Task GetCheckGiftCard_WithUnusedGiftCard_ReturnsTrue()
    {
        var controller = GetTestCinemaController();

        await controller.CreateGiftCard();
        var result = await controller.GetGiftCards();

        var okResult = result as OkObjectResult;

        Assert.NotNull(okResult);

        var gift = TestResultHelpers.GetPropertyValue<IEnumerable<GiftCardModel>>(okResult.Value, "GiftCards");

        var checkGiftResult = await controller.GetCheckGiftCard(gift.ElementAt(0).GiftCodigo);

        var okCheckResult = checkGiftResult as OkObjectResult;

        Assert.NotNull(okCheckResult);

        var isUsed = (bool)okCheckResult.Value;

        Assert.True(isUsed);
    }

    [Fact]
    public async Task GetRoom_ReturnsOkForAuthorizedUser()
    {
        var controller = GetTestCinemaController();

        var validRoom = new RoomModel()
        {
            RoomNumber = "A-5",
            EventDateTime = new DateTime(2026, 1, 1, 0, 0, 0),
            MovieTitle = "Avatar",
            MovieCategory = "Aventura"
        };

        // Act
        await controller.CreateRoom(validRoom);
        var result = await controller.GetRoom();

        // Assert
        Assert.IsType<OkObjectResult>(result);

        var okResult = result as OkObjectResult;

        Assert.NotNull(okResult);

        var rooms = TestResultHelpers.GetPropertyValue<IEnumerable<RoomModel>>(okResult.Value, "Rooms");

        Assert.NotNull(rooms);
        Assert.NotEmpty(rooms);
        foreach (var room in rooms)
        {
            Assert.NotNull(room.RoomNumber);
            Assert.NotNull(room.EventDateTime);
            Assert.NotNull(room.Seats);
        }

    }

    [Fact]
    public async Task GetUpcomingRoomEvents_ReturnsExpectedRooms()
    {
        var controller = GetTestCinemaController();

        var listValidRooms = new List<RoomModel>
{
    new RoomModel
    {
       
        MovieTitle = "Movie 1",
        MovieSubtitle = "Subtitle 1",
        RoomNumber = "Room 101",
        MovieCategory = "Category A",
        EventDateTime = DateTime.Now.AddDays(1), 
    
    },
    new RoomModel
    {
      
        MovieTitle = "Movie 2",
        MovieSubtitle = "Subtitle 2",
        RoomNumber = "Room 102",
        MovieCategory = "Category B",
        EventDateTime = DateTime.Now.AddDays(1), 
      
    },
    new RoomModel
    {
       
        MovieTitle = "Movie 3",
        MovieSubtitle = "Subtitle 3",
        RoomNumber = "Room 103",
        MovieCategory = "Category C",
        EventDateTime = DateTime.Now.AddDays(2).AddHours(10), 
      
    },
    new RoomModel
    {
      
        MovieTitle = "Movie 4",
        MovieSubtitle = "Subtitle 4",
        RoomNumber = "Room 104",
        MovieCategory = "Category A",
        EventDateTime = DateTime.Now.AddDays(2).AddHours(15), 
      
    },
    new RoomModel
    {
       
        MovieTitle = "Movie 5",
        MovieSubtitle = "Subtitle 5",
        RoomNumber = "Room 105",
        MovieCategory = "Category B",
        EventDateTime = DateTime.Now.AddDays(3).AddHours(12), 
      
    },
    new RoomModel
    {
      
        MovieTitle = "Movie 6",
        MovieSubtitle = "Subtitle 6",
        RoomNumber = "Room 106",
        MovieCategory = "Category C",
        EventDateTime = DateTime.Now.AddDays(4).AddHours(14), 
      
    }
};

        foreach (var room in listValidRooms)
        {

            await controller.CreateRoom(room); 
        }

        var result = await controller.GetUpcomingRoomEvents();
        var okResult = result as OkObjectResult;
        var roomList = TestResultHelpers.GetPropertyValue<IEnumerable<RoomModel>>(okResult.Value, "Rooms");

        foreach (var room in roomList)
        {
            Assert.NotNull(room);
        }

        Assert.Equal(2, roomList.Count());
    }

        [Fact]
    public async Task GetOrderIdAsync_ShouldGenerateOrderId()
    {
        var controller = GetTestCinemaController();

     
        var result = await controller.GetOrderId();

        var okResult = result as OkObjectResult;
        var orderId = TestResultHelpers.GetPropertyValue<string>(okResult.Value, "OrderId");

        Assert.NotNull(orderId);
        Assert.NotEmpty(orderId);
        Assert.StartsWith("#", orderId);
        Assert.Equal(14, orderId.Length);
    }

    [Fact]
    public async Task UpdateRoom_ReturnsOkResultWhenValidationPassesForAuthorizeAdmin()
    {
        var controller = GetTestCinemaController();

        var validRoom = new RoomModel()
        {
            RoomNumber = "A-5",
            EventDateTime = new DateTime(2026, 1, 1, 0, 0, 0),
            MovieTitle = "Avatar",
            MovieCategory = "Aventura"
        };

        var result = await controller.CreateRoom(validRoom);
        var okResult = result as OkObjectResult;
        var newRoom = TestResultHelpers.GetPropertyValue<RoomModel>(okResult.Value, "Room");

        string roomNumberExpected = "A-7";
        DateTime expectedDate = new DateTime(2026, 3, 1, 0, 0, 0);
        var updateRoom = new RoomModel()
        {
            RoomNumber = roomNumberExpected,
            EventDateTime = expectedDate,
        };

        var roomUpdateResult = await controller.UpdateRoom(newRoom.Id, updateRoom);

        Assert.IsType<OkObjectResult>(roomUpdateResult);
        var okRoomResult = roomUpdateResult as OkObjectResult;
        Assert.NotNull(okRoomResult);


        var message = TestResultHelpers.GetPropertyValue<string>(okRoomResult.Value, "Message");
        var room = TestResultHelpers.GetPropertyValue<RoomModel>(okRoomResult.Value, "Room");

        Assert.NotNull(message);
        Assert.NotNull(room);
        Assert.Equal("A sala foi atualizada com sucesso", message);
        Assert.Equal(expectedDate, room.EventDateTime);
        Assert.Equal(roomNumberExpected, room.RoomNumber);
    }

    [Fact]
    public async Task AddSeat_ReturnsOkResultWhenValidationPassesForAuthorizeAdmin()
    {
        var controller = GetTestCinemaController();

        var validRoom = new RoomModel()
        {
            RoomNumber = "A-5",
            EventDateTime = new DateTime(2026, 1, 1, 0, 0, 0),
            MovieTitle = "Avatar",
            MovieCategory = "Aventura"
        };

        var result = await controller.CreateRoom(validRoom);
        var okResult = result as OkObjectResult;
        var newRoom = TestResultHelpers.GetPropertyValue<RoomModel>(okResult.Value, "Room");

        var validSeat = new SeatModel()
        {
            SeatNumber = new List<string> { "A-1" },
            SeatPrice = 4,
            RoomId = newRoom.Id,
        };
        var seatNumberExpected = new List<string> { "A-1" };
        decimal seatPriceExpected = 4;


        var seatResult = await controller.AddSeat(validSeat);

        Assert.IsType<OkObjectResult>(seatResult);


        var okSeatResult = seatResult as OkObjectResult;
        Assert.NotNull(okSeatResult);

        var message = TestResultHelpers.GetPropertyValue<string>(okSeatResult.Value, "Message");
        var room = TestResultHelpers.GetPropertyValue<RoomModel>(okSeatResult.Value, "Room");

        Assert.NotNull(message);
        Assert.NotNull(room);
        Assert.IsType<List<string>>(room.Seats.ElementAt(0).SeatNumber);
        Assert.Equal("Os assentos foram adicionados com sucesso", message);
        Assert.Equal(seatNumberExpected, room.Seats.ElementAt(0).SeatNumber);
        Assert.Equal(seatPriceExpected, room.Seats.ElementAt(0).SeatPrice);
        Assert.False(room.Seats.ElementAt(0).IsReserved);
    }

    [Fact]
    public async Task AddSeat_InvalidModel_ReturnsBadRequest()
    {
        var controller = GetTestCinemaController();

        var validRoom = new RoomModel()
        {
            RoomNumber = "2",
            EventDateTime = new DateTime(2026, 1, 1, 0, 0, 0),
            MovieTitle = "Avatar",
            MovieCategory = "Aventura"
        };
        var result = await controller.CreateRoom(validRoom);
        var okResult = result as OkObjectResult;
        var newRoom = TestResultHelpers.GetPropertyValue<RoomModel>(okResult.Value, "Room");


        var invalidSeat = new SeatModel()
        {
            RoomId = newRoom.Id,
            SeatPrice = 4,
            SeatNumber = new List<string> { "A-1", "A-1", "A-3" }
        };

        var invalidSeatFluentValidation = new SeatModel()
        {

        };


        string seatErrorExpected = $"Existem assentos duplicado na sala de id {newRoom.Id}";

        var seatResult = await controller.AddSeat(invalidSeat);
        var fluentValidationResult = await controller.AddSeat(invalidSeatFluentValidation);


        Assert.IsType<BadRequestObjectResult>(seatResult);
        Assert.IsType<BadRequestObjectResult>(fluentValidationResult);

        var badSeatResult = seatResult as BadRequestObjectResult;
        Assert.NotNull(badSeatResult);
        var badFluentValidationResult = fluentValidationResult as BadRequestObjectResult;
        Assert.NotNull(badSeatResult);


        var message = TestResultHelpers.GetPropertyValue<string>(badSeatResult.Value, "Message");
        var fluentValidationMessage = TestResultHelpers.GetPropertyValue<string>(badFluentValidationResult.Value, "Message");
        var errors = TestResultHelpers.GetPropertyValue<List<string>>(badSeatResult.Value, "Errors");
        var fluentValidationError = TestResultHelpers.GetPropertyValue<List<string>>(badFluentValidationResult
            .Value, "Errors");

        Assert.NotNull(message);
        Assert.NotNull(fluentValidationMessage);
        Assert.NotNull(fluentValidationError);
        Assert.NotNull(errors);
        foreach (var validationErrors in fluentValidationError)
        {
            Assert.NotEmpty(validationErrors);
        }
        Assert.Equal("Algo deu errado", message);
        Assert.Equal("Os campos não foram corretamente preenchidos", fluentValidationMessage);
        Assert.Equal(seatErrorExpected, errors[0]);
    }

    [Fact]
    public async Task CreateTicket_ReturnsOkResultWhenValidationPassesAndAuthorizedUser()
    {
        CinemaAccountTests cinemaAccountTests = new CinemaAccountTests();
        var controller = cinemaAccountTests.GetAccountControllerForTesting();
        var cinemaController = GetTestCinemaController();
        
        var validRoom = new RoomModel()
        {
            RoomNumber = "2",
            EventDateTime = new DateTime(2026, 1, 1, 0, 0, 0),
            MovieTitle = "Avatar",
            MovieCategory = "Aventura"
        };
        
       var roomResult = await cinemaController.CreateRoom(validRoom);

        
        var okRoomResult = roomResult as OkObjectResult;
        var newRoom = TestResultHelpers.GetPropertyValue<RoomModel>(okRoomResult.Value, "Room");

        var validSeat = new SeatModel()
        {
            SeatNumber = new List<string> { "A-1" },
            SeatPrice = 4,
            RoomId = newRoom.Id,
        };

        var validUser = new UserRegisterModel
        {
            UserName = "testuser",
            Email = "test@example.com",
            Password = "36147538##Aa",
            Role = "Admin"
        };

        await cinemaController.AddSeat(validSeat);
        await controller.Register(validUser);
        var result = await controller.GetUsers();

        var resultRoom = await cinemaController.GetRoom();

        var okRoomsResult = resultRoom as OkObjectResult;

        var rooms = TestResultHelpers.GetPropertyValue<List<RoomModel>>(okRoomsResult.Value, "Rooms");

        var okResult = Assert.IsType<OkObjectResult>(result);
        var userList = (List<UserDTO>)okResult.Value.GetType().GetProperty("Users")
             .GetValue(okResult.Value);

        var validTicket = new TicketDTO(
             Title: "Test",
             OrderId: "#PlF519pkyx3hD",
             RoomNumber: "5",
     AmountPaid: 0,
     EventDateTime: new EventDateTime
     {
         Date = DateTime.Parse("2025-11-16"),
         Time = TimeSpan.Parse("04:30:00")
     },
     UserId: userList[0].Id,
     PurchasedSeats: new List<string> { "A-1"}
            );


        var ticketResult = await cinemaController.CreateTicket(rooms[6].Id, validTicket);
        Console.WriteLine("test");
        Assert.IsType<OkObjectResult>(ticketResult);
        var okTicketResult = ticketResult as OkObjectResult;
        Assert.NotNull(okTicketResult);


  
        var ticket = TestResultHelpers.GetPropertyValue<TicketDTO>(okTicketResult.Value, "Ticket");

        Assert.NotNull(ticket);
        Assert.IsType<DateTime>(ticket.EventDateTime.Date);
        Assert.IsType<TimeSpan>(ticket.EventDateTime.Time);
        Assert.Equal(4, ticket.AmountPaid);
        Assert.Equal("A-1", ticket.PurchasedSeats[0]);
    }

    [Fact]
    public async Task CreateTicket_InvalidModel_ReturnsBadRequest()
    {
        CinemaAccountTests cinemaAccountTests = new CinemaAccountTests();
        var controller = cinemaAccountTests.GetAccountControllerForTesting();
        var cinemaController = GetTestCinemaController();

        var validRoom = new RoomModel()
        {
            RoomNumber = "2",
            EventDateTime = new DateTime(2026, 1, 1, 0, 0, 0),
            MovieTitle = "Avatar",
            MovieCategory = "Aventura"
        };

        var roomResult = await cinemaController.CreateRoom(validRoom);


        var okRoomResult = roomResult as OkObjectResult;
        var newRoom = TestResultHelpers.GetPropertyValue<RoomModel>(okRoomResult.Value, "Room");

        var validSeat = new SeatModel()
        {
            SeatNumber = new List<string> { "A-1" },
            SeatPrice = 4,
            RoomId = newRoom.Id,
        };

        await cinemaController.AddSeat(validSeat);
        var result = await controller.GetUsers();

        var resultRoom = await cinemaController.GetRoom();

        var okRoomsResult = resultRoom as OkObjectResult;

        var rooms = TestResultHelpers.GetPropertyValue<List<RoomModel>>(okRoomsResult.Value, "Rooms");

        var okResult = Assert.IsType<OkObjectResult>(result);
        var userList = (List<UserDTO>)okResult.Value.GetType().GetProperty("Users")
             .GetValue(okResult.Value);

        var validTicket = new TicketDTO(
             Title: "Test",
               RoomNumber: "5",
     AmountPaid: 1.0M,
      OrderId: "#PlF519pkyx3hD",
     EventDateTime: new EventDateTime
     {
         Date = DateTime.Parse("2025-11-16"),
         Time = TimeSpan.Parse("04:30:00")
     },
     UserId: userList[0].Id,
     PurchasedSeats: new List<string> { "A-1" }
            );

        var invalidTicket = new TicketDTO(
             Title: "Test",
               RoomNumber: "5",
              OrderId: "",
     AmountPaid: 0,
     EventDateTime: new EventDateTime
     {
         Date = DateTime.Parse("2025-11-16"),
         Time = TimeSpan.Parse("04:30:00")
     },
     UserId: userList[0].Id,
     PurchasedSeats: new List<string> { "A-1" }
            );

        var ticketWithInvalidUserid = new TicketDTO(
             Title: "Test",
             RoomNumber: "5",
              OrderId: "#PlF519pkyx3hD",
     AmountPaid: 0,
     EventDateTime: new EventDateTime
     {
         Date = DateTime.Parse("2025-11-16"),
         Time = TimeSpan.Parse("04:30:00")
     },
     UserId: "ff9cff63 - 6c05 - 4720 - aea3 - f251aac168e2",
     PurchasedSeats: new List<string> { "A-1" }
            );

        await cinemaController.CreateTicket(rooms[0].Id, validTicket);
        var ticketResult = await cinemaController.CreateTicket(rooms[0].Id, invalidTicket);
        var ticketResultWithInvalidUserid = await cinemaController.CreateTicket(rooms[0].Id, 
            ticketWithInvalidUserid);
   
        Assert.IsType<BadRequestObjectResult>(ticketResult);
        Assert.IsType<BadRequestObjectResult>(ticketResultWithInvalidUserid);
        var badTicketResult = ticketResult as BadRequestObjectResult;
        var badTicketResultWithInvalidUserid = ticketResultWithInvalidUserid as BadRequestObjectResult;
        Assert.NotNull(badTicketResult);
        Assert.NotNull(badTicketResultWithInvalidUserid);


        var message = TestResultHelpers.GetPropertyValue<string>(badTicketResult.Value, "Message");
        var errors = TestResultHelpers.GetPropertyValue<List<string>>(badTicketResult.Value, "Errors");
        var ticketMessageWithoutUserid = TestResultHelpers.
            GetPropertyValue<string>(badTicketResultWithInvalidUserid.Value, "Message");
        var ticketErrorsWithInvalidUserid = TestResultHelpers.GetPropertyValue
            <List<string>>(badTicketResultWithInvalidUserid.Value, "Errors");


        Assert.NotNull(message);
        Assert.NotNull(errors);
        Assert.NotNull(ticketMessageWithoutUserid);
        Assert.NotNull(ticketErrorsWithInvalidUserid);
        foreach (var error in errors)
        {
            Assert.NotEmpty(error);
        }
        foreach (var error in ticketErrorsWithInvalidUserid)
        {
            Assert.NotEmpty(error);
        }
        Assert.Equal("O OrderId não pode estar vazio.", errors[0]);
        Assert.Equal("O usuário com o id ff9cff63 - 6c05 - 4720 - aea3 - f251aac168e2 não foi encontrado",
            ticketErrorsWithInvalidUserid[0]);
    }
    }

