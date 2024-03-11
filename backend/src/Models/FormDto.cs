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

    public DateTime? Published { get; init; }

    public DateTime? Expires { get; init; }

    public List<FormComponent>? Components { get; init; }
}