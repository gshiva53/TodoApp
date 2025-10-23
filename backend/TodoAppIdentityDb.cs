using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class TodoAppIdentityDb : IdentityDbContext<IdentityUser>
{
    public TodoAppIdentityDb(DbContextOptions<TodoAppIdentityDb> options) : base(options) { }
}
