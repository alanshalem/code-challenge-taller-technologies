using Application;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Dependency Injection: Registramos la implementación concreta del repositorio
// Singleton: Una sola instancia compartida durante toda la vida de la aplicación
builder.Services.AddSingleton<ITaskService, InMemoryTaskRepository>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add CORS
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
// Bloque try-catch para manejar errores durante la inicialización de datos
try
{
    // GetRequiredService<T>() obtiene un servicio del contenedor DI
    // Si el servicio no está registrado, lanza una excepción
    // Aquí obtenemos el TaskService que configuramos como Singleton
    var taskService = app.Services.GetRequiredService<ITaskService>();

    // SeedDataAsync() inserta datos iniciales si el servicio está vacío
    // Este método es static, por lo que lo llamamos directamente desde la clase
    await DataSeeder.SeedDataAsync(taskService);
}
catch (Exception ex)
{
    // Si ocurre algún error durante el seeding, lo capturamos aquí
    // Obtenemos el servicio de logging para registrar el error
    // ILogger<Program> es un logger específico para la clase Program
    var logger = app.Services.GetRequiredService<ILogger<Program>>();

    // LogError() registra el error con nivel de severidad 'Error'
    // Incluye la excepción completa (ex) y un mensaje descriptivo
    logger.LogError(ex, "An error occurred during data seeding");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
