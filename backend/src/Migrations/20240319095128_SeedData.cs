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
                    { new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"type\":\"textfield\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":8,\"lessThan\":125,\"radioChoices\":null},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"type\":\"textfield\",\"required\":false,\"minLength\":null,\"maxLength\":1000,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":null},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"1\",\"2\",\"3\",\"4\",\"5\"]}]", "We want to get to know you!", null, "Org1", new DateTimeOffset(new DateTime(2024, 3, 19, 9, 51, 28, 44, DateTimeKind.Unspecified).AddTicks(6825), new TimeSpan(0, 0, 0, 0, 0)), "Published", "Survey of the users of Form Factory", "user1@example.com" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), "[{\"name\":\"name\",\"order\":0,\"label\":\"Full name: \",\"type\":\"textfield\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":null},{\"name\":\"dinner\",\"order\":1,\"label\":\"Will you be participating in the dinner afterwards?\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Yes\",\"No\"]},{\"name\":\"allergies\",\"order\":2,\"label\":\"Do you have any allergies/dietary restrictions?\",\"type\":\"textfield\",\"required\":false,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":null}]", "Official signup form for participants.", null, "Org2", null, "Draft", "2024 Developer's Conference registration form", "user2@example.com" },
                    { new Guid("33333333-3333-3333-3333-333333333333"), "[{\"name\":\"expectations\",\"order\":0,\"label\":\"On this team, I understand what is expected of me.\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Strongly agree\",\"Agree\",\"Neutral\",\"Disagree\",\"Strongly Disagree\"]},{\"name\":\"ideas\",\"order\":0,\"label\":\"I feel my ideas are valued, and I feel safe in suggesting them.\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Strongly agree\",\"Agree\",\"Neutral\",\"Disagree\",\"Strongly Disagree\"]},{\"name\":\"mistakes\",\"order\":0,\"label\":\"If I make a mistake on this team, it is never held against me\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Strongly agree\",\"Agree\",\"Neutral\",\"Disagree\",\"Strongly Disagree\"]}]", "Quarterly survey.", new DateTimeOffset(new DateTime(2024, 4, 2, 9, 51, 28, 44, DateTimeKind.Unspecified).AddTicks(6833), new TimeSpan(0, 0, 0, 0, 0)), null, new DateTimeOffset(new DateTime(2024, 3, 19, 9, 51, 28, 44, DateTimeKind.Unspecified).AddTicks(6832), new TimeSpan(0, 0, 0, 0, 0)), "Published", "Psychological Safety survey", "user3@example.com" }
                });

            migrationBuilder.InsertData(
                table: "Submissions",
                columns: new[] { "Id", "FormId", "Responses", "Submitted" },
                values: new object[,]
                {
                    { new Guid("134ffac0-d85e-4d9d-8b4c-51c91353981b"), new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"27\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Survey research\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"4\"}]", new DateTimeOffset(new DateTime(2024, 3, 19, 9, 51, 28, 44, DateTimeKind.Unspecified).AddTicks(6975), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("47a11d8d-e2b1-427a-a240-b33243338100"), new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"30\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Customer feedback\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"5\"}]", new DateTimeOffset(new DateTime(2024, 3, 19, 9, 51, 28, 44, DateTimeKind.Unspecified).AddTicks(6977), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("7b60431b-9ff6-45bf-b7ed-a1fc30d39bf0"), new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"42\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Event registrations\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"3\"}]", new DateTimeOffset(new DateTime(2024, 3, 19, 9, 51, 28, 44, DateTimeKind.Unspecified).AddTicks(6973), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("85cf32b8-d7b4-42fb-a360-2b5ec9b1be26"), new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"29\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Participation forms\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"4\"}]", new DateTimeOffset(new DateTime(2024, 3, 19, 9, 51, 28, 44, DateTimeKind.Unspecified).AddTicks(6967), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("b597af83-5aa5-48e2-ab04-e368507c245b"), new Guid("11111111-1111-1111-1111-111111111111"), "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"35\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Feedback collection\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"5\"}]", new DateTimeOffset(new DateTime(2024, 3, 19, 9, 51, 28, 44, DateTimeKind.Unspecified).AddTicks(6970), new TimeSpan(0, 0, 0, 0, 0)) }
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
