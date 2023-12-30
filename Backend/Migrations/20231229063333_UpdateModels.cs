using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations;

/// <inheritdoc />
public partial class UpdateModels : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<DateTime>(
            name: "CreatedAt",
            table: "Room",
            type: "datetime2",
            nullable: false,
            defaultValueSql: "GETDATE()");

        migrationBuilder.AddColumn<DateTime>(
            name: "UpdatedAt",
            table: "Room",
            type: "datetime2",
            nullable: false,
            defaultValueSql: "GETDATE()");

        migrationBuilder.AddColumn<DateTime>(
            name: "CreatedAt",
            table: "GiftCard",
            type: "datetime2",
            nullable: false,
            defaultValueSql: "GETDATE()");

        migrationBuilder.AddColumn<DateTime>(
            name: "UpdatedAt",
            table: "GiftCard",
            type: "datetime2",
            nullable: false,
            defaultValueSql: "GETDATE()");

}

/// <inheritdoc />
protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "CreatedAt",
            table: "Room");

        migrationBuilder.DropColumn(
            name: "UpdatedAt",
            table: "Room");

        migrationBuilder.DropColumn(
            name: "CreatedAt",
            table: "GiftCard");

        migrationBuilder.DropColumn(
            name: "UpdatedAt",
            table: "GiftCard");
    }
}
