using System.ComponentModel.DataAnnotations;

namespace FormAPI.Models;

public record UserDto
{
    public UserDto(int id, string email, string password, string? organization)
    {
        Id = id;
        Email = email;
        Password = password;
        Organization = organization;
    }

    [Required]
    public int Id { get; init; }

    [Required]
    [EmailAddress]
    public string Email { get; init; }

    [Required]
    [MinLength(8)]
    public string Password { get; init; }

    public string? Organization { get; init; }
}