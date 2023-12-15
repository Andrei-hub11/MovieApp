using Backend.Context;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

class MovieData
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Subtitle {  get; set; }
    public string ImagePath { get; set; }
    public string BackdropPath { get; set; }
    public string Category { get; set; }
}

public class RoomData
{
    public static async Task CreateRoomsForDateRangeAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var cinemaService = scope.ServiceProvider.GetRequiredService<CinemaService>();
        var scheduledTimes = new Dictionary<string, HashSet<DateTime>>();

        DateTime currentDate = DateTime.Today;
        DateTime startDate = currentDate.AddDays(1); // Próximo dia após a data atual
        DateTime endDate = startDate.AddDays(2); // 11 dias após a startDate

        var movieData = new List<MovieData>
        {
            new MovieData { Id = 1, Title = "Avatar", Subtitle = "O Caminho da Água",
                ImagePath = "/MovieImages/avatar.jpg", BackdropPath = "/MovieImages/avatarbackdrop.jpg", 
                Category = "Aventura" },
            new MovieData { Id = 2, Title = "Star Wars", Subtitle = "Ascenção Skywalker",
            ImagePath = "/MovieImages/starwars.jpg", BackdropPath = "/MovieImages/starwarsbackdrop.jpg", 
            Category = "Aventura"},
            new MovieData { Id = 3, Title = "Star Trek", Subtitle = "Além da Escuridão",
            ImagePath = "/MovieImages/startrek.jpg", BackdropPath = "/MovieImages/startrekbackdrop.jpg", 
                Category = "Ficção"},
            new MovieData { Id = 4, Title = "Mad Max", Subtitle = "Estrada de Fúria",
            ImagePath = "/MovieImages/madmax.jpg", BackdropPath = "/MovieImages/madmaxbackdrop.jpg", 
                Category = "Ação"},
            new MovieData { Id = 5, Title = "John Wick", Subtitle = "Baba Yaga",
            ImagePath = "/MovieImages/johnwick.jpg", BackdropPath = "/MovieImages/johnwickbackdrop.jpg", 
                Category = "Ação"}
        };
        var roomNumbers = new List<string> { "1", "2", "3", "4" };
        var eventTimes = new List<TimeSpan>
        {
            TimeSpan.FromHours(12), // Horário 12:00
            TimeSpan.FromHours(20), // Horário 20:00  
        };

        for (DateTime date = startDate; date <= endDate; date = date.AddDays(1))
        {
            foreach ( var movie in movieData) {
                var movieKey = $"{movie.Id}";

                if (!scheduledTimes.ContainsKey(movieKey))
                {
                    scheduledTimes[movieKey] = new HashSet<DateTime>();
                }
                foreach (var roomNumber in roomNumbers)
            {
                    foreach (var time in eventTimes)
                    {
                        var proposedDateTime = date.Date.Add(time);
                        var roomMovieKey = $"{roomNumber}_{movie.Id}_{proposedDateTime}";

                        // Verifica se o horário proposto já está agendado para esse filme
                        if (!scheduledTimes[movieKey].Contains(proposedDateTime))
                        {
                            var room = new RoomModel
                            {
                                RoomNumber = roomNumber,
                                EventDateTime = date.Date.Add(time), // Use 'date' em vez de 'startDate'
                                MovieTitle = movie.Title,
                                MovieSubtitle = movie.Subtitle,
                                MovieImagePath = movie.ImagePath,
                                MovieBackdropPath = movie.BackdropPath,
                                MovieCategory = movie.Category
                            };

                            var createdRoom = await cinemaService.CreateRoomAsync(room);

                            if (createdRoom != null)
                            {
                                // Registra o horário agendado para essa sala, filme e horário
                                scheduledTimes[movieKey].Add(proposedDateTime);
                                scheduledTimes[roomMovieKey] = new HashSet<DateTime> { proposedDateTime };

                                var seats = new SeatModel
                                {
                                    SeatNumber = new List<string> {
    "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10",
    "A11", "A12", "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08",
    "B09", "B10", "B11", "B12", "B13", "B14", "C01", "C02", "C03", "C04",
    "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12", "C13", "C14",
    "D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09", "D10",
    "D11", "D12", "E01", "E02", "E03", "E04", "E05", "E06", "E07", "E08",
    "E09", "E10", "E11", "E12", "F01", "F02", "F03", "F04", "F05", "F06",
    "F07", "F08", "F09", "F10", "F11", "F12"
},
                                    SeatPrice = 1.0M,
                                    RoomId = createdRoom.Id
                                };

                                await cinemaService.AddSeatAsync(seats);
                            }
                        }
                    }
            }
        }
    }
    }
}
