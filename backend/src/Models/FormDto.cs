using System.ComponentModel.DataAnnotations;

namespace FormAPI.Models;

public class Component
{
    [Required]
    public string? Name { get; set; }
    
    [Required]
    public int? Order { get; set; }
    
    [Required]
    public string? Label { get; set; }
    
    [Required]
    public string? ComponentType { get; set; }
    
    public string? InputType { get; set; }
    
    [Required]
    public bool Required { get; set; }
    
    public int? MinLength { get; set; }
    
    public int? MaxLength { get; set; }
    
    public int? GreaterThan { get; set; }
    
    public int? LessThan { get; set; }
    
    public string[]? RadioChoices { get; set; }
}

public class FormDto
{
    public Guid Id { get; set; }
    
    [Required]
    [EmailAddress]
    public string? User { get; set; }
    
    public string? Organization { get; set; }
    
    [Required]
    public string? Title { get; set; }
    
    public string? Description { get; set; }
    
    [Required]
    public string? Status { get; set; }
    
    public DateTime? Published { get; set; }
    
    public DateTime? Expires { get; set; }
    
    public Component[]? Components { get; set; }
}