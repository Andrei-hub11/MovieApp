using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Backend.SignalR.Hubs;

[Authorize]
public class NotificationHub: Hub
{

    private static Dictionary<string, string> userConnections = new Dictionary<string, string>();

    public static bool TryGetConnectionId(string userId, out string connectionId)
    {
        return userConnections.TryGetValue(userId, out connectionId);
    }

    public override async Task OnConnectedAsync()
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var connectionId = Context.ConnectionId;

        if (!string.IsNullOrEmpty(userId))
        {
            if (!userConnections.ContainsKey(userId))
            {
                userConnections.Add(userId, connectionId);
            }
            else
            {
                userConnections[userId] = connectionId;
            }
        }

        await base.OnConnectedAsync();
    }
}
