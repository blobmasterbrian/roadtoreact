// @flow strict
import React from "react";
import "./App.css";

import type { Element } from "react";

type Book = {
  author: string,
  num_comments: number,
  objectID: number,
  points: number,
  title: string,
  url: string
};

const list: Array<Book> = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

function App(): Element<"div"> {
  const helloWorld: string = "Welcome to the Road to learn React";
  return (
    <div className="App">
      <h2>{helloWorld}</h2>
      {list.map(function(book: Book): Element<"div"> {
        return <div>{book.title}</div>;
      })}
    </div>
  );
}

export default App;
