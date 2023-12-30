using Backend.Context;
using Backend.Data;
using Backend.Middleware;
using Backend.Models;
using Backend.Services;
using Backend.SignalR.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Net;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin",
       builder => builder.WithOrigins("http://localhost:5173")
                         .AllowAnyMethod()
                         .AllowAnyHeader().AllowCredentials());
    });

    builder.Services.AddDbContext<AppDBContext>(options =>
    {
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("DefaultConnection"),
            sqlServerOptions => sqlServerOptions.EnableRetryOnFailure());
    });
    builder.Services.AddDbContext<AccountDBContext>(options =>
    {
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("DefaultConnection"),
            sqlServerOptions => sqlServerOptions.EnableRetryOnFailure());
    });


    builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
     .AddEntityFrameworkStores<AccountDBContext>()
     .AddDefaultTokenProviders();

    builder.Services.AddHttpContextAccessor();
    builder.Services.AddTransient<CinemaService>();
    builder.Services.AddTransient<AccountService>();
    builder.Services.AddTransient<TokenService>();
    builder.Services.AddTransient<RoleService>();
    builder.Services.AddTransient<SeedData>();
    builder.Services.AddAutoMapper(typeof(Program));
    builder.Services.AddSignalR();


    builder.Services
    .AddControllers()
       .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
    //builder.Services.AddFluentValidationAutoValidation();
    //builder.Services.AddFluentValidationClientsideAdapters();
    //builder.Services.AddValidatorsFromAssembly(typeof(SignUpRequestModelValidator).Assembly);
    var jwtSettings = builder.Configuration.GetSection("Jwt");
    var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };

      

    });

    builder.Services.Configure<IdentityOptions>(options =>
    {

        options.Password.RequiredLength = 8;
        options.Password.RequiredUniqueChars = 2;


        // User settings.
        options.User.AllowedUserNameCharacters =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
        options.User.RequireUniqueEmail = true;
    });



    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
        options.AddPolicy("User", policy => policy.RequireRole("User"));
        options.AddPolicy("UserOrAdmin", policy => policy.RequireRole("User", "Admin"));
    });
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

var app = builder.Build();

// desativar isso durante manuntenção nos modelos
MigrateData.CreateInitialMigrate(app.Services);
 await DeleteRecord.DeleteRecordAsync(app.Configuration);
await SeedData.CreateInitialsRolesAsync(app.Services);
await RoomData.CreateRoomsForDateRangeAsync(app.Services);


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == (int)HttpStatusCode.Unauthorized) // 401
    {
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync(JsonConvert.SerializeObject(new
        {
            StatusCode = 401,
            Message = "Você não tem acesso acesso a esse recurso, ou ainda não realizou login"
        }));
    }
});

app.UseCors("AllowSpecificOrigin");
app.UseMiddleware<WebSocketsMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseStaticFiles();
app.MapHub<NotificationHub>("/notificationHub");

app.Run();
