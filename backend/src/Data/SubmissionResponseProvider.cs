using FormAPI.Models;

namespace FormAPI.Data;

public static class SubmissionResponseProvider
{
    /// <summary>
    /// Gets the user survey response list 1.
    /// </summary>
    /// <returns>A list of SubmissionResponse objects for the first user survey response.</returns>
    public static List<SubmissionResponse> GetUserSurveyResponseList1()
    {
        return new List<SubmissionResponse>
        {
            new SubmissionResponse
            {
                Name = "age",
                Label = "How old are you?",
                Order = 0,
                Response = "29"
            },
            new SubmissionResponse
            {
                Name = "usage",
                Label = "What will you be using Form Factory for?",
                Order = 1,
                Response = "Participation forms"
            },
            new SubmissionResponse
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Order = 2,
                Response = "4"
            }
        };
    }

    /// <summary>
    /// Gets the user survey response list 2.
    /// </summary>
    /// <returns>A list of SubmissionResponse objects for the second user survey response.</returns>
    public static List<SubmissionResponse> GetUserSurveyResponseList2()
    {
        return new List<SubmissionResponse>
        {
            new SubmissionResponse
            {
                Name = "age",
                Label = "How old are you?",
                Order = 0,
                Response = "35"
            },
            new SubmissionResponse
            {
                Name = "usage",
                Label = "What will you be using Form Factory for?",
                Order = 1,
                Response = "Feedback collection"
            },
            new SubmissionResponse
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Order = 2,
                Response = "5"
            }
        };
    }

    /// <summary>
    /// Gets the user survey response list 3.
    /// </summary>
    /// <returns>A list of SubmissionResponse objects for the third user survey response.</returns>
    public static List<SubmissionResponse> GetUserSurveyResponseList3()
    {
        return new List<SubmissionResponse>
        {
            new SubmissionResponse
            {
                Name = "age",
                Label = "How old are you?",
                Order = 0,
                Response = "42"
            },
            new SubmissionResponse
            {
                Name = "usage",
                Label = "What will you be using Form Factory for?",
                Order = 1,
                Response = "Event registrations"
            },
            new SubmissionResponse
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Order = 2,
                Response = "3"
            }
        };
    }

    /// <summary>
    /// Gets the user survey response list 4.
    /// </summary>
    /// <returns>A list of SubmissionResponse objects for the fourth user survey response.</returns>
    public static List<SubmissionResponse> GetUserSurveyResponseList4()
    {
        return new List<SubmissionResponse>
        {
            new SubmissionResponse
            {
                Name = "age",
                Label = "How old are you?",
                Order = 0,
                Response = "27"
            },
            new SubmissionResponse
            {
                Name = "usage",
                Label = "What will you be using Form Factory for?",
                Order = 1,
                Response = "Survey research"
            },
            new SubmissionResponse
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Order = 2,
                Response = "4"
            }
        };
    }

    /// <summary>
    /// Gets the user survey response list 5.
    /// </summary>
    /// <returns>A list of SubmissionResponse objects for the fifth user survey response.</returns>
    public static List<SubmissionResponse> GetUserSurveyResponseList5()
    {
        return new List<SubmissionResponse>
        {
            new SubmissionResponse
            {
                Name = "age",
                Label = "How old are you?",
                Order = 0,
                Response = "30"
            },
            new SubmissionResponse
            {
                Name = "usage",
                Label = "What will you be using Form Factory for?",
                Order = 1,
                Response = "Customer feedback"
            },
            new SubmissionResponse
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Order = 2,
                Response = "5"
            }
        };
    }
}