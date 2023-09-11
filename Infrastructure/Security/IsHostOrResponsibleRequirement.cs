using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostOrResponsibleRequirement : IAuthorizationRequirement
    {
        
    }
    public class IsHostOrResponsibleRequirementHandler : AuthorizationHandler<IsHostOrResponsibleRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostOrResponsibleRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostOrResponsibleRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId == null) return Task.CompletedTask;
            var activityId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
            .SingleOrDefault(x => x.Key =="id").Value?.ToString());
            var attendee = _dbContext.ActivityAttendees.AsNoTracking().SingleOrDefaultAsync(x => x.AppUserId == userId && x.ActivityId == activityId).Result;
            if(attendee == null) return Task.CompletedTask;
            if(attendee.IsHost || attendee.IsResponsible) context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}