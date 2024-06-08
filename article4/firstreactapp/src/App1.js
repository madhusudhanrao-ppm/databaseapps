import './App.css'; 
import { Greet } from './components/Greet'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {
          <Greet name="John" age="22" subject="computers"/>  
        }
      </header>
    </div>
  );
}

export default App;
