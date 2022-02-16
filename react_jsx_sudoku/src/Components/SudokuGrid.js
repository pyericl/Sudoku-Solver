import React, {Component} from 'react'
import sudokuSolverTool from '../Util/SudokuSolverTool'
import testUtil from '../Util/testUtil'
import './SudokuGrid.css'
// import squareStyle from './SudokuGrid'

export default class SudokuGrid extends Component {
    // grid = [[0,0,0,0,0,0,0,0,0],
    //         [0,0,0,0,0,0,0,0,0],
    //         [0,0,0,0,0,0,0,0,0],
    //         [0,0,0,0,0,0,0,0,0],
    //         [0,0,0,0,0,0,0,0,0],
    //         [0,0,0,0,0,0,0,0,0],
    //         [0,0,0,0,0,0,0,0,0],
    //         [0,0,0,0,0,0,0,0,0],
    //         [0,0,0,0,0,0,0,0,0]]
    grid = this.initializeGrid(0)
    styleGrid = this.initializeGrid('squareStyle')
    errors = {}
    constructor(){
        super()
        this.state = {
            grid: this.grid,
            errors: this.errors
        }
    }

    initializeGrid(val){
        let grid = []
        for(let i=0 ; i<9 ; i++){
            let currList = []

            for(let j=0 ; j<9 ; j++){
                currList.push(val)
            }
            grid.push(currList)
        }
        return grid
    }
    renderGridForm(){
        let y = -1
        return this.grid.map(list => {
            y++
            return (
                <div> { this.renderGridFormRow(list, y) } </div>
            )
        })
    }
    renderGridFormRow(currList, y){
        // let currList = this.grid[y]
        let x = -1
        return currList.map(item => {
            x++
            let nameId = y+'_'+x
            return (
                    <input
                        type='text'
                        id = {nameId}
                        name = {nameId}
                        className={this.styleGrid[y][x]}
                        value = {item}

                        onChange={this.handleGridChange}
                        disabled={this.styleGrid[y][x] === 'squareStyle-random-generated'}
                    />
            )
        })
    }
    handleGridChange = (e) => {
        // let digitRegX = /^[0-9\b]+$/
        let digitRegX = /^[0-9\b]?$/
        if(!digitRegX.test(e.target.value)){
            console.log('not a digit')
            return
        }
        let name = e.target.name
        let x = name.split('_')[1]
        let y = name.split('_')[0]

        // change from string to number if applicable
        console.log(` x: ${x}, y: ${y}`)        
        let value = e.target.value
        if(value.length !== 0){
            console.log('here11')
            value = Number.parseInt(value)
        }
        this.grid[y][x] = value
        this.styleGrid[y][x] = value === 0 ? "squareStyle" : "squareStyle-user-modified"
        
        // update errors on if form is empty
        if(e.target.value.length === 0){
            this.errors.emptyForm = 'Form cannot be blank'
        } else {
            this.errors = {}
        }

        this.setState({
            grid: this.grid,
            errors: this.errors
        })
    }
    generateAnswer = (e) => {
        e.preventDefault()
        if(!sudokuSolverTool.checkCurrentSudoku(this.grid)){
            this.setState({
                errors: {
                    wrongNumber: 'a cell has a wrong number'
                }
            })
            return
        }

        // pre-set the styleGrid where the solutions will be filled in
        for(let i=0 ; i<this.grid.length ; i++){
            for(let j=0 ; j<this.grid.length ; j++){
                if(this.grid[i][j] === 0){
                    this.styleGrid[i][j] = 'squareStyle-solution-generated'
                }
            }
        }
        sudokuSolverTool.solveSudoku(this.grid)
        console.log(this.grid)
        this.setState({
            grid: this.grid,
            styleGrid: this.styleGrid
        })
    }
    resetGrid = () => {
        this.grid = this.initializeGrid(0)
        this.styleGrid = this.initializeGrid('squareStyle')
        
        this.setState({
            grid: this.grid,
            styleGrid: this.styleGrid,
            errors: {}
        })
    }
    generateRandomPuzzle = () => {
        console.log('generateRandomPuzzle()')
        this.grid = sudokuSolverTool.generateRandomSudoku()
        this.styleGrid = this.initializeGrid('squareStyle-random-generated')

        // find spots to cover up, might overlap, not designed to avoid places already set to 0
        let coverCount = Math.floor(Math.random() * 68) + 13
        while(coverCount > 0){
            let randomX = Math.floor(Math.random() * 9)
            let randomY = Math.floor(Math.random() * 9)
            this.grid[randomY][randomX] = 0
            this.styleGrid[randomY][randomX] = 'squareStyle'

            coverCount--
        }

        this.setState({
            grid: this.grid,
            styleGrid: this.styleGrid
        })
    }
    checkGrid = () => {
        let flag1 = sudokuSolverTool.checkSudoku(this.grid)
        console.log(`sudokuSolverTool.checkSudoku(): ${flag1}`)
    }
    checkValidSoFar = () => {
        let flag1 = sudokuSolverTool.checkCurrentSudoku(this.grid)
        console.log(`sudokuSolverTool.checkCurrentSudoku(): ${flag1}`)
    }
    generateErrorMessage(){
        let str = ''
        let errorKeys = Object.keys(this.state.errors)

        for(let i=0 ; i<errorKeys.length ; i++){
            str = str + "Error: "+errorKeys[i] + 
                        " , Message: "+this.state.errors[errorKeys[i]]
        }
        return str
    }

    testCall = () => {
        testUtil.testParseInt()
    }
    insertTestGrid = () => {
        console.log('insertGrid()')
        this.grid = [[7, 4, 9, 3, 5, 1, 2, 8, 6],
        [8, 0, 5, 7, 0, 0, 0, 4, 9],
        [0, 0, 0, 0, 0, 0, 0, 0, 1],
        [4, 1, 0, 0, 2, 0, 5, 0, 0],
        [0, 3, 0, 0, 7, 0, 6, 0, 0],
        [0, 0, 0, 9, 6, 0, 0, 2, 8],
        [1, 0, 0, 0, 9, 0, 8, 0, 0],
        [0, 8, 6, 0, 0, 0, 0, 0, 0],
        [2, 7, 0, 8, 3, 6, 1, 9, 0]]

        this.setState({
            grid: this.grid
        })
    }

    render(){
        return (
            <div>
                <div> Current Grid: </div> 

                <form onSubmit={this.generateAnswer}>
                    { this.renderGridForm() }

                    <button type='submit' disabled={!(Object.keys(this.state.errors).length === 0)}> Reveal answer </button>
                </form>
                <div> {Object.keys(this.state.errors).length === 0 ? ':}' : this.generateErrorMessage()} </div>

                <button onClick={this.resetGrid}> Reset </button>
                <button onClick={this.generateRandomPuzzle}> Random Sudoku </button>
                <button onClick={this.checkGrid}> Check Sudoku </button>
                <button onClick={this.checkValidSoFar}> Check Valid So Far </button>
                <br/>
                <br/><button onClick={this.testCall}> Test Call </button>
                <button onClick={this.insertTestGrid}> insert saved Grid </button>

            </div>
        )
    }
}