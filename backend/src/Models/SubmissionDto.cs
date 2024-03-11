using System.ComponentModel.DataAnnotations;

namespace FormAPI.Models;

public record SubmissionDto
{
    public Guid Id { get; set; }
    
    [Required]
    public DateTime Submitted { get; set; }
    
    [Required]
    public List<SubmissionResponse>? Responses { get; set; }
}