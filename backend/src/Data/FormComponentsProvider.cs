using FormAPI.Models;

namespace FormAPI.Data;

public static class FormComponentsProvider
{
    /// <summary>
    /// Gets the user survey form components.
    /// </summary>
    /// <returns>A list of FormComponent objects for the user survey form.</returns>
    public static List<FormComponent> GetUserSurveyComponents()
    {
        return
        [
            new FormComponent()
            {
                Name = "Age",
                Label = "How old are you?",
                Required = true,
                Order = 0,
                Type = "input",
                InputType = "number",
                GreaterThan = 8,
                LessThan = 125
            },

            new FormComponent()
            {
                Name = "Usage",
                Label = "What will you be using Form Factory for?",
                Required = false,
                Order = 1,
                Type = "input",
                InputType = "string",
                MaxLength = 1000
            },

            new FormComponent()
            {
                Name = "rating",
                Label = "From 1-5, how would you rate Form Factory?",
                Required = true,
                Order = 2,
                Type = "radio",
                RadioChoices = ["1", "2", "3", "4", "5"]
            }
        ];
    }

    /// <summary>
    /// Gets the developer conference form components.
    /// </summary>
    /// <returns>A list of FormComponent objects for the developer conference form.</returns>
    public static List<FormComponent> GetDevConferenceComponents()
    {
        return
        [
            new FormComponent()
            {
                Name = "name",
                Label = "Full name: ",
                Required = true,
                Order = 0,
                Type = "input",
                InputType = "string"
            },

            new FormComponent()
            {
                Name = "dinner",
                Label = "Will you be participating in the dinner afterwards?",
                Required = true,
                Order = 1,
                Type = "radio",
                RadioChoices = ["Yes", "No"]
            },

            new FormComponent()
            {
                Name = "allergies",
                Label = "Do you have any allergies/dietary restrictions?",
                Required = false,
                Order = 2,
                Type = "input",
                InputType = "string"
            }
        ];
    }

    /// <summary>
    /// Gets the psychological safety survey form components.
    /// </summary>
    /// <returns>A list of FormComponent objects for the psychological safety survey form.</returns>
    public static List<FormComponent> GetPsychSafetyComponents()
    {
        return
        [
            new FormComponent()
            {
                Name = "expectations",
                Label = "On this team, I understand what is expected of me.",
                Required = true,
                Order = 0,
                Type = "radio",
                RadioChoices = ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
            },

            new FormComponent()
            {
                Name = "ideas",
                Label = "I feel my ideas are valued, and I feel safe in suggesting them.",
                Required = true,
                Order = 0,
                Type = "radio",
                RadioChoices = ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
            },

            new FormComponent()
            {
                Name = "mistakes",
                Label = "If I make a mistake on this team, it is never held against me",
                Required = true,
                Order = 0,
                Type = "radio",
                RadioChoices = ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
            }
        ];
    }
}