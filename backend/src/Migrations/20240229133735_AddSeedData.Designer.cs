﻿// <auto-generated />
using FormAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FormAPI.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    [Migration("20240229133735_AddSeedData")]
    partial class AddSeedData
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("FormAPI.Models.UserEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Organization")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "a@a.com",
                            Organization = "A.com",
                            Password = "12345678"
                        },
                        new
                        {
                            Id = 2,
                            Email = "johnny@testepartementet.no",
                            Organization = "Testdepartementet",
                            Password = "johnny123"
                        },
                        new
                        {
                            Id = 3,
                            Email = "test@test.com",
                            Organization = "",
                            Password = "12345678"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
