namespace FormAPI.Models;

public class UserEntity
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string? Organization { get; set; }
}