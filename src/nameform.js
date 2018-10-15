import React from 'react'

export default class NameForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: 'Please write an essay about your faviourte dom element.',
      fruit: 'coconut' }

    this.handleChange = this.handleChange.bind(this)
    this.handleFruitChange = this.handleFruitChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFruitChange (event) {
    this.setState({ fruit: event.target.value })
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit (event) {
    alert('name = ' + this.state.value + ' fruit = ' + this.state.fruit)
    event.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
            Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <select value={this.state.fruit} onChange={this.handleFruitChange} >
          <option value="carrot">carrot</option>
          <option value="coconut">coconut</option>
          <option value="bananna">bananna</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
