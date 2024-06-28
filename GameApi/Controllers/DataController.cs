using GameApi.Helpers;
using GameApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GameApi.Controllers;

[ApiController]
[Route("[controller]")]
public class DataController : ControllerBase
{
    private string _filePath = "./data/database.txt";

    [HttpPost]
    [Route("set")]
    public ActionResult SetNumbers([FromBody] RequestModel model)
    {
        if (model == null || model.NbGuess == null || model.NbGuess < 0
            || model.NbTools == null || model.NbTools.Count == 0)
        {
            return BadRequest("Invalid data!");
        }

        string jsonString = FileHelper.SaveJson(model, _filePath);
        Console.WriteLine($"Wrote: {jsonString}\n ---END POST---");
        return new JsonResult(model);
    }

    [HttpGet]
    [Route("get")]
    public ActionResult GiveSolution()
    {
        RequestModel? modelRetrieved = FileHelper.LoadJson(_filePath);
        if (modelRetrieved == null) return BadRequest("No data found");
        int guess = modelRetrieved.NbGuess;
        List<int> tools = modelRetrieved.NbTools;

        Console.WriteLine($"Gonna perform operations with t: {guess} | listNbs: {string.Join(", ", tools)}");
        List<List<int>> operations = BestOperationHelper.getSolution(tools, guess);
        Console.WriteLine("---END GET---");

        return new JsonResult(operations);
    }
}