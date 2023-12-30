using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class MIGRATION6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GiftCard_GiftCodigo",
                table: "GiftCard");

            migrationBuilder.AlterColumn<Guid>(
                name: "GiftCodigo",
                table: "GiftCard",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldMaxLength: 36);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "GiftCodigo",
                table: "GiftCard",
                type: "uniqueidentifier",
                maxLength: 36,
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldDefaultValueSql: "NEWID()");

            migrationBuilder.CreateIndex(
                name: "IX_GiftCard_GiftCodigo",
                table: "GiftCard",
                column: "GiftCodigo",
                unique: true);
        }
    }
}
