import React from "react";
import ReactDOM from "react-dom";
import { mark, platform } from "stardust-core";
import StardustWebGL from "stardust-webgl";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const width = 960;
    const height = 500;
    const canvas = this.myRef.current;
    const stardustPlatform = platform("webgl-2d", canvas, width, height);

    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const circleSpec = mark.circle();
    const circles = mark.create(circleSpec, stardustPlatform);

    circles.attr("center", d => [d * 80, 250]);
    circles.attr("radius", d => d * 3);
    circles.attr("color", [0, 0, 0, 1]);

    circles.data(data);

    circles.render();
  }

  render() {
    return (
      <div className="App">
        <h1>Stardust.js in React</h1>
        <canvas ref={this.myRef} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
