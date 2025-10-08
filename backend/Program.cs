using Microsoft.EntityFrameworkCore;

const string corsPolicyName = "AllowSpecificOrigin";

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: corsPolicyName,
            policy =>
            {
                policy.WithOrigins("http://192.168.4.24:3001")
        .AllowAnyHeader()
    .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            });
    });
builder.Services.AddDbContext<TodoDb>(
        opt => opt.UseInMemoryDatabase("TodoList")
    );
var app = builder.Build();

app.UseCors(corsPolicyName);

var todoitems = app.MapGroup("/todoitems").RequireCors(corsPolicyName);

todoitems.MapGet("", GetAllTodos);
todoitems.MapGet("/complete", GetCompletedTodos);
todoitems.MapGet("/{id}", GetTodoFromId);
todoitems.MapPost("", PostTodo);
todoitems.MapPut("/{id}", UpdateTodo);
todoitems.MapDelete("/{id}", DeleteTodo).RequireCors(corsPolicyName);

static async Task<IResult> GetAllTodos(TodoDb db)
{
    var todos = await db.Todos.ToListAsync();
    return TypedResults.Ok(todos);
}

static async Task<IResult> GetCompletedTodos(TodoDb db)
{
    var todos = await db.Todos.Where(t => t.IsComplete).ToListAsync();
    return TypedResults.Ok(todos);
}

static async Task<IResult> GetTodoFromId(int id, TodoDb db)
{
    var todo = await db.Todos.FindAsync(id);
    if (todo == null) return TypedResults.NotFound();
    return TypedResults.Ok(todo);
}

static async Task<IResult> PostTodo(Todo todo, TodoDb db)
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/{todo.Id}", todo);
}

static async Task<IResult> UpdateTodo(int id, Todo inputTodo, TodoDb db)
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
}

static async Task<IResult> DeleteTodo(int id, TodoDb db)
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
}

app.Run();
