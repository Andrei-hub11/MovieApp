using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class MIGRATION5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
         

            migrationBuilder.CreateTable(
                name: "GiftCard",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    GiftCodigo = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiftCard", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GiftCard_GiftCodigo",
                table: "GiftCard",
                column: "GiftCodigo",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GiftCard");

            migrationBuilder.CreateTable(
                name: "GiftVoucher",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GiftCodigo = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiftVoucher", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GiftVoucher_GiftCodigo",
                table: "GiftVoucher",
                column: "GiftCodigo",
                unique: true);
        }
    }
}
