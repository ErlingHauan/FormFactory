using System.ComponentModel.DataAnnotations;

namespace FormAPI.Models;

public record SubmissionDto
{
    public Guid Id { get; set; }

    [Required]
    public Guid FormId { get; set; }

    [Required]
    public string? FormCreator { get; set; }

    [Required]
    public DateTimeOffset Submitted { get; set; }

    [Required]
    public List<SubmissionResponse>? Responses { get; set; }
}