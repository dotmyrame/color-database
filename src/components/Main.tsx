import React from "react";
import { InputForm } from "./forms/InputForm";

export class Main extends React.Component {
  render() {
    return (
      <main id="main">
        <aside>
          <InputForm method="POST" name="addColor" />
        </aside>
        <section>
          Kolory
        </section>
      </main>
    )
  }
}