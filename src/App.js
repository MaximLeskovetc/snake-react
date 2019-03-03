import React, {Component} from 'react';
import Field from './components/Field/Field'
import './App.css'

class App extends Component {
    fieldSize = 25;
    generateField = () => {
        const field = [];
        for (let i = 0; i < this.fieldSize; i++) {
            field.push(new Array(this.fieldSize).fill(''))
        }
        return field;
    };

    constructor() {
        super();
        this.state = {
            field: this.generateField(),
            snake: [{posX: 0, posY: 0}],
            apple: [this.spawnApple()],
            direction: 'right',
            record: 0,
            score: 0,
            speed: 15
        }
    }

    componentDidMount() {
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    if (this.state.direction !== 'down') {
                        this.setState({direction: 'up'});
                    }
                    break;
                case 'ArrowDown':
                    if (this.state.direction !== 'up') {
                        this.setState({direction: 'down'});
                    }
                    break;
                case 'ArrowLeft':
                    if (this.state.direction !== 'right') {
                        this.setState({direction: 'left'});
                    }
                    break;
                case 'ArrowRight':
                    if (this.state.direction !== 'left') {
                        this.setState({direction: 'right'});
                    }
                    break;
                default:
                    break;
            }
        });
        this.game();
    }

    turn = () => {
        const newSnake = [...this.state.snake];
        const head = {posX: newSnake[0].posX, posY: newSnake[0].posY};
        switch (this.state.direction) {
            case 'up':
                head.posX = newSnake[0].posX - 1 >= 0 ? head.posX - 1 : this.fieldSize - 1;
                break;
            case 'down':
                head.posX = newSnake[0].posX + 1 < this.fieldSize ? head.posX + 1 : 0;
                break;
            case 'left':
                head.posY = newSnake[0].posY - 1 >= 0 ? head.posY - 1 : this.fieldSize - 1;
                break;
            case 'right':
                head.posY = newSnake[0].posY + 1 < this.fieldSize ? head.posY + 1 : 0;
                break;
            default:
                break;
        }
        if (newSnake.some(snake => snake.posX === head.posX && snake.posY === head.posY)) {
            this.setState({
                snake: [{posX: 0, posY: 0}],
                apple: [this.spawnApple()],
                score: 0,
                speed: 10
            });
        } else {
            newSnake.unshift(head);
            if (this.state.apple.some(apple => apple.posX === head.posX && apple.posY === head.posY)) {
                this.setState({
                    apple: [this.spawnApple()],
                    score: this.state.score + 1,
                    record: this.state.record < newSnake.length - 1 ? newSnake.length - 1 : this.state.record,
                    speed: this.state.speed * .9
                })
            } else {
                newSnake.pop();
            }
            this.setState({
                snake: newSnake
            });
        }

    };

    spawnApple = () => {
        return {posY: Math.floor(Math.random() * this.fieldSize), posX: Math.floor(Math.random() * this.fieldSize)}
    };

    game = () => {
        const timer = setTimeout(() => {
            this.turn();
            clearTimeout(timer);
            this.game();
        }, this.state.speed * 30)
    };

    render() {
        return (
            <div className='game'>
                <p>Рекорд: {this.state.record}</p>
                <p>Очки: {this.state.score}</p>
                <Field apple={this.state.apple} snake={this.state.snake} field={this.state.field}/>
            </div>
        );
    }
}

export default App;
