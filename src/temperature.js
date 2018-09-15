import React from 'react';
import ReactDOM from 'react-dom';

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

export default class Calculator extends React.Component {
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
