import React, {Component} from 'react'
import sudokuSolverTool from '../Util/SudokuSolverTool'
import testUtil from '../Util/testUtil'
import './SudokuGrid.css'
// import squareStyle from './SudokuGrid'

export default class SudokuGrid extends Component {
    grid = [[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]]
    errors = {}
    constructor(){
        super()
        this.state = {
            grid: this.grid,
            errors: this.errors
        }
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
                        className={this.getStyle(item)} 
                        value = {item}

                        onChange={this.handleGridChange}
                    />
            )
        })
    }
    getStyle(item){
        return item == 0 ? "squareStyle" : "squareStyle-modified"
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

        console.log(` x: ${x}, y: ${y}`)
        this.grid[y][x] = e.target.value

        if(Number.isNaN(this.grid[y][x])){
            this.grid[y][x] = parseInt(this.grid[y][x])
        }

        // change the style
        // this.getStyle(e.target.value)
        
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
        sudokuSolverTool.solveSudoku(this.grid)
        console.log(this.grid)
        this.setState({
            grid: this.grid
        })
    }
    resetGrid = () => {
        this.grid =[[0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0]]
        this.setState({
            grid: this.grid,
            errors: {}
        })
    }
    generateRandomPuzzle = () => {
        console.log('generateRandomPuzzle()')
        sudokuSolverTool.generateRandomSudoku(this.grid)
        this.setState({
            grid: this.grid
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
        // console.log('testCall... did it work?')
        testUtil.method1()
        // let list1 = [1,2,3,4,5,6]
        // console.log(`before: ${list1}`)
        // list1.splice(3,1)
        // console.log(`after: ${list1}`)
    }
    testCall1 = () => {
        console.log(`before: ${JSON.stringify(this.errors)}`)
        this.errors["newError"] = 'added new error'
        this.errors.newError2 = 'added new error2'
        console.log(`after: ${JSON.stringify(this.errors)}`)

        //
    }
    insertGrid = () => {
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
                <button onClick={this.insertGrid}> insert saved Grid </button>

            </div>
        )
    }
}