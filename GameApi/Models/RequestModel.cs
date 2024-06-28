namespace GameApi.Models;

public class RequestModel(List<int> nbTools)
{
    public int NbGuess { get; set; }
    public List<int> NbTools { get; set; } = nbTools;
}