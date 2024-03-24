﻿// <auto-generated />
using System;
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
    [Migration("20240321105854_SeedData")]
    partial class SeedData
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("FormAPI.Models.FormEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Components")
                        .HasColumnType("json");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset?>("Expires")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Organization")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset?>("Published")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Status")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<string>("User")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Forms");

                    b.HasData(
                        new
                        {
                            Id = new Guid("11111111-1111-1111-1111-111111111111"),
                            Components = "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"type\":\"textfield\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":8,\"lessThan\":125,\"radioChoices\":null},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"type\":\"textfield\",\"required\":false,\"minLength\":null,\"maxLength\":1000,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":null},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"1\",\"2\",\"3\",\"4\",\"5\"]}]",
                            Description = "We want to get to know you!",
                            Organization = "Org1",
                            Published = new DateTimeOffset(new DateTime(2024, 3, 21, 10, 58, 54, 536, DateTimeKind.Unspecified).AddTicks(1268), new TimeSpan(0, 0, 0, 0, 0)),
                            Status = "Published",
                            Title = "Survey of the users of Form Factory",
                            User = "user1@example.com"
                        },
                        new
                        {
                            Id = new Guid("22222222-2222-2222-2222-222222222222"),
                            Components = "[{\"name\":\"name\",\"order\":0,\"label\":\"Full name: \",\"type\":\"textfield\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":null},{\"name\":\"dinner\",\"order\":1,\"label\":\"Will you be participating in the dinner afterwards?\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Yes\",\"No\"]},{\"name\":\"allergies\",\"order\":2,\"label\":\"Do you have any allergies/dietary restrictions?\",\"type\":\"textfield\",\"required\":false,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":null}]",
                            Description = "Official signup form for participants.",
                            Organization = "Org2",
                            Status = "Draft",
                            Title = "2024 Developer's Conference registration form",
                            User = "user2@example.com"
                        },
                        new
                        {
                            Id = new Guid("33333333-3333-3333-3333-333333333333"),
                            Components = "[{\"name\":\"expectations\",\"order\":0,\"label\":\"On this team, I understand what is expected of me.\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Strongly agree\",\"Agree\",\"Neutral\",\"Disagree\",\"Strongly Disagree\"]},{\"name\":\"ideas\",\"order\":0,\"label\":\"I feel my ideas are valued, and I feel safe in suggesting them.\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Strongly agree\",\"Agree\",\"Neutral\",\"Disagree\",\"Strongly Disagree\"]},{\"name\":\"mistakes\",\"order\":0,\"label\":\"If I make a mistake on this team, it is never held against me\",\"type\":\"radio\",\"required\":true,\"minLength\":null,\"maxLength\":null,\"greaterThan\":null,\"lessThan\":null,\"radioChoices\":[\"Strongly agree\",\"Agree\",\"Neutral\",\"Disagree\",\"Strongly Disagree\"]}]",
                            Description = "Quarterly survey.",
                            Expires = new DateTimeOffset(new DateTime(2024, 4, 4, 10, 58, 54, 536, DateTimeKind.Unspecified).AddTicks(1276), new TimeSpan(0, 0, 0, 0, 0)),
                            Published = new DateTimeOffset(new DateTime(2024, 3, 21, 10, 58, 54, 536, DateTimeKind.Unspecified).AddTicks(1275), new TimeSpan(0, 0, 0, 0, 0)),
                            Status = "Published",
                            Title = "Psychological Safety survey",
                            User = "user3@example.com"
                        });
                });

            modelBuilder.Entity("FormAPI.Models.SubmissionEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("FormId")
                        .HasColumnType("uuid");

                    b.Property<string>("Responses")
                        .HasColumnType("json");

                    b.Property<DateTimeOffset>("Submitted")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Submissions");

                    b.HasData(
                        new
                        {
                            Id = new Guid("f73a93b2-a683-4006-b5f8-5cea1a822cfe"),
                            FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                            Responses = "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"29\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Participation forms\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"4\"}]",
                            Submitted = new DateTimeOffset(new DateTime(2024, 3, 21, 10, 58, 54, 536, DateTimeKind.Unspecified).AddTicks(1374), new TimeSpan(0, 0, 0, 0, 0))
                        },
                        new
                        {
                            Id = new Guid("459b4337-db2f-4540-8497-9b9c2921eae8"),
                            FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                            Responses = "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"35\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Feedback collection\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"5\"}]",
                            Submitted = new DateTimeOffset(new DateTime(2024, 3, 21, 10, 58, 54, 536, DateTimeKind.Unspecified).AddTicks(1377), new TimeSpan(0, 0, 0, 0, 0))
                        },
                        new
                        {
                            Id = new Guid("ed49c4aa-dfa0-4cca-9035-d8f1e54fe255"),
                            FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                            Responses = "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"42\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Event registrations\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"3\"}]",
                            Submitted = new DateTimeOffset(new DateTime(2024, 3, 21, 10, 58, 54, 536, DateTimeKind.Unspecified).AddTicks(1392), new TimeSpan(0, 0, 0, 0, 0))
                        },
                        new
                        {
                            Id = new Guid("9592ec3e-3054-458a-a84c-0bde24b5bd62"),
                            FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                            Responses = "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"27\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Survey research\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"4\"}]",
                            Submitted = new DateTimeOffset(new DateTime(2024, 3, 21, 10, 58, 54, 536, DateTimeKind.Unspecified).AddTicks(1394), new TimeSpan(0, 0, 0, 0, 0))
                        },
                        new
                        {
                            Id = new Guid("b2f98580-659d-47e1-8a57-d404fc28de2b"),
                            FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                            Responses = "[{\"name\":\"age\",\"order\":0,\"label\":\"How old are you?\",\"response\":\"30\"},{\"name\":\"usage\",\"order\":1,\"label\":\"What will you be using Form Factory for?\",\"response\":\"Customer feedback\"},{\"name\":\"rating\",\"order\":2,\"label\":\"From 1-5, how would you rate Form Factory?\",\"response\":\"5\"}]",
                            Submitted = new DateTimeOffset(new DateTime(2024, 3, 21, 10, 58, 54, 536, DateTimeKind.Unspecified).AddTicks(1396), new TimeSpan(0, 0, 0, 0, 0))
                        });
                });

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