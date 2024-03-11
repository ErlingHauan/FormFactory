using System.Text.Json;
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
        builder.Entity<FormEntity>(entity =>
        {
            entity.Property(e => e.Components)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, new JsonSerializerOptions(JsonSerializerDefaults.Web)),
                    v => JsonSerializer.Deserialize<List<Component>>(v, new JsonSerializerOptions(JsonSerializerDefaults.Web)))
                .HasColumnType("json");
        });

        SeedData.Seed(builder);
    }

    public DbSet<UserEntity> Users => Set<UserEntity>();
    public DbSet<FormEntity> Forms => Set<FormEntity>();
    public DbSet<SubmissionEntity> Submissions => Set<SubmissionEntity>();
}