using FormAPI.Data;
using FormAPI.Models;
using FormAPI.Mappers;
using Microsoft.EntityFrameworkCore;

namespace FormAPI.Repositories;

public interface IUserRepository
{
    Task<List<UserEntity>> GetAll();
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

    public async Task<List<UserEntity>> GetAll()
    {
        return await _context.Users.Select(u => new UserEntity(u.Id, u.Email, u.Password, u.Organization)).ToListAsync();
    }

    public async Task<UserDto?> Get(int userId)
    {
        var entity = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);
        if (entity == null)
        {
            Console.WriteLine($"User with ID {userId} was not found.");
            return null;
        }

        return UserMappers.EntityToDto(entity);
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

        return UserMappers.EntityToDto(entity);
    }

    public async Task<UserDto> Add(UserDto dto)
    {
        var entity = new UserEntity();
        UserMappers.DtoToEntity(dto, entity);
        _context.Users.Add(entity);
        await _context.SaveChangesAsync();
        return UserMappers.EntityToDto(entity);
    }

    public async Task<UserDto> Update(UserDto dto)
    {
        var entity = await _context.Users.FindAsync(dto.Id);
        if (entity == null)
            throw new ArgumentException($"Error updating user {dto.Email} with ID {dto.Id}");
        UserMappers.DtoToEntity(dto, entity);
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return UserMappers.EntityToDto(entity);
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