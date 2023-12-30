using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations.AuthDB
{
    /// <inheritdoc />
    public partial class AddUpdatedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.Sql(
@"CREATE TRIGGER [dbo].[Ticket_UPDATE] ON [dbo].[Ticket]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF ((SELECT TRIGGER_NESTLEVEL()) > 1) RETURN;

   DECLARE @Id uniqueidentifier

    SELECT @Id = INSERTED.Id
    FROM INSERTED

    UPDATE dbo.Ticket
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
