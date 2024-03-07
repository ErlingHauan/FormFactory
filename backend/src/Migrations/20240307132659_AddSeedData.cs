using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FormAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Forms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    User = table.Column<string>(type: "text", nullable: true),
                    Organization = table.Column<string>(type: "text", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: true),
                    Published = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Expires = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Forms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: true),
                    Organization = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ComponentEntity",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    Label = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Required = table.Column<bool>(type: "boolean", nullable: false),
                    MinLength = table.Column<int>(type: "integer", nullable: true),
                    MaxLength = table.Column<int>(type: "integer", nullable: true),
                    GreaterThan = table.Column<int>(type: "integer", nullable: true),
                    LessThan = table.Column<int>(type: "integer", nullable: true),
                    RadioChoices = table.Column<string[]>(type: "text[]", nullable: true),
                    FormId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComponentEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ComponentEntity_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Forms",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Forms",
                columns: new[] { "Id", "Description", "Expires", "Organization", "Published", "Status", "Title", "User" },
                values: new object[] { new Guid("c13298d7-76c1-4c86-9846-fb2bba36ebfb"), "This form was created as a test.", null, "Org1", null, "draft", "Test Survey", "user1@example.com" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Organization", "Password" },
                values: new object[,]
                {
                    { 1, "a@a.com", "A.com", "12345678" },
                    { 2, "johnny@testepartementet.no", "Testdepartementet", "johnny123" },
                    { 3, "test@test.com", "", "12345678" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ComponentEntity_FormId",
                table: "ComponentEntity",
                column: "FormId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ComponentEntity");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Forms");
        }
    }
}
