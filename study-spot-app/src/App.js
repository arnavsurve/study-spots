import logo from './logo.svg';
import './styles/App.css';
import Map from './components/Map.js';

function App() {
  const studySpots = [
    { id: 1, name: 'Library', lat: 37.7749, lng: -122.4194 }
  ]

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <h1>SpotFinda BITCHHHHHHHHHHH</h1>
      <h3>Click on the map to submit a new spot!</h3>

      <Map spotsData={studySpots} />
    </div>
  );
}

export default App;
