namespace FormAPI.Models;

public class UserEntity
{
    public int Id { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? Organization { get; set; }

    public UserEntity()
    { }

    public UserEntity(int id, string? email, string? password, string? organization)
    {
        Id = id;
        Email = email;
        Password = password;
        Organization = organization;
    }
}