// @flow strict
import React, { useEffect, useState } from "react";
import "./App.css";

import type { Element, Node } from "react";

type Props = {};

type ApiResult = {
  hits: Array<Entry>
};

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
  onClick: number => void
};

type SearchProps = {
  children?: Node,
  onChange: Event => void,
  onSubmit: () => void,
  searchTerm: string
};

type TableProps = {
  children?: Node,
  list: Array<Entry>,
  onDismiss: number => void
};

const defaultQuery: string = "redux";
const pathBase: string = "https://hn.algolia.com/api/v1";
const pathSearch: string = "/search";
const paramSearch: string = "query=";

function Search({
  searchTerm,
  onChange,
  onSubmit,
  children
}: SearchProps): Element<"form"> {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(event: Event): void => onChange(event)}
      />
      <button type="submit">{children}</button>
    </form>
  );
}

function Table({ list, onDismiss }: TableProps): Element<"div"> {
  const matchesSearch: Function = (searchTerm: string): Function => {
    return function(entry: Entry): boolean {
      return !entry.title
        ? false
        : entry.title.toLowerCase().includes(searchTerm.toLowerCase());
    };
  };

  return (
    <div className="table">
      {list.map((entry: Entry): Element<"div"> => (
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
  const [searchTerm, setSearchTerm]: [string, Function] = useState(
    defaultQuery
  );
  const [apiResult, setApiResult]: [ApiResult | null, Function] = useState(
    null
  );

  const onChange: Function = (searchEvent: SyntheticInputEvent<>) => {
    setSearchTerm(searchEvent.target.value);
  };

  const onDismiss: Function = (id: number) => {
    const hasDifferentId: Function = (entry: Entry): boolean => {
      return entry.objectID !== id;
    };

    const updatedList: Array<Entry> = !apiResult
      ? []
      : apiResult.hits.filter(hasDifferentId);
    setApiResult({ ...apiResult, hits: updatedList });
  };

  const setSearchTopStories: Function = (result: ApiResult) => {
    setApiResult(result);
  };

  const onSearchSubmit: Function = (event: Event) => {
    fetchSearchTopStories(searchTerm);
    event.preventDefault();
  };

  const fetchSearchTopStories: Function = (searchTerm: string) => {
    fetch(`${pathBase}${pathSearch}?${paramSearch}${searchTerm}`)
      .then((response: Object): ApiResult => response.json())
      .then((result: ApiResult): void => setSearchTopStories(result))
      .catch((error: Error): Error => error);
  };

  useEffect(
    () => {
      fetchSearchTopStories(searchTerm);
    },
    !apiResult ? [] : [apiResult.hits]
  );

  return (
    <div className="page">
      <div className="interactions">
        <h2>{greeting}</h2>
        <Search
          searchTerm={searchTerm}
          onChange={onChange}
          onSubmit={onSearchSubmit}
        >
          Search
        </Search>
      </div>
      {!apiResult ? null : (
        <Table list={apiResult.hits} onDismiss={onDismiss} />
      )}
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
