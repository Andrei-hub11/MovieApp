using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
using Backend.Context;
using Microsoft.Extensions.Configuration;

namespace Backend.Data;

public class DeleteRecord
{
    public static async Task DeleteRecordAsync (IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        var optionsBuilder = new DbContextOptionsBuilder<AppDBContext>();
        optionsBuilder.UseSqlServer(connectionString);
        using (var context = new AppDBContext(optionsBuilder.Options))
        {
            var allRecords = await context.Room.ToListAsync(); // Carrega todos os registros
            context.Room.RemoveRange(allRecords); // Remove todos os registros
            await context.SaveChangesAsync();

        }
    }
}
