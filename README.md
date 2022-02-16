# Sudoku-Solver
Designed to automatically solve a sudoku board
Sudoku boards can either be entered by the user or randomly generated


# feature thought
maybe have a hard mode and a easy mode
hard mode
    will not 'hold your hand' and check every number
easy mode
    will 'hold your hand' and check every number
    disables submit button

# problems and features to consider
might want to add feature to 'Check Valid so Far' button to check if will lead to a board that will be unsolvable even if still follows sudoku rules (and may need to add new error)
    //

could add feature to store random grid when generating random sudoku to instantly get answer
    would have to add feature to test if there is a stored grid upon clicking 'Reveal answer'
    also empty stored grid if user changes a form?
disable cells that have the randomly generated number?

sometimes the user might enter in a board with no solution, or if already randomized add a answer with no solution


# questions
how do we re-render for only one form?