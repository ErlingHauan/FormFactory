using FormAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FormAPI.Data;

public static class SeedData
{
    public static void Seed(ModelBuilder builder)
    {
        builder.Entity<UserEntity>().HasData(new List<UserEntity>
        {
            new UserEntity
            {
                Id = 1,
                Email = "a@a.com",
                Password = "12345678",
                Organization = "A.com"
            },
            new UserEntity
            {
                Id = 2,
                Email = "johnny@testepartementet.no",
                Password = "johnny123",
                Organization = "Testdepartementet"
            },
            new UserEntity
            {
                Id = 3,
                Email = "test@test.com",
                Password = "12345678",
                Organization = ""
            }
        });

        var componentList = new List<FormComponent>
        {
            new FormComponent()
            {
                Name = "question1",
                Label = "Question 1",
                Required = true,
                Order = 0,
                Type = "textfield",
                Response = "Yes"
            },

            new FormComponent()
            {
                Name = "question2",
                Label = "Question 2",
                Required = true,
                Order = 1,
                Type = "radio",
                RadioChoices = ["Yes", "No", "Maybe"],
                Response = "No"
            }
        };

        builder.Entity<FormEntity>().HasData(new List<FormEntity>
        {
            new FormEntity()
            {
                Id = Guid.NewGuid(),
                User = "user1@example.com",
                Organization = "Org1",
                Title = "Test Survey",
                Description = "This form was created as a test.",
                Status = "draft",
                Published = null,
                Expires = null,
                Components = componentList
            }
        });

        builder.Entity<SubmissionEntity>().HasData(new List<SubmissionEntity>
        {
            new SubmissionEntity()
            {
                Id = Guid.NewGuid(),
                Submitted = new DateTime(),
                Components = componentList
            },
            
            new SubmissionEntity()
            {
                Id = Guid.NewGuid(),
                Submitted = new DateTime(),
                Components = componentList
            }
        });
    }
}