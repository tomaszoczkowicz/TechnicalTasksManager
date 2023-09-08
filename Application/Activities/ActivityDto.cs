using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;

namespace Application.Activities
{
    public class ActivityDto
    {
    public Guid Id { get; set; }
    public string Title { get; set; }  
    public DateTime Date { get; set; } 
    public DateTime EndDate { get; set; } 
    public string Description { get; set; }
    public string Category { get; set; }
    public string Priority { get; set; }
    public string Status { get; set; }
    public string HostUsername { get; set; }
    public bool IsCancelled { get; set; }
    public ICollection<AttendeeDto> Attendees { get; set; }
    }
}