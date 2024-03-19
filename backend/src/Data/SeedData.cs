using FormAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FormAPI.Data;

public static class SeedData
{
    public static void SeedUsers(ModelBuilder builder)
    {
        builder.Entity<UserEntity>().HasData(
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
        );
    }

    public static void SeedForms(ModelBuilder builder)
    {
        var userSurveyComponents = FormComponentsProvider.GetUserSurveyComponents();
        var devConferenceComponents = FormComponentsProvider.GetDevConferenceComponents();
        var psychSafetyComponents = FormComponentsProvider.GetPsychSafetyComponents();

        builder.Entity<FormEntity>().HasData(
            new FormEntity
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
            new FormEntity
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
            new FormEntity
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
        );
    }

    public static void SeedSubmissions(ModelBuilder builder)
    {
        var responseList1 = SubmissionResponseProvider.GetUserSurveyResponseList1();
        var responseList2 = SubmissionResponseProvider.GetUserSurveyResponseList2();
        var responseList3 = SubmissionResponseProvider.GetUserSurveyResponseList3();
        var responseList4 = SubmissionResponseProvider.GetUserSurveyResponseList4();
        var responseList5 = SubmissionResponseProvider.GetUserSurveyResponseList5();

        builder.Entity<SubmissionEntity>().HasData(
            new SubmissionEntity
            {
                Id = Guid.NewGuid(),
                FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                Submitted = DateTimeOffset.UtcNow,
                Responses = responseList1
            },
            new SubmissionEntity
            {
                Id = Guid.NewGuid(),
                FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                Submitted = DateTimeOffset.UtcNow,
                Responses = responseList2
            },
            new SubmissionEntity
            {
                Id = Guid.NewGuid(),
                FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                Submitted = DateTimeOffset.UtcNow,
                Responses = responseList3
            },
            new SubmissionEntity
            {
                Id = Guid.NewGuid(),
                FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                Submitted = DateTimeOffset.UtcNow,
                Responses = responseList4
            },
            new SubmissionEntity
            {
                Id = Guid.NewGuid(),
                FormId = new Guid("11111111-1111-1111-1111-111111111111"),
                Submitted = DateTimeOffset.UtcNow,
                Responses = responseList5
            }
        );
    }
}