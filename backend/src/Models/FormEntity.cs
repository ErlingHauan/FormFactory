namespace FormAPI.Models;

public class FormEntity
{
    public Guid Id { get; set; }
    public string? User { get; set; }
    public string? Organization { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Status { get; set; }
    public DateTime? Published { get; set; }
    public DateTime? Expires { get; set; }
    public Component[]? Components { get; set; }
}