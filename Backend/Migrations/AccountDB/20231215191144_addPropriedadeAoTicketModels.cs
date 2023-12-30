using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations.AuthDB
{
    /// <inheritdoc />
    public partial class addPropriedadeAoTicketModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoomNumber",
                table: "Ticket",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoomNumber",
                table: "Ticket");
        }
    }
}
