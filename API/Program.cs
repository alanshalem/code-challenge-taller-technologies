using Application;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ITaskService, InMemoryTaskRepository>();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Seed initial data
try
{
    var taskService = app.Services.GetRequiredService<ITaskService>();
    await DataSeeder.SeedDataAsync(taskService);
}
catch (Exception ex)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during data seeding");
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();
