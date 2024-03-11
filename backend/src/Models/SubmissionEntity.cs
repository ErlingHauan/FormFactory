namespace FormAPI.Models;

public class SubmissionEntity
{
    public Guid Id { get; set; }
    public DateTime Submitted { get; set; }
    public List<FormComponent>? Components { get; set; }
}