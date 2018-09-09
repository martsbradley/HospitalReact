import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
           {props.value}
        </button>
    );
}
function calculateWinner(squares) {
    const lines = [ [0, 1, 2],
		    [3, 4, 5],
		    [6, 7, 8],
		    [0, 3, 6],
		    [1, 4, 7],
		    [2, 5, 8],
		    [0, 4, 8],
		    [2, 4, 6], ];
    for (let i = 0; i < lines.length; i++) {
	const [a, b, c] = lines[i];
	if (squares[a] && 
	    squares[a] === squares[b] && 
	    squares[a] === squares[c]) {
	      return squares[a];
	}
    }
    return null;
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square value={this.props.squares[i]} 
                    onClick={() => this.props.onClick(i)} 
            />);
    }

    render() {

        return (
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
    }
    handleClick(i) {
        const squares = this.state.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.nextPlayer();

        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
}
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true,
                      ages : [0,2,3,4,5],};
    }

    handleClick = () => {
        console.log('Yes got here', this);
        this.setState( state => ({ isToggleOn : !state.isToggleOn}));
    }

    render() {
        let ageslisted = this.state.ages.map((aNum) => <li key={aNum.toString()}>{aNum}</li>);

        return (
            <div>
                <button onClick={this.handleClick} >
                {this.state.isToggleOn ? 'On' : 'Off'}
                </button>
                <ul>{ageslisted}</ul>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history : [{ squares: Array(9).fill(null),}], //array of states
            xIsNext: true,
        };
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        let status;

        if (winner)
        {
            status = 'Winner ' + winner;
        }
        else
        {
            status = 'Next player: ' + this.nextPlayer();
        }

        return (
          <div className="game">
            <div className="game-board">
              <Board 
                 squares ={current.squares}
                 onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{/* TODO */}</ol>
              <div><button onClick={() =>this.previousScreen()} >Previous</button></div>
              <div><Toggle/></div>
            </div>
          </div>
        );
    }

    previousScreen()
    {
        let history = this.state.history.slice();
        if (history.length > 1)
        {
            history.pop(history.length -1);
            this.setState({
                history: history,
                xIsNext: !this.state.xIsNext,
            });
        }
    }
    
    nextPlayer() {
        const nextplayer = this.state.xIsNext ? 'X' : 'O';
        return nextplayer;
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares: squares, }]),
            xIsNext: !this.state.xIsNext,
        });
    }
}


class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'Please write an essay about your faviourte dom element.',
                      fruit: 'coconut',};

        this.handleChange = this.handleChange.bind(this);
        this.handleFruitChange = this.handleFruitChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFruitChange(event) {
        this.setState({fruit : event.target.value});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('name = ' + this.state.value + ' fruit = ' + this.state.fruit);
        event.preventDefault();
    }

    render() {
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
        );
    }
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>
    }
    else
    {
        return <p>The water would not boil</p>
    }
}
const scaleNames = {'c': 'Celsius',
                    'f': 'Fahrenheit'};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }

    const output = convert(input);
    const rounded = Math.round(output*1000)/1000;
    return rounded.toString();
}



class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTempChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;

        return (
            <fieldset>
               <legend>Enter the temperature in {scaleNames[scale]}:</legend>
               <input value={temperature}
                      onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: '',
                      scale: 'c'};

        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c',
                       temperature: temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f',
                       temperature: temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;

        const celsius = scale    === 'f' ? tryConvert(temperature, toCelsius)   : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit): temperature;

        return (
    <fieldset>
        <TemperatureInput temperature={celsius}    scale='c' onTempChange={this.handleCelsiusChange}/>
        <TemperatureInput temperature={fahrenheit} scale='f' onTempChange={this.handleFahrenheitChange}/>
        <BoilingVerdict celsius={parseFloat(celsius)} />
    </fieldset>
        );
    }
}

function PatientRow(props) {
    return (<tr>
               <td>{props.pat.id}</td>
               <td>{props.pat.forename}</td>
               <td>{props.pat.surname}</td>
               <td>{props.pat.dob}</td>
           </tr>);
}

class PatientTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {patients : [],
                      isLoaded : false,
                      error : false};
    }

    componentDidMount() {
        fetch('/firstcup/rest/hospital/patients?start=1&max=3')
        .then(res => res.json())
        .then(
          (result) => { this.setState({ isLoaded: true,
                                        patients: result,
                                        error:    false});
                        console.log("Loaded the stuff");
                        console.log(result);
                      },

          (error)  => { this.setState( { isLoaded: true, error : true});
                        console.log(error.toString());
                        console.log(error);
                      } 
             );
    }

    render() {
        const error = this.state.error;
        let result;
        if (error)
        {
            result = <p>There was an error calling the service</p>;
        }
        else
        {
            console.log("setting the patients");
            const patients = this.state.patients;
            const items = patients.map(patient => <PatientRow pat={patient}/>);
            result = <table class='table table-bordered'>
                <thead class='thead-dark'>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">DOB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items}
                  </tbody>
                </table>;
        }
        return result;
    }
}


// ========================================
//
//        <div><Game /></div>
//        <div><NameForm/></div>
//        <div><Calculator/></div>

ReactDOM.render(
    <div>
          <div><PatientTable/></div>
    </div>,
    document.getElementById('root')
);
