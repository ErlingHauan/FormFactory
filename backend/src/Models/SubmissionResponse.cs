using System.ComponentModel.DataAnnotations;

namespace FormAPI.Models;

public class SubmissionResponse
{
    [Required]
    public string? Name { get; set; }

    [Required]
    public int Order { get; set; }

    [Required]
    public string? Label { get; set; }

    [Required]
    public string? Response { get; set; }
}