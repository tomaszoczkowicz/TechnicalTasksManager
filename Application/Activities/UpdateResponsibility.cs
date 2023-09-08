using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateResponsibility
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
            _context = context;
            _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                    if (activity == null) return null;
                    var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                    if (user == null) return null;

                    var HostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost).AppUser?.UserName;
                    var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);
                    if (attendance!=null)
                    attendance.IsResponsible = !attendance.IsResponsible;

                    if (attendance == null)
                    {
                        return Result<Unit>.Failure("There is no such responsibility");
                    }

                    var result = await _context.SaveChangesAsync() > 0;
                    return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating responsibility " + attendance.ActivityId +" "+ attendance.AppUser);
            }
        }
    }
}