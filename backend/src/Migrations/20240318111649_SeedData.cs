using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FormAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
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
                    Expires = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Components = table.Column<string>(type: "json", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Forms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Submissions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    Submitted = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    Responses = table.Column<string>(type: "json", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Submissions", x => x.Id);
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

            migrationBuilder.InsertData(
                table: "Forms",
                columns: new[] { "Id", "Components", "Description", "Expires", "Organization", "Published", "Status", "Title", "User" },
                values: new object[] { new Guid("7cac8df9-ba26-44d4-ac02-a9eb0d67a533"), "[{\"name\":\"question1\",\"order\":0,\"label\":\"Question 1\",\"type\":\"textfield\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":null},{\"name\":\"question2\",\"order\":1,\"label\":\"Question 2\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Yes\",\"No\",\"Maybe\"]}]", "This form was created as a test.", null, "Org1", null, "draft", "Test Survey", "user1@example.com" });

            migrationBuilder.InsertData(
                table: "Submissions",
                columns: new[] { "Id", "FormId", "Responses", "Submitted" },
                values: new object[,]
                {
                    { new Guid("141aedf6-fc17-4151-b2d8-c3223a83a695"), new Guid("00000000-0000-0000-0000-000000000000"), "[{\"order\":0,\"label\":\"Question 1\",\"response\":\"Yes, I agree\"},{\"order\":1,\"label\":\"Question 2\",\"response\":\"No\"}]", new DateTimeOffset(new DateTime(2024, 3, 18, 11, 16, 48, 486, DateTimeKind.Unspecified).AddTicks(2783), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("ca4ef74d-eb5b-47ce-b97a-91528ce86b39"), new Guid("00000000-0000-0000-0000-000000000000"), "[{\"order\":0,\"label\":\"Question 1\",\"response\":\"Yes, I agree\"},{\"order\":1,\"label\":\"Question 2\",\"response\":\"No\"}]", new DateTimeOffset(new DateTime(2024, 3, 18, 11, 16, 48, 486, DateTimeKind.Unspecified).AddTicks(2778), new TimeSpan(0, 0, 0, 0, 0)) }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Organization", "Password" },
                values: new object[,]
                {
                    { 1, "a@a.com", "A.com", "12345678" },
                    { 2, "johnny@testepartementet.no", "Testdepartementet", "johnny123" },
                    { 3, "test@test.com", "", "12345678" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Forms");

            migrationBuilder.DropTable(
                name: "Submissions");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
