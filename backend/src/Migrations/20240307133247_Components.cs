using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FormAPI.Migrations
{
    /// <inheritdoc />
    public partial class Components : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ComponentEntity_Forms_FormId",
                table: "ComponentEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ComponentEntity",
                table: "ComponentEntity");

            migrationBuilder.DeleteData(
                table: "Forms",
                keyColumn: "Id",
                keyValue: new Guid("c13298d7-76c1-4c86-9846-fb2bba36ebfb"));

            migrationBuilder.RenameTable(
                name: "ComponentEntity",
                newName: "Components");

            migrationBuilder.RenameIndex(
                name: "IX_ComponentEntity_FormId",
                table: "Components",
                newName: "IX_Components_FormId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Components",
                table: "Components",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Forms",
                columns: new[] { "Id", "Description", "Expires", "Organization", "Published", "Status", "Title", "User" },
                values: new object[] { new Guid("45c8f0be-8af0-4bb0-afe3-ade3fe2ea201"), "This form was created as a test.", null, "Org1", null, "draft", "Test Survey", "user1@example.com" });

            migrationBuilder.AddForeignKey(
                name: "FK_Components_Forms_FormId",
                table: "Components",
                column: "FormId",
                principalTable: "Forms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Components_Forms_FormId",
                table: "Components");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Components",
                table: "Components");

            migrationBuilder.DeleteData(
                table: "Forms",
                keyColumn: "Id",
                keyValue: new Guid("45c8f0be-8af0-4bb0-afe3-ade3fe2ea201"));

            migrationBuilder.RenameTable(
                name: "Components",
                newName: "ComponentEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Components_FormId",
                table: "ComponentEntity",
                newName: "IX_ComponentEntity_FormId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ComponentEntity",
                table: "ComponentEntity",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Forms",
                columns: new[] { "Id", "Description", "Expires", "Organization", "Published", "Status", "Title", "User" },
                values: new object[] { new Guid("c13298d7-76c1-4c86-9846-fb2bba36ebfb"), "This form was created as a test.", null, "Org1", null, "draft", "Test Survey", "user1@example.com" });

            migrationBuilder.AddForeignKey(
                name: "FK_ComponentEntity_Forms_FormId",
                table: "ComponentEntity",
                column: "FormId",
                principalTable: "Forms",
                principalColumn: "Id");
        }
    }
}
