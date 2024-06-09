# Des Chiffres

## À propos de ce projet

- Tous les nombres sont des entiers. Même les résultats des opérations de calcul doivent être des entiers.
- Génération d’un nombre aléatoire entre 1 et 1000 → nbGuess — int.
- Affichage du nombre nbGuess.
- Génération de 7 nombre aléatoire entre 1 et 100 → nbTools — int[].
- Il peut y avoir des doublons parmi les nbTools.
- Affichage des nbTools.
- On a deux joueurs P1 et P2.
- Chaque joueur peut cumuler des points.
- Chaque joueur doit trouver le nombre le plus proche de nbGuess en utilisant les nbTools dans des opérations élémentaires qui sont +, -, * et /.
- Chaque nbTools ne peut être utilisé qu’une seule fois.
- Il y a un timer. Les joueurs doivent valider leur estimation avant la fin du timer.
- Un joueur peut décider de ne pas envoyer de réponse.
- A la fin du timer:
    - Si un seul joueur a envoyé une réponse :
        - Il devra fournir les calculs justifiants sa réponse
        - Si le résultat des calculs est différent de la réponse qu’il a donné, alors il aura cédé un point à son adversaire.
        - Dans le cas contraire, il gagnera le point en question.
    - Si les 2 joueurs ont envoyé chacun une réponse :
        - Si les réponses sont identiques
            - Ce sera celui qui a validé sa réponse en premier qui devra fournir les calculs de vérification de la réponse.
            - On vérifiera ensuite la véracité de sa réponse et ses calculs.
        - Si les réponses sont différents
            - Ce sera celui qui a donné la réponse la plus proche de la valeur de nbGuess qui devra vérifier.
            - On vérifiera ensuite la véracité de sa réponse et ses calculs.

## Tâches du projet

[Tâches](https://www.notion.so/4561aae416ef45b3b793672f7cc5cf08?pvs=21)