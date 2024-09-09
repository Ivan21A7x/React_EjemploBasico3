import './App.css';
import BoardComponent from './components/BoardComponent';
import NewTaskComponent from './components/NewTaskComponent';
import TitleComponent from './components/TitleComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TitleComponent />
      </header>

      <div>
        <BoardComponent />
        <NewTaskComponent />

      </div>


    </div>
  );
}

export default App;
