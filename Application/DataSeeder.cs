using Domain;

namespace Application;

public static class DataSeeder
{
    public static async System.Threading.Tasks.Task SeedDataAsync(ITaskService taskService)
    {
        // Verificar si ya hay datos
        var existingTasks = await taskService.GetAllTasksAsync();
        if (existingTasks.Any())
        {
            return; // Ya hay datos, no seedear
        }

        // Agregar tareas de ejemplo
        var sampleTasks = new[]
        {
            new Domain.Task { Title = "Complete the code challenge", Completed = false },
            new Domain.Task { Title = "Review neobrutalism design", Completed = false },
            new Domain.Task { Title = "Test the API endpoints", Completed = true },
            new Domain.Task { Title = "Add CORS configuration", Completed = true },
            new Domain.Task { Title = "Deploy to production", Completed = false }
        };

        foreach (var task in sampleTasks)
        {
            await taskService.AddTaskAsync(task);
        }
    }
}
