import React from 'react';
import Square from './Square';
import './Board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            next: 'X',
        };
    }

    handleClick(i) {

        // Copy square states
        const squares = this.state.squares.slice();

        // Ignore if square is already marked or winner found
        if (squares[i] || getWinner(squares)) {
            return;
        }

        // Mark square
        squares[i] = this.state.next;

        // Update state
        this.setState({
            squares: squares,
            next: this.state.next === 'X' ? 'O' : 'X',
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {

        // Get winner
        const winner = getWinner(this.state.squares);

        // Initialize status
        let status;

        // Define it
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + this.state.next;
        }

        return (
            <div className="board">
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="status">{status}</div>
            </div>
        );
    }
}

function getWinner(squares) {

    // Define winning combinations
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Go through winning combinations
    for (let i = 0; i < lines.length; i++) {

        // Get combination
        const [a, b, c] = lines[i];

        // Check if winning combination found within squares
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    // No winner found
    return null;
}

export default Board;
