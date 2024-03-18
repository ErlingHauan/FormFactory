namespace FormAPI.Models;

public class FormEntity
{
    public Guid Id { get; set; }
    public string? User { get; set; }
    public string? Organization { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Status { get; set; }
    public DateTimeOffset? Published { get; set; }
    public DateTimeOffset? Expires { get; set; }
    public List<FormComponent>? Components { get; set; }
}