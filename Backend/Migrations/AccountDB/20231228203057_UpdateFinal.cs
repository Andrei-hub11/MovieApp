using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations.AuthDB
{
    /// <inheritdoc />
    public partial class UpdateFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Ticket",
                newName: "MovieTitle");

            migrationBuilder.RenameColumn(
                name: "Subtitle",
                table: "Ticket",
                newName: "MovieSubtitle");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Ticket",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MovieTitle",
                table: "Ticket",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "MovieSubtitle",
                table: "Ticket",
                newName: "Subtitle");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Ticket",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldDefaultValueSql: "NEWID()");
        }
    }
}
