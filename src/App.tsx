import React from "react";
import { Main, AnchorLink } from './components';
import KeyboardDoubleDownArrow from "./images/keyboard_double_arrow_down.svg"

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>Color Database</h1>
          <h3>Collect your favorite colors in safe place</h3>
          <AnchorLink anchor="#main" aria-label="Przejdź do aplikacji">
            <img src={KeyboardDoubleDownArrow} alt="Dwie strzałki skierowane w dół" />
          </AnchorLink>
        </header>
        <Main></Main>
      </>
    )
  }
}

export default App;
