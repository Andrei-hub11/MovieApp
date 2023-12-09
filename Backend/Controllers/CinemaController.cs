using AutoMapper;
using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Backend.SignalR.Hubs;
using Backend.Validators.Cinema;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Backend.Controllers;


[Route("api/v1/")]
[ApiController]
public class CinemaController : ControllerBase
{
    private readonly CinemaService _cinemaService;
    private readonly IMapper _mapper;
    private readonly IHubContext<NotificationHub> _hubContext;
    public CinemaController(CinemaService cinemaService, IMapper mapper, IHubContext<NotificationHub> hubContext) 
    { 
        _cinemaService = cinemaService;
        _mapper = mapper;
        _hubContext = hubContext;
    }

    [Authorize(Policy = "UserOrAdmin")]
    [HttpGet("rooms")]
    public async Task<IActionResult> GetRoom()
    {
        try
        {
            var result = await _cinemaService.GetRoomsAsync();
              return  Ok(new { Rooms = result });
        } 
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Message = "Ocorreu um erro durante a busca das salas.",
                Error = ex.Message
            });
        }
    }

    [Authorize(Policy = "Admin")]
    [HttpGet("giftcards")]
    public async Task<IActionResult> GetGiftCards()
    {
        try
        {
            var result = await _cinemaService.GetGiftCardsAsync();
            return Ok(new { GiftCards = result });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Message = "Ocorreu um erro durante a busca das salas.",
                Error = ex.Message
            });
        }
    }

    [Authorize(Policy = "Admin")]
    [HttpPost("create-room")]
    public async Task<IActionResult> CreateRoom([FromBody] RoomModel room)
    {
        var validator = new RoomValidator();
        var validationResult = validator.Validate(room);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(erro => erro.ErrorMessage).ToList();
            return BadRequest(new { Message = "Os campos não foram corretamente preenchidos", 
                Errors = errors });

        }

        try
        {
            var result = await _cinemaService.CreateRoomAsync(room);
            return Ok(new { Message = "Sala criada com sucesso", Room = result });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Ocorreu um erro durante a criação da sala.", 
                Error = ex.Message });
        }

    }

    [Authorize(Policy = "Admin")]
    [HttpPost("create-ticket/{roomId}")]
    public async Task<IActionResult> CreateTicket(Guid roomId, [FromBody] TicketDTO ticket)
    {
        var ticketModel = _mapper.Map<TicketModel>(ticket);
        var validator = new TicketValidator();
        var validationResult = validator.Validate(ticketModel);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(erro => erro.ErrorMessage).ToList();
            return BadRequest(new
            {
                Message = "Os campos não foram corretamente preenchidos",
                Errors = errors
            });

        }

        try
        {
            var result = await _cinemaService.CreateTicketAsync(roomId, ticket);

            if (result.IsError)
            {
                var errorMessages = result.Errors.Select(error => error.Description).ToList();
                return BadRequest(new { Message = "Algo deu errado", Errors = errorMessages });
            }

            var ticketDTO = _mapper.Map<TicketDTO>(result.Value);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (NotificationHub.TryGetConnectionId(userId, out string connectionId))
            {
                await _hubContext.Clients.Client(connectionId).SendAsync("ReceberNotificacao", "Sua compra foi confirmada!");
            }

            return Ok(new { Message = "Ticket criado com sucesso", Ticket = ticketDTO });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Message = "Ocorreu um erro durante a criação da sala.",
                Error = ex.Message
            });
        }

    }

    [Authorize(Policy = "Admin")]
    [HttpPost("create-giftcard")]
    public async Task<IActionResult> CreateGiftCard()
    {

        try
        {
            var result = await _cinemaService.CreateGiftCodigoAsync();
            return Ok(new { Message = "Gift card criado com sucesso", GiftCard = result });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Message = "Ocorreu um erro durante a criação da sala.",
                Error = ex.Message
            });
        }

    }

    [Authorize(Policy = "Admin")]
    [HttpPost("add-seat")]
    public async Task<IActionResult> AddSeat([FromBody] SeatModel seat)
    {
        var validator = new SeatValidator();
        var validationResult = validator.Validate(seat);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(erro => erro.ErrorMessage).ToList();
            return BadRequest(new
            {
                Message = "Os campos não foram corretamente preenchidos",
                Errors = errors
            });

        }

        try
        {
            var result = await _cinemaService.AddSeatAsync(seat);

            if (result.IsError)
            {
                var errorMessages = result.Errors.Select(error => error.Description).ToList();
                return BadRequest(new { Message = "Algo deu errado", Errors = errorMessages });
            }
            return Ok(new { Message = "Os assentos foram adicionados com sucesso", Room = result.Value });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Message = "Ocorreu um erro durante a adição dos assentos.",
                Error = ex.Message
            });
        }
    }

    [Authorize(Policy = "Admin")]
    [HttpPut("update-room/{id}")]
    public async Task<IActionResult> UpdateRoom(Guid id, [FromBody] RoomModel roomEdit)
    {
        var validator = new RoomValidator();
        var validationResult = validator.Validate(roomEdit);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(erro => erro.ErrorMessage).ToList();
            return BadRequest(new
            {
                Message = "Os campos não foram corretamente preenchidos",
                Errors = errors
            });

        }

        try
        {
            var result = await _cinemaService.UpdateRoomAsync(id, roomEdit);
            if (result.IsError)
            {
                var errorMessages = result.Errors.Select(error => error.Description).ToList();
                return BadRequest(new { Message = "Algo deu errado", Errors = errorMessages });
            }
            return Ok(new { Message = "A sala foi atualizada com sucesso", Room = result.Value });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Message = "Ocorreu um erro durante a criação da sala.",
                Error = ex.Message
            });
        }
    }

    [Authorize(Policy = "UserOrAdmin")]
    [HttpPut("update-gift/{code}")]
    public async Task<IActionResult> UpdateGift(Guid code)
    {

        try
        {
            var result = await _cinemaService.UseGiftCardAsync(code);
            if (result.IsError)
            {
                var errorMessages = result.Errors.Select(error => error.Description).ToList();
                return BadRequest(new { Message = "Algo deu errado", Errors = errorMessages });
            }
            return Ok(true);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Message = "Ocorreu um erro durante a criação da sala.",
                Error = ex.Message
            });
        }
    }

    [Authorize(Policy = "Admin")]
    [HttpDelete("delete-room/{id}")]
    public async Task<IActionResult> DeleteRoom(Guid id)
    {
        try
        {
            var result = await _cinemaService.DeleteRoomAsync(id);
            if (result.IsError)
            {
                var errorMessages = result.Errors.Select(error => error.Description).ToList();
                return BadRequest(new { Message = "Algo deu errado", Errors = errorMessages });
            }
           
            return Ok(new { Message = "A sala foi excluída corretamente" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Message = "Ocorreu um erro durante a exclusão da sala.",
                Error = ex.Message
            });
        }
    }

  
}
