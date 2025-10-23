using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

const string corsPolicyName = "AllowSpecificOrigin";

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("Todo") ?? "Data Source=Todo.db";

builder.Services.AddOpenApi();

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<TodoAppIdentityDb>();

builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: corsPolicyName,
            policy =>
            {
                policy.WithOrigins(["http://192.168.4.24:3001", "http://192.168.4.24:3000"])
        .AllowAnyHeader()
    .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            });
    });

builder.Services.AddDbContext<TodoDb>(options => options.UseSqlite(connectionString));

builder.Services.AddDbContext<TodoAppIdentityDb>(options => options.UseInMemoryDatabase("TodoAppIdentityDb"));

builder.Services.AddAuthorization();

var app = builder.Build();

app.MapPost("/backend/logout", async (SignInManager<IdentityUser> signInManager, [FromBody] object empty) =>
{
    if (empty != null)
    {
        await signInManager.SignOutAsync();
        return TypedResults.Ok();
    }
    return Results.Unauthorized();
}).RequireCors(corsPolicyName)
    .RequireAuthorization();

app.MapOpenApi("/backend/openapi/");

app.UseCors(corsPolicyName);
app.MapGroup("/backend").MapIdentityApi<IdentityUser>();

var todoitems = app.MapGroup("/backend/todoitems")
    .RequireCors(corsPolicyName);

todoitems.RequireAuthorization();

todoitems.MapGet("/", GetAllTodos);
todoitems.MapGet("/complete", GetCompletedTodos);
todoitems.MapGet("/{id}", GetTodoFromId);
todoitems.MapPost("/", PostTodo);
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

    return TypedResults.Created($"/{todo.Id}", todo);
}

static async Task<IResult> UpdateTodo(int id, Todo inputTodo, TodoDb db)
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return TypedResults.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return TypedResults.Ok();
}

static async Task<IResult> DeleteTodo(int id, TodoDb db)
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return TypedResults.Ok();
    }
    return TypedResults.NotFound();
}

app.Run();
