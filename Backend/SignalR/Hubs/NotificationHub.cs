using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Security.Claims;

namespace Backend.SignalR.Hubs;

[Authorize(Policy = "UserOrAdmin")]
public class NotificationHub: Hub
{

    private static readonly ConcurrentDictionary<string, string> userConnections 
        = new ConcurrentDictionary<string, string>();

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
            try
            {
                userConnections.AddOrUpdate(userId, connectionId, (_, existingConnectionId) => connectionId);
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("HandleError", "Ocorreu um erro ao estabelecer a conexão.");
            }
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
       

        if (!string.IsNullOrEmpty(userId))
        {
            userConnections.TryRemove(userId, out _);
        }

        await base.OnDisconnectedAsync(exception);
    }

}
