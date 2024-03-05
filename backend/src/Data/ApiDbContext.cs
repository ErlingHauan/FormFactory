using FormAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FormAPI.Data;

public class ApiDbContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public ApiDbContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseNpgsql(Configuration.GetConnectionString("FormFactoryDb"));
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        SeedData.Seed(builder);
    }

    public DbSet<UserEntity> Users => Set<UserEntity>();
}