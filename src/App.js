import './App.css';
import BoardComponent from './components/BoardComponent';
import TitleComponent from './components/TitleComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TitleComponent />
      </header>

      <div>
        <BoardComponent />

      </div>


    </div>
  );
}

export default App;
