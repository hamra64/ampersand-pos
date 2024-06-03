import { configureFakeBackend } from './helpers';

// Theme
import './assets/scss/theme.scss';
import './App.css'

import Routes from './routes/Routes';

configureFakeBackend();
function App() {
  return (
    <Routes></Routes>
  );
}

export default App;
