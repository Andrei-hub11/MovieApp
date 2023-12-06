using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaAppUnitTest;
    public class RoomResponse
    {
        public string? Message { get; set; }
        public RoomModel Room { get; set; }
    }

