import logo from './logo.svg';
import './App.css';
import SudokuGrid from './Components/SudokuGrid';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <SudokuGrid />
    </div>
  );
}

export default App;
