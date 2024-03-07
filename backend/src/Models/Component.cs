using System.ComponentModel.DataAnnotations;

namespace FormAPI.Models;

public class Component
{
    [Required]
    public string? Id { get; set; }

    [Required]
    public int? Order { get; set; }

    [Required]
    public string? Label { get; set; }

    [Required]
    public string? Type { get; set; }

    [Required]
    public bool Required { get; set; }

    public int? MinLength { get; set; }

    public int? MaxLength { get; set; }

    public int? GreaterThan { get; set; }

    public int? LessThan { get; set; }

    public string[]? RadioChoices { get; set; }
}