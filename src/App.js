// @flow strict
import React, { useEffect, useState } from "react";
import "./App.css";

import type { Element, Node } from "react";

type Props = {};

// Regression: need to model to match the api
type Entry = {
  author: string,
  num_comments: number,
  objectID: number,
  points: number,
  title: string,
  url: string
};

type ButtonProps = {
  children?: Node,
  className?: string,
  onClick: Function
};

type SearchProps = {
  children?: Node,
  onSearch: Function,
  searchTerm: string
};

type TableProps = {
  children?: Node,
  filter: string,
  list: Array<Entry>,
  onDismiss: Function
};

const defaultQuery: string = "redux";
const pathBase: string = "https://hn.algolia.com/api/v1";
const pathSearch: string = "/search";
const paramSearch: string = "query=";

function Search({
  searchTerm,
  onSearch,
  children
}: SearchProps): Element<"form"> {
  return (
    <form>
      {children}{" "}
      <input
        type="text"
        value={searchTerm}
        onChange={(event: Event): void => onSearch(event)}
      />
    </form>
  );
}

function Table({ list, filter, onDismiss }: TableProps): Element<"div"> {
  const matchesSearch: Function = (searchTerm: string): Function => {
    return function(entry: Entry): boolean {
      return !entry.title
        ? false
        : entry.title.toLowerCase().includes(searchTerm.toLowerCase());
    };
  };

  return (
    <div className="table">
      {list.filter(matchesSearch(filter)).map((entry: Entry): Element<
        "div"> => (
        <div key={entry.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={entry.url}>{entry.title}</a>
          </span>
          <span style={midColumn}> {entry.author} </span>
          <span style={smallColumn}> {entry.num_comments} </span>
          <span style={smallColumn}> {entry.points} </span>
          <span style={smallColumn}>
            <Button
              onClick={(): void => onDismiss(entry.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
}

function Button({
  onClick,
  className,
  children
}: ButtonProps): Element<"button"> {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
}

function App(props: Props): Element<"div"> | null {
  const [greeting, setGreeting]: [string, Function] = useState(
    "Welcome to the Road to learn React"
  );
  const [list, setList]: [Array<Entry>, Function] = useState([]);
  const [searchTerm, setSearchTerm]: [string, Function] = useState(
    defaultQuery
  );
  const [apiResult, setApiResult]: [Object, Function] = useState(null);

  const onSearch: Function = (searchEvent: SyntheticInputEvent<>) => {
    setSearchTerm(searchEvent.target.value);
  };

  const onDismiss: Function = (id: number) => {
    const hasDifferentId: Function = (entry: Entry): boolean => {
      return entry.objectID !== id;
    };

    const updatedList: Array<Entry> = list.filter(hasDifferentId);
    setList(updatedList);
  };

  const setSearchTopStories: Function = (result) => {
    setApiResult(result);
  };

  useEffect(() => {
    fetch(`${pathBase}${pathSearch}?${paramSearch}${searchTerm}`)
      .then((response: Object): Object => response.json())
      .then((result: Object): void => setSearchTopStories(result))
      .catch((error: Error): Error => error);
  }, [searchTerm]);

  if (!apiResult) {
    return null;
  }

  return (
    <div className="page">
      <div className="interactions">
        <h2>{greeting}</h2>
        <Search searchTerm={searchTerm} onSearch={onSearch}>
          Search:
        </Search>
      </div>
      <Table list={apiResult.hits} filter={searchTerm} onDismiss={onDismiss} />
    </div>
  );
}

const largeColumn: Object = {
  width: "40%"
};

const midColumn: Object = {
  width: "30%"
};

const smallColumn: Object = {
  width: "10%"
};

export default App;
