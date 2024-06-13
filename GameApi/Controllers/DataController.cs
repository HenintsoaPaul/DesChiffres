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
        int nb = 50;
//         int nb = rand.Next(0, 1001);

        int[] outils = new int[7];

        outils[0] = 10;
        outils[1] = 5;
        for (int i = 2; i < 7; i++)
        {
            outils[i] = rand.Next(0, 101);
        }

//         for (int i = 0; i < 7; i++)
//         {
//             outils[i] = rand.Next(0, 101);
//         }
        return new JsonResult(new
        {
            nbGuess = nb,
            nbTools = outils
        });
    }
}