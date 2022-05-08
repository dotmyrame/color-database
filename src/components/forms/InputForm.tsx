import React from "react";

type InputFormProps = {
  method: 'POST' | 'GET';
  name: string;
}

type InputFormState = {
  value: string;
  hidden: boolean;
  sended: boolean;
}

export class InputForm extends React.Component<InputFormProps, InputFormState> {
  constructor(props: InputFormProps) {
    super(props)
    this.state = { value: '', hidden: true, sended: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>, props: InputFormProps) => {
    this.setState({ value: event.target.value })
    let button = document.getElementById(props.name);
    if (button) {
      button.setAttribute("disabled", "true")
      let target = event.target;
      let data = target.value.trim();
      let type: 'HEX' | 'RGB' | 'EMPTY' | 'INVALID';
      if (data.length === 0) {
        this.setState({ hidden: true })
        return;
      }
      if (data.charAt(0) === '#') {
        type = 'HEX'
      } else if (data.charAt(0) === 'r') {
        type = 'RGB'
      } else {
        type = 'INVALID'
      }
      if (type === 'INVALID') {
        target.setAttribute("maxLength", "1")
        this.setState({ hidden: false })
        return;
      }
      if (type === 'HEX') {
        target.setAttribute("maxLength", "7")
        if (!data.match(/#[a-f\d]{6}/i)) {
          this.setState({ hidden: false })
          return;
        }
        this.setState({ hidden: true })
        button.removeAttribute("disabled");
        return;
      }
      if (type === 'RGB') {
        target.setAttribute("maxLength", "18");
        if (!data.match(/rgb\(([0-1][0-9][0-9]|2[0-4][0-9]|25[0-5]|[0-9][0-9]|[0-9])(,\s?([0-1][0-9][0-9]|2[0-4][0-9]|25[0-5]|[0-9][0-9]|[0-9])){2}\)/i)) {
          this.setState({ hidden: false })
          return;
        }
        this.setState({ hidden: true })
        button.removeAttribute("disabled");
        return;
      }
    }

  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let data = event.currentTarget.children[2].getAttribute("value");
    if (data) {
      try {
        localStorage.setItem((localStorage.length + 1).toString(), data)
        this.setState({ sended: true })
        setTimeout(() => {
          this.setState({ sended: false })
        }, 5000)
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    return (
      <form method={this.props.method} onSubmit={(e) => this.handleSubmit(e)}>
        <div className={`error ${this.state.hidden ? 'hidden' : null}`}>
          Provided color is invalid.
        </div>
        <div className={`sended ${this.state.sended ? null : 'hidden'}`}>
          Color added to database.
        </div>
        <input type="text" placeholder="eg. #abcdef" value={this.state.value} name={this.props.name} maxLength={16} onChange={(e) => this.handleChange(e, this.props)} />
        <input type="submit" id={this.props.name} disabled={true} value="Add to database" />
      </form>
    )
  }
}