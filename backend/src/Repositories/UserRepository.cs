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
    Task<UserEntity> Add(UserEntity user);
    Task<UserEntity> Update(UserEntity updatedEntity);
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
        var userList = await _context.Users.Select(u => new UserEntity(u.Id, u.Email, u.Password, u.Organization))
            .ToListAsync();
        return userList;
    }

    public async Task<UserEntity?> Get(int userId)
    {
        var foundEntity = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);
        if (foundEntity == null)
        {
            Console.WriteLine($"User with ID {userId} was not found.");
            return null;
        }

        return foundEntity;
    }

    public async Task<UserEntity?> ConfirmEmailAndPassword(UserEntity entity)
    {
        UserEntity? result = await _context.Users.FirstOrDefaultAsync(user =>
            user.Email == entity.Email && user.Password == entity.Password);

        if (result == null)
        {
            Console.WriteLine($"Email and password combination was not found.");
            return null;
        }

        return result;
    }

    public async Task<UserEntity> Add(UserEntity user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<UserEntity> Update(UserEntity updatedUser)
    {
        var existingUser = await _context.Users.FindAsync(updatedUser.Id);
        if (existingUser == null)
            throw new ArgumentException($"Did not find existing user with ID {updatedUser.Id}");

        _context.Entry(existingUser).CurrentValues.SetValues(updatedUser);
        await _context.SaveChangesAsync();
        return updatedUser;
    }

    public async Task Delete(int id)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == id);
        if (user == null)
            throw new ArgumentException($"Did not find user {id}.");

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }
}