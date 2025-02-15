import Router from './router/Router';
import './App.css';
import { ModeProvider } from './context/context';

function App() {

  return (
    <ModeProvider>
      <Router/>
    </ModeProvider>
  );
}

export default App;