using System.ComponentModel.DataAnnotations;

namespace FormAPI.Models;

public class ComponentEntity
{
    public Guid Id { get; set; }
    public int? Order { get; set; }
    public string? Label { get; set; }
    public string? Type { get; set; }
    public bool Required { get; set; }
    public int? MinLength { get; set; }
    public int? MaxLength { get; set; }
    public int? GreaterThan { get; set; }
    public int? LessThan { get; set; }
    public string[]? RadioChoices { get; set; }
    public FormEntity? Form { get; set; }
}