import { useEffect, useState } from "react";
import "./project3.css";

const questions = [
    {
        title: "JavaScript - это ... ?",
        variants: ["язык программирования", "фреймворк", "библиотека"],
        correct: 0,
    },
    {
        title: "Что такое TypeScript?",
        variants: [
            "Это надстройка над JavaScript с поддержкой статической типизации",
            "Это библиотека для управления состоянием",
            "Это язык разметки",
        ],
        correct: 0,
    },
    {
        title: "Какой метод используется для добавления элемента в конец массива в JavaScript?",
        variants: ["push()", "add()", "append()"],
        correct: 0,
    },
    {
        title: "Что делает оператор '===' в JavaScript?",
        variants: [
            "Сравнивает значения с неявным преобразованием типов",
            "Сравнивает значения с явным преобразованием типов",
            "Если значения равны, возвращает true, иначе false",
        ],
        correct: 0,
    },
    {
        title: "Что такое Virtual DOM в React?",
        variants: [
            "Технология для управления стилей компонентов",
            "Представление DOM-дерева в памяти для улучшения производительности",
            "Библиотека для управления состоянием",
        ],
        correct: 1,
    },
    {
        title: "Какой метод используется в React для обновления состояния компонента?",
        variants: ["setState()", "updateState()", "changeState()"],
        correct: 0,
    },
    {
        title: "Что такое пропсы в React?",
        variants: [
            "Способ передачи данных от родителя к дочернему компоненту",
            "Способ для управления состоянием компонента",
            "Функции, которые используются только в классовых компонентах",
        ],
        correct: 0,
    },
    {
        title: "Как объявить переменную с типом в TypeScript?",
        variants: [
            "let variable: type;",
            "variable type: Type;",
            "var variable = type;",
        ],
        correct: 0,
    },
    {
        title: "Что такое 'hoisting' в JavaScript?",
        variants: [
            "Переменные объявляются в начале их области видимости",
            "Функции объявляются после их вызова",
            "Состояния обновляются автоматически",
        ],
        correct: 0,
    },
    {
        title: "Как объявить функциональный компонент в React?",
        variants: [
            "const Component = () => { ... }",
            "function Component() { ... }",
            "both A and B",
        ],
        correct: 2,
    },
    {
        title: "Что такое замыкание в JavaScript?",
        variants: [
            "Функция, которая имеет доступ к переменным из внешней функции даже после ее завершения",
            "Состояние переменной, которое сохраняется между вызовами функции",
            "Метод, который позволяет создавать новые объекты",
        ],
        correct: 0,
    },
    {
        title: "Какой метод используется для создания массива из объекта в JavaScript?",
        variants: ["Object.keys()", "Array.from()", "Array.of()"],
        correct: 1,
    },
    {
        title: "Что такое JSX в React?",
        variants: [
            "Синтаксис, позволяющий писать HTML-подобный код в JavaScript",
            "Метод для управления состоянием компонентов",
            "Библиотека для работы с API",
        ],
        correct: 0,
    },
    {
        title: "Какой метод используется для удаления элемента из массива в JavaScript?",
        variants: ["remove()", "splice()", "delete()"],
        correct: 1,
    },
    {
        title: "Что такое компоненты высшего порядка (HOC) в React?",
        variants: [
            "Функции, которые принимают компонент и возвращают новый компонент",
            "Компоненты, которые могут использоваться только в классах",
            "Компоненты, которые не имеют состояния",
        ],
        correct: 0,
    },
    {
        title: "Что такое 'this' в JavaScript?",
        variants: [
            "Ссылка на текущий объект, в контексте которого выполняется код",
            "Переменная, которая хранит все глобальные значения",
            "Функция, которая вызывается при создании нового объекта",
        ],
        correct: 0,
    },
    {
        title: "Какой оператор используется для объединения массивов в JavaScript?",
        variants: ["concat()", "+", "merge()"],
        correct: 0,
    },
    {
        title: "Что такое 'props.children' в React?",
        variants: [
            "Способ передачи дочерних элементов в компонент",
            "Метод для обновления состояния",
            "Переменная, которая хранит состояние компонента",
        ],
        correct: 0,
    },
    {
        title: "Какой метод используется для преобразования JSON-строки в объект в JavaScript?",
        variants: ["JSON.stringify()", "JSON.parse()", "JSON.convert()"],
        correct: 1,
    },
    {
        title: "Что такое Redux?",
        variants: [
            "Библиотека для управления состоянием приложения",
            "Фреймворк для создания серверных приложений",
            "Метод для работы с API",
        ],
        correct: 0,
    },
];

const answerMappings = {
    1: "ответ",
    2: "ответа",
    3: "ответа",
    4: "ответа",
};

function Result(guessed, total, restart) {
    const guessedAnswers = guessed < 5 ? answerMappings[guessed] : "ответов";

    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
            <h2>
                Вы отгадали {guessed} {guessedAnswers} из {total}
            </h2>
            <button onClick={restart}>Попробовать снова</button>
        </div>
    );
}

function Game() {
    const totalAnswers = questions.length;
    const progressBegin = (1 / totalAnswers) * 100;

    const [progress, setProgress] = useState(progressBegin);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const restartQuiz = () => {
        setQuestionNumber(1);
        setProgress(progressBegin);
        setCorrectAnswers(0);
    };

    if (questionNumber > totalAnswers) {
        return Result(correctAnswers, totalAnswers, restartQuiz);
    }

    const checkCorrect = (e) => {
        const answer = e.target.innerText;
        const correctAnswer = questions[questionNumber - 1].correct;
        answer === questions[questionNumber - 1].variants[correctAnswer]
            ? setCorrectAnswers(correctAnswers + 1)
            : setCorrectAnswers(correctAnswers);

        const nextQuestionNumber = questionNumber + 1;
        setQuestionNumber(nextQuestionNumber);
        setProgress((nextQuestionNumber / totalAnswers) * 100);
    };

    return (
        <>
            <progress
                min="0"
                max="100"
                value={progress}></progress>
            <h1>{questions[questionNumber - 1].title}</h1>
            <ul>
                {questions[questionNumber - 1].variants.map(
                    (question, index) => (
                        <li
                            key={index}
                            onClick={checkCorrect}>
                            {question}
                        </li>
                    )
                )}
            </ul>
        </>
    );
}

function App() {
    return (
        <div className="App">
            <Game />
            {/* <Result /> */}
        </div>
    );
}

export default App;
