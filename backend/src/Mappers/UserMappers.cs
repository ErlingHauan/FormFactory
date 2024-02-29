using FormAPI.Models;

namespace FormAPI.Mappers;

public class UserMappers
{
    public static UserDto EntityToDto(UserEntity user)
    {
        if (user.Email == null || user.Password == null)
            throw new InvalidOperationException("User email or password cannot be null.");

        return new UserDto(user.Id, user.Email, user.Password, user.Organization);
    }
    
    public static void DtoToEntity(UserDto dto, UserEntity e)
    {
        if (dto.Email == null || dto.Password == null)
            throw new InvalidOperationException("User email or password cannot be null.");

        e.Email = dto.Email;
        e.Password = dto.Password;
        e.Organization = dto.Organization;
    }
}