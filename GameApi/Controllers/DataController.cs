using Microsoft.AspNetCore.Mvc;

namespace ApiTest.Controllers;

[ApiController]
[Route("[controller]")]
public class DataController
{
    [HttpGet]
    [Route("get-numbers")]
    public ActionResult GetNbGuess()
    {
        Random rand = new Random();
        int[] outils = new int[7];
        for (int i = 0; i < 7; i++)
        {
            outils[i] = rand.Next(0, 101);
        }
        return new JsonResult(new
        {
            nbGuess = rand.Next(0, 1001),
            nbTools = outils
        });
    }
}