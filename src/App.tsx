import './App.css'
import ApiFetcher from './components/ApiFetcherComponent';

function App() {
  return (
      <ApiFetcher initialUrl='https://catfact.ninja/facts' />
  );
}

export default App