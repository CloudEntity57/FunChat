using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using iCloset.DataAccess;
using iCloset.Models;
using iCloset.Services;
using iCloset.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
// using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


namespace iCloset {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services){

            string domain = $"https://{Configuration["Auth0:Domain"]}/";
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = domain;
                options.Audience = Configuration["Auth0:ApiIdentifier"];
                options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    var accessToken = context.Request.Query["access_token"];

                    // If the request is for our hub...
                    var path = context.HttpContext.Request.Path;
                    if (!string.IsNullOrEmpty(accessToken) &&
                        (path.StartsWithSegments("/api/message")))
                    {
                        // Read the token out of the query string
                        context.Token = accessToken;
                    }
                    return Task.CompletedTask;
                }
            };
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("read:messages", policy => policy.Requirements.Add(new HasScopeRequirement("read:messages", domain)));
                options.AddPolicy("write:messages", policy => policy.Requirements.Add(new HasScopeRequirement("write:messages", domain)));

            });

            // register the scope authorization handler
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
            var allowedHosts = Configuration.GetValue<string>("AllowedOrigins").Split(",");
            services.AddCors(c => {
                c.AddPolicy("AllowOrigin",
                    options => options.WithOrigins(allowedHosts)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins("http://localhost:4200")
                    .AllowCredentials());
            });
            // services.AddMvc(x => x.EnableEndpointRouting = false);
            // services.AddMvc(x => x.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddMvc();
            services.AddSignalR();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => {
                configuration.RootPath = "ClientApp/dist";
            });

            var connectionString = Configuration["connectionStrings:clothsyConnectionString"];

            services.AddScoped<IUserRepository<User>, UserRepository>();
            services.AddScoped<IConversationRepository<Conversation>, ConversationRepository>();
            services.AddScoped<IMessageRepository<Message>, MessageRepository>();
            services.AddScoped<IUserConversationRepository<UserConversation>, UserConversationRepository>();


            services.AddDbContext<ClothsyDBContext>(options => options.UseSqlServer(connectionString));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env) {
            if(env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            // app.UseCors("AllowOrigin");
            app.UseCors(builder =>
            {
                builder.WithOrigins("https://localhost:4200", "http://localhost:4200")
                .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });
            app.UseAuthentication();
           // SignalR
            app.UseSignalR(s => s.MapHub<ChatDBHub>("/api/message"));
            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "default",
                    // template: "{controller}/{action=Index}/{id?}");
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa => {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if(env.IsDevelopment()) {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
            app.UseFileServer();
        }

    }
}