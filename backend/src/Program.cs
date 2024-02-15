var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(builder =>
    builder
        .WithOrigins("http://localhost:3050", "http://localhost:3030")
        .AllowAnyMethod()
        .AllowAnyHeader()
);

app.UseAuthorization();
app.MapControllers();

app.Run();