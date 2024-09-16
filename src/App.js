import { useEffect, useState } from "react";
import "./project1.css";

function App() {
    const [count, setCount] = useState(0);

    const onClickPlus = () => {
        setCount(count + 1);
    };

    const onClickMinus = () => {
        setCount(count - 1);
    };

    return (
        <div className="App">
            <div>
                <h2>Счётчик</h2>
                <h1>{count}</h1>
                <button
                    className="minus"
                    onClick={onClickMinus}>
                    -
                </button>
                <button
                    className="plus"
                    onClick={onClickPlus}>
                    +
                </button>
            </div>
        </div>
    );
}

export default App;
