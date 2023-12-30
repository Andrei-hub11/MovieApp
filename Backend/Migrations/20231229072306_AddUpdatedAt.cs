using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUpdatedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE TRIGGER [dbo].[Room_UPDATE] ON [dbo].[Room]
        AFTER UPDATE
        AS
        BEGIN
            SET NOCOUNT ON;

            IF ((SELECT TRIGGER_NESTLEVEL()) > 1) RETURN;

            DECLARE @Id uniqueidentifier

            SELECT @Id = INSERTED.Id
            FROM INSERTED

            UPDATE dbo.Room
            SET UpdatedAt = GETDATE()
            WHERE Id = @Id
        END");

            migrationBuilder.Sql(
                @"CREATE TRIGGER [dbo].[GiftCard_UPDATE] ON [dbo].[GiftCard]
        AFTER UPDATE
        AS
        BEGIN
            SET NOCOUNT ON;

            IF ((SELECT TRIGGER_NESTLEVEL()) > 1) RETURN;

            DECLARE @Id uniqueidentifier

            SELECT @Id = INSERTED.Id
            FROM INSERTED

            UPDATE dbo.GiftCard
            SET UpdatedAt = GETDATE()
            WHERE Id = @Id
        END");
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
