namespace FormAPI.Data;

public record UserDto(int Id, string Email, string Password, string? Organization);