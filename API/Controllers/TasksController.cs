using Application;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public async System.Threading.Tasks.Task<ActionResult<List<Domain.Task>>> GetTasks()
    {
        var tasks = await _taskService.GetAllTasksAsync();
        return Ok(tasks);
    }

    [HttpPost]
    public async System.Threading.Tasks.Task<ActionResult<Domain.Task>> AddTask([FromBody] Domain.Task task)
    {
        if (string.IsNullOrWhiteSpace(task.Title))
        {
            return BadRequest("Task title is required.");
        }

        var createdTask = await _taskService.AddTaskAsync(task);
        return CreatedAtAction(nameof(GetTasks), new { id = createdTask.Id }, createdTask);
    }

    [HttpPut("{id}")]
    public async System.Threading.Tasks.Task<ActionResult<Domain.Task>> ToggleTaskStatus(string id)
    {
        var task = await _taskService.ToggleTaskStatusAsync(id);

        if (task == null)
        {
            return NotFound($"Task with id {id} not found.");
        }

        return Ok(task);
    }
}
