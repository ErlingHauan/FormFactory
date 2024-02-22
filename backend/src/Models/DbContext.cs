using FormAPI.Migrations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace FormAPI.Models;

public class DbContext : Microsoft.EntityFrameworkCore.DbContext
{
    protected readonly IConfiguration Configuration;

    public DbContext(IConfiguration configuration)
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

