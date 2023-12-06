using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CinemaAppUnitTest.Utils;

public static class TestResultHelpers
{
    public static T GetPropertyValue<T>(object obj, string propertyName)
    {
        return (T)obj.GetType().GetProperty(propertyName)?.GetValue(obj);
    }

    public static string GetErrorMessage(BadRequestObjectResult result, string propertyName)
    {
        var value = GetPropertyValue<string>(result.Value, propertyName);
        return value ?? string.Empty;
    }
}

