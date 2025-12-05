using Domain;

namespace Application;

public interface ITaskService
{
    System.Threading.Tasks.Task<List<Domain.Task>> GetAllTasksAsync();
    System.Threading.Tasks.Task<Domain.Task> AddTaskAsync(Domain.Task task);
    System.Threading.Tasks.Task<Domain.Task?> ToggleTaskStatusAsync(string id);
}
