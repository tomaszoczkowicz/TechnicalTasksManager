using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Tomek", UserName = "Oczkowicz", Email = "test1@oknoplus.com.pl"},
                    new AppUser{DisplayName = "Krzysiek", UserName = "Siejski", Email = "test2@oknoplus.com.pl"},
                    new AppUser{DisplayName = "Piotr", UserName = "Szatan", Email = "test3@oknoplus.com.pl"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            


            
            
            var activities = new List<Activity>
            {
                
                new Activity
                {
                    Title = "Wdrożenie dokładnego liczenia termiki",
                    Date = DateTime.UtcNow.AddMonths(1),
                    EndDate = new DateTime(),
                    Description = "Wdrożenie dokładnego liczenia termiki do konstrukcji Morlite",
                    Category = "zadanie",
                    Priority = "Niski",
                    Status = "W toku",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            AppUser = users[0],
                            IsHost = true
                        }
                    }
                },
                new Activity
                {
                    Title = "Okucie HST Maco w WH",
                    Date = DateTime.UtcNow.AddMonths(2),
                    EndDate = new DateTime(),
                    Description = "Dodanie nowego okucia do HST W WH",
                    Category = "handel",
                    Priority = "Średni",
                    Status = "Nieprzydzielone",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            AppUser = users[1],
                            IsHost = true
                        },
                        new ActivityAttendee
                        {
                            AppUser = users[2],
                            IsHost = false
                        }
                    }
                },
                new Activity
                {
                    Title = "Zmiana słupka w drzwiach z doświetlem z 3015 na 3010 - kwestie produkcyjne",
                    Date = DateTime.UtcNow.AddMonths(3),
                    EndDate = new DateTime(),
                    Description = "LOREM IPSUM",
                    Category = "produkcja",
                    Priority = "Duży",
                    Status = "Przydzielono",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            AppUser = users[2],
                            IsHost = true
                        },
                        new ActivityAttendee
                        {
                            AppUser = users[0],
                            IsHost = false
                        },
                        new ActivityAttendee
                        {
                            AppUser = users[1],
                            IsHost = false
                        }
                    }
                }
                
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
            }
        }
    }
}