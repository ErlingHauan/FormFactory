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
                    Published = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    Expires = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
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
                    FormCreator = table.Column<string>(type: "text", nullable: true),
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
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"type\":\"textfield\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":8,\"lessThan\":125,\"radioChoices\":null},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"type\":\"textfield\",\"required\":false,\"minLength\":null,\"maxLength\":1000,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":null},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"1\",\"2\",\"3\",\"4\",\"5\"]}]", "We want to get to know you!", null, "Org1", new DateTimeOffset(new DateTime(2024, 4, 12, 8, 59, 31, 97, DateTimeKind.Unspecified).AddTicks(6884), new TimeSpan(0, 0, 0, 0, 0)), "Published", "Survey of the users of Form Factory", "user1@example.com" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), "[{\"name\":\"name\",\"order\":0,\"label\":\"Full name: \",\"type\":\"textfield\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":null},{\"name\":\"dinner\",\"order\":1,\"label\":\"Will you be participating in the dinner afterwards?\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Yes\",\"No\"]},{\"name\":\"allergies\",\"order\":2,\"label\":\"Do you have any allergies/dietary restrictions?\",\"type\":\"textfield\",\"required\":false,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":null}]", "Official signup form for participants.", null, "Org1", null, "Draft", "2024 Developer's Conference registration form", "user1@example.com" },
                    { new Guid("33333333-3333-3333-3333-333333333333"), "[{\"name\":\"expectations\",\"order\":0,\"label\":\"On this team, I understand what is expected of me.\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Strongly agree\",\"Agree\",\"Neutral\",\"Disagree\",\"Strongly Disagree\"]},{\"name\":\"ideas\",\"order\":0,\"label\":\"I feel my ideas are valued, and I feel safe in suggesting them.\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Strongly agree\",\"Agree\",\"Neutral\",\"Disagree\",\"Strongly Disagree\"]},{\"name\":\"mistakes\",\"order\":0,\"label\":\"If I make a mistake on this team, it is never held against me\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Strongly agree\",\"Agree\",\"Neutral\",\"Disagree\",\"Strongly Disagree\"]}]", "Quarterly survey.", new DateTimeOffset(new DateTime(2024, 4, 26, 8, 59, 31, 97, DateTimeKind.Unspecified).AddTicks(6891), new TimeSpan(0, 0, 0, 0, 0)), "Org1", new DateTimeOffset(new DateTime(2024, 4, 12, 8, 59, 31, 97, DateTimeKind.Unspecified).AddTicks(6891), new TimeSpan(0, 0, 0, 0, 0)), "Published", "Psychological Safety survey", "user1@example.com" }
                });

            migrationBuilder.InsertData(
                table: "Submissions",
                columns: new[] { "Id", "FormCreator", "FormId", "Responses", "Submitted" },
                values: new object[,]
                {
                    { new Guid("0aee04be-f687-44b1-9435-4dd766c0f6cf"), "user1@example.com", new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"27\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Survey research\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"4\"}]", new DateTimeOffset(new DateTime(2024, 4, 12, 8, 59, 31, 97, DateTimeKind.Unspecified).AddTicks(7018), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("3d57c969-66ee-48b7-96a7-6404c7db3b2d"), "user1@example.com", new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"29\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Participation forms\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"4\"}]", new DateTimeOffset(new DateTime(2024, 4, 12, 8, 59, 31, 97, DateTimeKind.Unspecified).AddTicks(7011), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("5cbaf758-9d03-4a4b-aa7e-905c6f6b3541"), "user1@example.com", new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"35\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Feedback collection\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"5\"}]", new DateTimeOffset(new DateTime(2024, 4, 12, 8, 59, 31, 97, DateTimeKind.Unspecified).AddTicks(7014), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("6a1c2194-a453-459e-b626-a0766af626e1"), "user1@example.com", new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"42\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Event registrations\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"3\"}]", new DateTimeOffset(new DateTime(2024, 4, 12, 8, 59, 31, 97, DateTimeKind.Unspecified).AddTicks(7016), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("c1854140-e9d1-4207-a345-21cd48748914"), "user1@example.com", new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"30\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Customer feedback\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"5\"}]", new DateTimeOffset(new DateTime(2024, 4, 12, 8, 59, 31, 97, DateTimeKind.Unspecified).AddTicks(7021), new TimeSpan(0, 0, 0, 0, 0)) }
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
