using System.Text.Json;
using GameApi.Models;

namespace GameApi.Helpers;

public abstract class FileHelper
{
    public static string SaveJson(RequestModel model, string filePath)
    {
        string jsonString = "";
        try
        {
            jsonString = JsonSerializer.Serialize(model);
            File.WriteAllText(filePath, jsonString);
        }
        catch (IOException ex)
        {
            Console.WriteLine($"Failed to save data: {ex.Message}");
        }

        return jsonString;
    }

    public static RequestModel? LoadJson(string filePath)
    {
        RequestModel? model;
        try
        {
            if (!File.Exists(filePath))
            {
                throw new IOException($"No {filePath} found...");
            }

            string jsonString = System.IO.File.ReadAllText(filePath);
            model = JsonSerializer.Deserialize<RequestModel>(jsonString);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Failed to retrieve data: {e.Message}");
            throw;
        }

        return model;
    }
}