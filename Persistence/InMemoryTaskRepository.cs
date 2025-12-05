using Application;
using Domain;

namespace Persistence;

/// <summary>
/// Implementación del repositorio de tareas en memoria.
/// Almacena las tareas en una lista que persiste durante la vida de la aplicación.
/// </summary>
public class InMemoryTaskRepository : ITaskService
{
    private readonly List<Domain.Task> _tasks = new();

    public System.Threading.Tasks.Task<List<Domain.Task>> GetAllTasksAsync()
    {
        return System.Threading.Tasks.Task.FromResult(_tasks.ToList());
    }

    public System.Threading.Tasks.Task<Domain.Task> AddTaskAsync(Domain.Task task)
    {
        task.Id = Guid.NewGuid().ToString();
        _tasks.Add(task);
        return System.Threading.Tasks.Task.FromResult(task);
    }

    public System.Threading.Tasks.Task<Domain.Task?> ToggleTaskStatusAsync(string id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null)
        {
            return System.Threading.Tasks.Task.FromResult<Domain.Task?>(null);
        }

        task.Completed = !task.Completed;
        return System.Threading.Tasks.Task.FromResult<Domain.Task?>(task);
    }
}
