using System.ComponentModel.DataAnnotations;

namespace FormAPI.Models;

public record FormDto
{
    public Guid Id { get; init; }

    [Required]
    [EmailAddress]
    public string? User { get; init; }

    public string? Organization { get; init; }

    [Required]
    public string? Title { get; init; }

    public string? Description { get; init; }

    [Required]
    public string? Status { get; init; }

    public DateTimeOffset? Published { get; init; }

    public DateTimeOffset? Expires { get; init; }

    public List<FormComponent>? Components { get; init; }
}