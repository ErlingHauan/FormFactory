namespace FormAPI.Models;

public class SubmissionEntity
{
    public Guid Id { get; set; }
    public Guid FormId { get; set; }

    public string? FormCreator { get; set; }
    public DateTimeOffset Submitted { get; set; }
    public List<SubmissionResponse>? Responses { get; set; }
}