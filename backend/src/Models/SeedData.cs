using Microsoft.EntityFrameworkCore;

namespace FormAPI.Models;

public static class SeedData
{
    public static void Seed(ModelBuilder builder)
    {
        builder.Entity<UserEntity>().HasData(new List<UserEntity>
        {
            new UserEntity
            {
                Email = "a@a.com",
                Password = "12345678",
                Organization = "A.com"
            },
            new UserEntity
            {
                Email = "johnny@testepartementet.no",
                Password = "johnny123",
                Organization = "Testdepartementet"
            },
            new UserEntity
            {
                Email = "test@test.com",
                Password = "12345678",
                Organization = ""
            }
        });
    }
}