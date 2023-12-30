using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddOutrasPropriedades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Room",
                newName: "MovieTitle");

            migrationBuilder.RenameColumn(
                name: "Subtitle",
                table: "Room",
                newName: "MovieSubtitle");

            migrationBuilder.AddColumn<string>(
                name: "MovieCategory",
                table: "Room",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MovieCategory",
                table: "Room");

            migrationBuilder.RenameColumn(
                name: "MovieTitle",
                table: "Room",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "MovieSubtitle",
                table: "Room",
                newName: "Subtitle");
        }
    }
}
