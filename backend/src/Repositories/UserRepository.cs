using FormAPI.Data;
using FormAPI.Models;
using FormAPI.Mappers;
using Microsoft.EntityFrameworkCore;

namespace FormAPI.Repositories;

public interface IUserRepository
{
    Task<List<UserEntity>> GetAll();
    Task<UserEntity?> Get(int id);
    Task<UserEntity?> ConfirmEmailAndPassword(UserEntity entity);
    Task<UserEntity> Add(UserEntity entity);
    Task<UserEntity> Update(UserEntity entity);
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

    public async Task<UserEntity?> Get(int userId)
    {
        var entity = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);
        if (entity == null)
        {
            Console.WriteLine($"User with ID {userId} was not found.");
            return null;
        }

        return entity;
    }

    public async Task<UserEntity?> ConfirmEmailAndPassword(UserEntity entity)
    {
        var entityResult = await _context.Users.FirstOrDefaultAsync(user =>
            user.Email == entity.Email && user.Password == entity.Password);

        if (entityResult == null)
        {
            Console.WriteLine($"Email and password combination was not found.");
            return null;
        }

        return entityResult;
    }

    public async Task<UserEntity> Add(UserEntity entity)
    {
        _context.Users.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<UserEntity> Update(UserEntity entity)
    {
        var foundEntity = await _context.Users.FindAsync(entity.Id);
        if (foundEntity == null)
            throw new ArgumentException($"Did not find user with ID {entity.Id}");

        _context.Entry(foundEntity).CurrentValues.SetValues(entity);
        await _context.SaveChangesAsync();
        return entity;
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