var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Ajoutez le middleware CORS ici
app.UseCors(builder => builder
  .AllowAnyOrigin() // Autorise toutes les origines pour le développement
  .AllowAnyMethod() // Autorise toutes les méthodes HTTP
  .AllowAnyHeader()); // Autorise tous les en-têtes

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
