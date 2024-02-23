using Microsoft.EntityFrameworkCore;

namespace FormAPI.Models;

public interface IUserRepository
{
    Task<List<UserDto>> GetAll();
    Task<UserDto?> Get(int id);
    Task<UserDto?> GetAndAuthenticate(UserDto dto);
    Task<UserDto> Add(UserDto dto);
    Task<UserDto> Update(UserDto dto);
    Task Delete(int id);
}

public class UserRepository : IUserRepository
{
    private readonly ApiDbContext _context;

    public UserRepository(ApiDbContext context)
    {
        this._context = context;
    }

    private static UserDto EntityToDto(UserEntity user)
    {
        return new UserDto(user.Id, user.Email, user.Password, user.Organization);
    }

    private static void DtoToEntity(UserDto dto, UserEntity e)
    {
        e.Email = dto.Email;
        e.Password = dto.Password;
        e.Organization = dto.Organization;
    }

    public async Task<List<UserDto>> GetAll()
    {
        return await _context.Users.Select(u => new UserDto(u.Id, u.Email, u.Password, u.Organization)).ToListAsync();
    }

    public async Task<UserDto?> Get(int userId)
    {
        var entity = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);
        if (entity == null)
        {
            Console.WriteLine($"User with ID {userId} was not found.");
            return null;
        }

        return EntityToDto(entity);
    }

    public async Task<UserDto?> GetAndAuthenticate(UserDto dto)
    {
        var entity = await _context.Users.FirstOrDefaultAsync(user =>
            user.Email == dto.Email && user.Password == dto.Password);

        if (entity == null)
        {
            Console.WriteLine($"User {dto.Email}, or the users password was not found.");
            return null;
        }

        return EntityToDto(entity);
    }

    public async Task<UserDto> Add(UserDto dto)
    {
        var entity = new UserEntity();
        DtoToEntity(dto, entity);
        _context.Users.Add(entity);
        await _context.SaveChangesAsync();
        return EntityToDto(entity);
    }

    public async Task<UserDto> Update(UserDto dto)
    {
        var entity = await _context.Users.FindAsync(dto.Id);
        if (entity == null)
            throw new ArgumentException($"Error updating user {dto.Email} with ID {dto.Id}");
        DtoToEntity(dto, entity);
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return EntityToDto(entity);
    }

    public async Task Delete(int id)
    {
        var entity = await _context.Users.SingleOrDefaultAsync(u => u.Id == id);
        if (entity == null)
            throw new ArgumentException($"Error deleting user {id}");
        _context.Users.Remove(entity);
        await _context.SaveChangesAsync();
    }
}