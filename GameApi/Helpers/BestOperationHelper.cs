namespace GameApi.Helpers;

public abstract class BestOperationHelper
{
    public static List<List<int>> getSolution(List<int> nbTools, int nbGuess)
    {
        string list = string.Join(", ", nbTools);
        Console.WriteLine($"Nb Guess: {nbGuess} | Nb Tools: {list}");
        return nearestNumber(nbTools, nbGuess, 0, new List<List<int>>());
    }

    static List<List<int>> nearestNumber(List<int> listNbs, int t, int N, List<List<int>> listOperations)
    {
        if (N == t || listNbs.Count == 1) return listOperations;

        // Utiliser des operations de reduction quand sumResults > t
        int idOperator = (N > t) ? 2 : 0;

        // Sort listNbs descending
        listNbs = listNbs.OrderByDescending(n => n).ToList();

        // Obtenir le resultat d'operation le plus proche de t a partir de N et des elements de listNbs
        List<int> nearestForOperator = getNearestForOperator(t, idOperator, listNbs),
            nearestForNextOperator = getNearestForOperator(t, idOperator + 1, listNbs);

        int decalOp = int.Abs(t - nearestForOperator[0]),
            decalNextOp = int.Abs(t - nearestForNextOperator[0]);

        List<int> operation = [..decalOp < decalNextOp ? nearestForOperator : nearestForNextOperator];
        if (decalOp < decalNextOp) operation.Add(idOperator);
        else operation.Add(idOperator + 1);

        List<int> bestOp = [operation[0], listNbs[operation[1]], listNbs[operation[2]], operation[3]];
        int decalN = int.Abs(t - N),
            decalBestOp = int.Abs(t - bestOp[0]);
        if (decalN <= decalBestOp) return listOperations; // Si N est deja proche de t le plus possible

        listOperations.Add(bestOp);

        // Supprimer les deux nombres nb1 et nb2 de listNbs
        listNbs.Add(operation[0]);
        if (operation[1] > operation[2])
        {
            listNbs.RemoveAt(operation[1]);
            listNbs.RemoveAt(operation[2]);
        }
        else
        {
            listNbs.RemoveAt(operation[2]);
            listNbs.RemoveAt(operation[1]);
        }

        // Sort listNbs descending
        listNbs = listNbs.OrderByDescending(n => n).ToList();

        return nearestNumber(listNbs, t, operation[0], listOperations);
    }

    static int exeOperation(int idOperator, int nb1, int nb2)
    {
        return idOperator switch
        {
            0 => nb1 * nb2,
            1 => nb1 + nb2,
            2 => nb1 - nb2,
            3 => nb1 / nb2,
            _ => throw new ArgumentOutOfRangeException(nameof(idOperator), idOperator, "Unknown operation!")
        };
    }

    static List<int> getNearestForOperator(int t, int idOperator, List<int> listNbs)
    {
        List<int> operationInf = [], // [result, index_nb1, index_nb2]
            operationSup = []; // [result, index_nb1, index_nb2]

        bool lookFor = true;
        int infToT = int.MinValue, supToT = int.MaxValue;
        for (int i = 0; i < listNbs.Count - 1 && lookFor; i++)
        {
            for (int j = i + 1; j < listNbs.Count && lookFor; j++)
            {
                int result = exeOperation(idOperator, listNbs[i], listNbs[j]);

                if (result == t) return [t, i, j];
                if (result < t)
                {
                    infToT = result;
                    operationInf = [infToT, i, j];
                    lookFor = false;
                    break;
                }

                supToT = result;
                operationSup = [supToT, i, j];
            }
        }

        if (infToT == int.MinValue) return operationSup; // There is no result < t
        if (supToT == int.MaxValue) return operationInf; // There is no result > t

        // Look for the result nearest to t
        return int.Abs(t - infToT) < int.Abs(t - supToT) ? operationInf : operationSup;
    }
}