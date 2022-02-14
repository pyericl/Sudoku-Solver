const sudokuSolverTool = {
    solveSudoku: (grid) => {
        let x = 9
        let y = 0
        for(let i=0 ; i<grid.length ; i++){
            for(let j=0 ; j<grid[i].length ; j++){
                if(grid[i][j] === 0){
                    x = j
                    y = i
                    break;
                }
            }
            if(x !== 9){
                break;
            }
        }
    
        sudokuSolverTool.recur1(grid, x,y)
    },
    recur1: (grid, x,y) => {
        console.log(`recur: x: ${x}, y: ${y}`)
        if(x === 9){
            return 1
        }
    
        // find next
        let nextX = 9
        let nextY = 0
        let j = x+1
        for(let i=y ; i<grid.length ; i++){
            while(j<grid[i].length){
                if(grid[i][j] === 0){
                    nextX = j
                    nextY = i
                    break;
                }
                j++
            }
            if(nextX !== 9){
                break;
            }
            j = 0
        }
        // console.log(`recur: nextX: ${nextX}, nextY: ${nextY}`)
    
        let validNums = sudokuSolverTool.getValidNums(grid, x,y)
        console.log(`validNums: ${validNums}`)
        // console.log(grid)
        while(validNums.length !== 0){
            grid[y][x] = validNums.shift()
            if(sudokuSolverTool.recur1(grid, nextX,nextY) === 1){
                return 1
            }
        }
        grid[y][x] = 0
        return 0
    },
    getValidNums: (grid, x,y) => {
        let validIndexes = [0,0,0,0,0,0,0,0,0,0]
        // check horizontal
        for(let j=0 ; j<grid[y].length ; j++){
            validIndexes[ grid[y][j] ] = 1
        }
        // check vertical
        for(let i=0 ; i<grid.length ; i++){
            validIndexes[ grid[i][x] ] = 1
        }
    
        // check region
        let xModule = Math.floor(x/3)
        let yModule = Math.floor(y/3)
        for(let i = yModule*3 ; i<(yModule+1)*3 ; i++){
            for(let j = xModule*3 ; j<(xModule+1)*3 ; j++){
                validIndexes[ grid[i][j] ] = 1
            }
        }
    
        // generate list
        let validNums = []
        for(let i=1 ; i<validIndexes.length ; i++){
            if(validIndexes[i] === 0){
                // add(i)
                validNums.push(i)
            }
        }
        return validNums
    },

    checkSudoku: (grid) => {
        // check horizontal
        for(let i=0 ; i<grid.length ; i++){
            if(! sudokuSolverTool.checkHorizontalSudoku(grid, i)){
                return false
            }
        }
        // check vertical
        for(let i=0 ; i<grid[0].length ; i++){
            if(! sudokuSolverTool.checkVerticalSudoku(grid, i)){
                return false
            }
        }
        // check region
        for(let i=0 ; i<3 ; i++){
            for(let j=0 ; j<3 ; j++){
                if(! sudokuSolverTool.checkRegionSudoku(grid, j,i)){
                    return false
                }
            }
        }
        return true
    },
    checkHorizontalSudoku: (grid, yIndex) => {
        let checkList = [1,0,0,0,0,0,0,0,0,0]

        for(let i=0 ; i<grid[yIndex].length ; i++){
            let currNum = grid[yIndex][i]
            if(checkList[currNum] === 1){
                return false
            }
            checkList[currNum] = 1
        }
        return true
    },
    checkVerticalSudoku: (grid, xIndex) => {
        let checkList = [1,0,0,0,0,0,0,0,0,0]

        for(let i=0 ; i<grid.length ; i++){
            let currNum = grid[i][xIndex]
            if(checkList[currNum] === 1){
                return false
            }
            checkList[currNum] = 1
        }
        return true
    },
    checkRegionSudoku: (grid, xModule, yModule) => {
        let checkList = [1,0,0,0,0,0,0,0,0,0]

        for(let i=3*yModule ; i<3*(yModule+1) ; i++){
            for(let j=3*xModule ; j<3*(xModule+1) ; j++){
                let currNum = grid[i][j]
                if(checkList[currNum] === 1){
                    return false
                }
                checkList[currNum] = 1
            }
        }
        return true
    },

    checkCurrentSudoku: (grid) => {
        // check horizontal
        for(let y=0 ; y<grid.length ; y++){
            let currGridRow = grid[y]
            if(!sudokuSolverTool.checkCurrentHorizontal(currGridRow)){
                return false
            }
        }
        // check vertical
        for(let x=0 ; x<grid[0].length ; x++){
            if(!sudokuSolverTool.checkCurrentVertical(grid, x)){
                return false
            }
        }
        // check region
        for(let y=0 ; y<3 ; y++){
            for(let x=0 ; x<3 ; x++){
                if(!sudokuSolverTool.checkCurrentRegion(grid, x,y)){
                    return false
                }
            }
        }
        return true
    },
    checkCurrentHorizontal: (gridRow) => {
        let checkList = [0,0,0,0,0,0,0,0,0,0]
        for(let i=0 ; i<gridRow.length ; i++){
            if(gridRow[i] !== 0){
                if(checkList[gridRow[i]] === 1){
                    return false
                }
                checkList[gridRow[i]] = 1
            }
        }
        return true
    },
    checkCurrentVertical: (grid, xIndex) => {
        let checkList = [0,0,0,0,0,0,0,0,0,0]
        for(let i=0 ; i<grid.length ; i++){
            let currNum = grid[i][xIndex]
            if(currNum !== 0){
                if(checkList[currNum] === 1){
                    return false
                }
                checkList[currNum] = 1
            }
        }
        return true
    },
    checkCurrentRegion: (grid, xModule, yModule) => {
        let checkList = [0,0,0,0,0,0,0,0,0,0]
        for(let y=3*yModule ; y<3*(yModule+1) ; y++){
            for(let x=3*xModule ; x<3*(xModule+1) ; x++){
                let currNum = grid[y][x]
                if(currNum !== 0){
                    if(checkList[currNum] === 1){
                        return false
                    }
                    checkList[currNum] = 1
                }
            }
        }
        return true
    },

    generateRandomSudoku: () => {
        console.log('generateRandomSudoku3()')
        let newGrid = [[0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0]]

        sudokuSolverTool.recurRandom1(newGrid, 0,0)    

        return newGrid
    },
    recurRandom1: (grid, x,y) => {
        if(x === 0 & y === 9){
            return true
        }
        let validNums = sudokuSolverTool.getValidNums(grid, x,y)
        let nextX = x + 1
        let nextY = y
        if(nextX > 8){
            nextX = 0
            nextY = y + 1
        }
        
        while(validNums.length !== 0){
            let randomIndex = Math.floor(Math.random() * validNums.length)
            let randomNumber = validNums.splice(randomIndex, 1)[0]

            grid[y][x] = randomNumber

            if( sudokuSolverTool.recurRandom1(grid, nextX, nextY) ){
                return true
            }
        }

        grid[y][x] = 0
        
        return false
    }
}

const deprecated = {
    generateRandomSudoku: (grid) => {
        let indexList = [[0,1,2,3,4,5,6,7,8],
                         [0,1,2,3,4,5,6,7,8],
                         [0,1,2,3,4,5,6,7,8],
                         [0,1,2,3,4,5,6,7,8],
                         [0,1,2,3,4,5,6,7,8],
                         [0,1,2,3,4,5,6,7,8],
                         [0,1,2,3,4,5,6,7,8],
                         [0,1,2,3,4,5,6,7,8],
                         [0,1,2,3,4,5,6,7,8]]
        let numUnfilled = 81

        // get the available unfilled indices
        for(let i=grid.length-1 ; i>=0 ; i--){
            let currGridRow = grid[i]
            let currIndexRow = indexList[i]

            for(let j=currGridRow.length-1 ; j>=0 ; j--){
                if(currGridRow[j] !== 0){
                    currIndexRow.splice(j, 1)
                    numUnfilled--
                }
            }
            console.log(currIndexRow)
            // if(currIndexRow.length === 0){
            //     indexList.splice(i, 1)
            // }
        }
        console.log(indexList)
                         
        // randomly decide the number of numbers to generate
        let numsToGenerate = Math.floor(Math.random() * numUnfilled)
        while(numsToGenerate > 0){
            let randomY = Math.floor(Math.random() * indexList.length)
            if(indexList[randomY].length === 0){
                numsToGenerate++
            } else {
                let randomIndex = Math.floor(Math.random() * indexList[randomY].length)
                let randomX = indexList[randomY][ randomIndex ]

                // get validNums (zero is already not included)
                let validNums = sudokuSolverTool.getValidNums(grid, randomX, randomY)
                // if there are no validNums to insert, return
                if(validNums.length === 0){
                    return
                }
                let randomIndex2 = Math.floor(Math.random() * validNums.length)
                let randomValue = validNums[randomIndex2]
                // insert
                grid[randomY][randomX] = randomValue

                // then need to check if this causes other cells to wind up with no validNums
                // if any wind up with no validNums, set cell back to 0 and return
                let flag1 = sudokuSolverTool.checkNeighboringCells(grid, randomX,randomY);
                if(!flag1){
                    grid[randomY][randomX] = 0
                    return
                }

                // remove from indexList
                indexList[randomY].splice(randomIndex, 1)
            }
            numsToGenerate--
        }
    },
    checkNeighboringCells: (grid, x,y) => {
        // check horizontal
        for(let i=0 ; i<grid[y].length ; i++){
            let validNums = sudokuSolverTool.getValidNums(grid, i,y)
            if(validNums.length === 0){
                return false
            }
        }
        // check vertical
        for(let i=0 ; i<grid.length ; i++){
            let validNums = sudokuSolverTool.getValidNums(grid, x,i)
            if(validNums.length === 0){
                return false
            }
        }
        // check region
        let xModule = Math.floor(x/3)
        let yModule = Math.floor(y/3)
        for(let i=3*yModule ; i<3*(yModule+1) ; i++){
            for(let j=3*xModule ; j<3*(xModule+1) ; j++){
                let validNums = sudokuSolverTool.getValidNums(grid, j,i)
                if(validNums.length === 0){
                    return false
                }
            }
        }
        return true
    },

    generateRandomSudoku2: () => {        
        console.log('generateRandomSudoku2()')
        let newGrid = [[0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0]]

        for(let y=0 ; y<newGrid.length ; y++){
            // let y = 0
            let currRow = newGrid[y]
            for(let x=0 ; x<currRow.length ; x++){
                // let x = 0
                let validNums = sudokuSolverTool.getValidNums(newGrid, x,y)
                let randomIndex = Math.floor(Math.random() * validNums.length)
                console.log(`x: ${x} , y: ${y} ... [ ${validNums} ], choose ${validNums[randomIndex]}`)
                
                newGrid[y][x] = validNums[randomIndex]
            }
        }

        return newGrid
    },
}

export default sudokuSolverTool