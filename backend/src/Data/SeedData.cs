using FormAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FormAPI.Data;

public static class SeedData
{
    public static void Seed(ModelBuilder builder)
    {
        builder.Entity<UserEntity>().HasData(new List<UserEntity>
        {
            new()
            {
                Id = 1,
                Email = "a@a.com",
                Password = "12345678",
                Organization = "A.com"
            },

            new()
            {
                Id = 2,
                Email = "johnny@testepartementet.no",
                Password = "johnny123",
                Organization = "Testdepartementet"
            },

            new()
            {
                Id = 3,
                Email = "test@test.com",
                Password = "12345678",
                Organization = ""
            }
        });

        var userSurveyComponents = new List<FormComponent>
        {
            new()
            {
                Name = "age",
                Label = "How old are you?",
                Required = true,
                Order = 0,
                Type = "textfield",
                GreaterThan = 8,
                LessThan = 125
            },

            new()
            {
                Name = "usage",
                Label = "What will you be using Form Factory for?",
                Required = false,
                Order = 1,
                Type = "textfield",
                MaxLength = 1000,
            },

            new()
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Required = true,
                Order = 2,
                Type = "radio",
                RadioChoices = ["1", "2", "3", "4", "5"],
            },
        };

        var devConferenceComponents = new List<FormComponent>
        {
            new()
            {
                Name = "name",
                Label = "Full name: ",
                Required = true,
                Order = 0,
                Type = "textfield",
            },

            new()
            {
                Name = "dinner",
                Label = "Will you be participating in the dinner afterwards?",
                Required = true,
                Order = 1,
                Type = "radio",
                RadioChoices = ["Yes", "no"],
            },

            new()
            {
                Name = "allergies",
                Label = "Do you have any allergies/dietary restrictions?",
                Required = false,
                Order = 2,
                Type = "textfield",
            },
        };

        var psychSafetyComponents = new List<FormComponent>
        {
            new()
            {
                Name = "expectations",
                Label = "On this team, I understand what is expected of me.",
                Required = true,
                Order = 0,
                Type = "radio",
                RadioChoices = ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
            },

            new()
            {
                Name = "ideas",
                Label = "I feel my ideas are valued, and I feel safe in suggesting them.",
                Required = true,
                Order = 0,
                Type = "radio",
                RadioChoices = ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
            },

            new()
            {
                Name = "mistakes",
                Label = "If I make a mistake on this team, it is never held against me",
                Required = true,
                Order = 0,
                Type = "radio",
                RadioChoices = ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
            },
        };

        builder.Entity<FormEntity>().HasData(new List<FormEntity>
        {
            new()
            {
                Id = new Guid("11111111-1111-1111-1111-111111111111"),
                User = "user1@example.com",
                Organization = "Org1",
                Title = "Survey of the users of Form Factory",
                Description = "We want to get to know you!",
                Status = "Published",
                Published = DateTimeOffset.UtcNow,
                Expires = null,
                Components = userSurveyComponents
            },

            new()
            {
                Id = new Guid("22222222-2222-2222-2222-222222222222"),
                User = "user2@example.com",
                Organization = "Org2",
                Title = "2024 Developer's Conference registration form",
                Description = "Official signup form for participants.",
                Status = "Draft",
                Published = null,
                Expires = null,
                Components = devConferenceComponents
            },

            new()
            {
                Id = new Guid("33333333-3333-3333-3333-333333333333"),
                User = "user3@example.com",
                Organization = null,
                Title = "Psychological Safety survey",
                Description = "Quarterly survey.",
                Status = "Published",
                Published = DateTimeOffset.UtcNow,
                Expires = DateTimeOffset.UtcNow.AddDays(14),
                Components = psychSafetyComponents
            }
        });

        var responseList1 = new List<SubmissionResponse>
        {
            new()
            {
                Name = "age",
                Label = "How old are you?",
                Order = 0,
                Response = "29"
            },

            new()
            {
                Name = "usage",
                Label = "What will you be using Form Factory for?",
                Order = 1,
                Response = "Participation forms"
            },

            new()
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Order = 2,
                Response = "4"
            }
        };

        var responseList2 = new List<SubmissionResponse>
        {
            new()
            {
                Name = "age",
                Label = "How old are you?",
                Order = 0,
                Response = "35"
            },

            new()
            {
                Name = "usage",
                Label = "What will you be using Form Factory for?",
                Order = 1,
                Response = "Feedback collection"
            },

            new()
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Order = 2,
                Response = "5"
            }
        };

        var responseList3 = new List<SubmissionResponse>
        {
            new()
            {
                Name = "age",
                Label = "How old are you?",
                Order = 0,
                Response = "42"
            },

            new()
            {
                Name = "usage",
                Label = "What will you be using Form Factory for?",
                Order = 1,
                Response = "Event registrations"
            },

            new()
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Order = 2,
                Response = "3"
            }
        };

        var responseList4 = new List<SubmissionResponse>
        {
            new()
            {
                Name = "age",
                Label = "How old are you?",
                Order = 0,
                Response = "27"
            },

            new()
            {
                Name = "usage",
                Label = "What will you be using Form Factory for?",
                Order = 1,
                Response = "Survey research"
            },

            new()
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Order = 2,
                Response = "4"
            }
        };

        var responseList5 = new List<SubmissionResponse>
        {
            new()
            {
                Name = "age",
                Label = "How old are you?",
                Order = 0,
                Response = "30"
            },

            new()
            {
                Name = "usage",
                Label = "What will you be using Form Factory for?",
                Order = 1,
                Response = "Customer feedback"
            },

            new()
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Order = 2,
                Response = "5"
            }
        };

        builder.Entity<SubmissionEntity>().HasData(new List<SubmissionEntity>
        {
            new()
            {
                Id = Guid.NewGuid(),
                FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                Submitted = DateTimeOffset.UtcNow,
                Responses = responseList1
            },

            new()
            {
                Id = Guid.NewGuid(),
                FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                Submitted = DateTimeOffset.UtcNow,
                Responses = responseList2
            },

            new()
            {
                Id = Guid.NewGuid(),
                FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                Submitted = DateTimeOffset.UtcNow,
                Responses = responseList3
            },

            new()
            {
                Id = Guid.NewGuid(),
                FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                Submitted = DateTimeOffset.UtcNow,
                Responses = responseList4
            },

            new()
            {
                Id = Guid.NewGuid(),
                FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                Submitted = DateTimeOffset.UtcNow,
                Responses = responseList5
            },
        });
    }
}