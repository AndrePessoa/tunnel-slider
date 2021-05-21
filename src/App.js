import "./App.css";

import Canvas from "./components/canvas";
import data from "./data/sliders.json";
import useAnimatedState from "./hooks/use-animated-state";

const list = data?.sliders.map((item, index) => ({
  ...item,
  color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  top: Math.random() * 200 - 100,
  img: `https://picsum.photos/seed/${index}/200/200`,
}));

function App() {
  const [scrollPosition, setScrollPosition] = useAnimatedState(
    0.5,
    1000,
    "easeInOutCubic"
  );

  const updateScrollPosition = (evt) => {
    const prop = parseInt(evt.target.value) / 100;
    setScrollPosition(1 - prop);
  };

  return (
    <div className="App">
      <div>
        <input
          type="range"
          min="0"
          max="100"
          onChange={(evt) => updateScrollPosition(evt)}
        />
        {scrollPosition.toFixed(2)}
      </div>

      <header className="App-header">
        <Canvas list={list} proportion={scrollPosition} />
      </header>
    </div>
  );
}

export default App;
