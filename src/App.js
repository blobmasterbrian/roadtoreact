// @flow strict
import React, { useState } from "react";
import "./App.css";

import type { Element } from "react";

type Props = {};

type Book = {
  author: string,
  num_comments: number,
  objectID: number,
  points: number,
  title: string,
  url: string
};

type SearchProps = {
  onSearch: Function,
  searchTerm: string
};

type TableProps = {
  filter: string,
  list: Array<Book>,
  onDismiss: Function
};

const initialList: Array<Book> = [
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

function Search(props: SearchProps): Element<"form"> {
  return (
    <form>
      <input
        type="text"
        value={props.searchTerm}
        onChange={(event: Event): void => props.onSearch(event)}
      />
    </form>
  );
}

function Table(props: TableProps): Element<"div"> {
  const matchesSearch: Function = function(
    searchTerm: string
  ): Book => boolean {
    return (book: Book): boolean =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div>
      {props.list.filter(matchesSearch(props.filter)).map((book: Book): Element<
        "div"> => (
        <div key={book.objectID}>
          <span>
            <a href={book.url}>{book.title}</a>
          </span>
          <span> {book.author} </span>
          <span> {book.num_comments} </span>
          <span> {book.points} </span>
          <span>
            <button
              onClick={(): void => props.onDismiss(book.objectID)}
              type="button"
            >
              Dismiss
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

function App(props: Props): Element<"div"> {
  const [greeting, setGreeting]: [string, Function] = useState(
    "Welcome to the Road to learn React"
  );
  const [list, setList]: [Array<Book>, Function] = useState(initialList);
  const [searchTerm, setSearchTerm]: [string, Function] = useState("");

  const onSearch: Function = function(searchEvent: SyntheticInputEvent<>) {
    setSearchTerm(searchEvent.target.value);
  };

  const onDismiss: Function = function(id: number) {
    const hasDifferentId: Function = (book: Book): boolean => {
      return book.objectID !== id;
    };

    const updatedList: Array<Book> = list.filter(hasDifferentId);
    setList(updatedList);
  };

  return (
    <div className="App">
      <h2>{greeting}</h2>
      <Search searchTerm={searchTerm} onSearch={onSearch} />
      <Table list={list} filter={searchTerm} onDismiss={onDismiss} />
    </div>
  );
}

export default App;
