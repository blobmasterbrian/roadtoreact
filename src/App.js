// @flow strict
import React, { useEffect, useState } from "react";
import "./App.css";

import type { Element, Node } from "react";

type Props = {};

type ApiResult = {
  hits: Array<Entry>,
  page: number
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
  onChange: (SyntheticInputEvent<>) => void,
  onSubmit: Event => void,
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
const paramPage: string = "page=";

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
        onChange={(event) => onChange(event)}
      />
      <button type="submit">{children}</button>
    </form>
  );
}

function Table({ list, onDismiss }: TableProps): Element<"div"> {
  const matchesSearch: string => Entry => boolean = (searchTerm) => {
    return (entry: Entry): boolean => {
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
  const [greeting, setGreeting]: [string, Object] = useState(
    "Welcome to the Road to learn React"
  );
  const [searchTerm, setSearchTerm]: [string, Object] = useState(defaultQuery);
  const [apiResult, setApiResult]: [ApiResult, Object] = useState({
    hits: [],
    page: 0
  });

  const onChange: (SyntheticInputEvent<>) => void = (searchEvent) => {
    setSearchTerm(searchEvent.target.value);
  };

  const onDismiss: number => void = (id) => {
    const hasDifferentId: Entry => boolean = (entry) => {
      return entry.objectID !== id;
    };

    const updatedList: Array<Entry> = apiResult.hits.filter(hasDifferentId);
    setApiResult({ ...apiResult, hits: updatedList });
  };

  const setSearchTopStories: ApiResult => void = (result) => {
    const { hits, page }: ApiResult = result;

    const oldHits: Array<Entry> = page === 0 ? [] : apiResult.hits;
    const updatedHits: Array<Entry> = [...oldHits, ...hits];

    setApiResult({ ...apiResult, hits: updatedHits, page });
  };

  const onSearchSubmit: Event => void = (event) => {
    fetchSearchTopStories(searchTerm);
    event.preventDefault();
  };

  const fetchSearchTopStories: (string, ?number) => void = (
    searchTerm,
    page = 0
  ) => {
    fetch(
      `${pathBase}${pathSearch}?${paramSearch}${searchTerm}&${paramPage}${
        !page ? 0 : page
      }`
    )
      .then((response: Object): ApiResult => response.json())
      .then((result: ApiResult): void => setSearchTopStories(result))
      .catch((error: Error): Error => error);
  };

  useEffect(
    () => {
      fetchSearchTopStories(searchTerm);
    },
    apiResult.hits.length ? [] : [apiResult.hits]
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
      <div className="interactions">
        <Button
          onClick={() => fetchSearchTopStories(searchTerm, apiResult.page + 1)}
        >
          More
        </Button>
      </div>
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
