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

const DEFAULT_HPP: string = "100";
const DEFAULT_QUERY: string = "redux";
const PARAM_HPP: string = "hitsPerPage=";
const PARAM_PAGE: string = "page=";
const PARAM_SEARCH: string = "query=";
const PATH_BASE: string = "https://hn.algolia.com/api/v1";
const PATH_SEARCH: string = "/search";

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
  const [searchTerm, setSearchTerm]: [string, Object] = useState(DEFAULT_QUERY);
  const [searchedKey, setSearchedKey]: [string, Object] = useState(
    DEFAULT_QUERY
  );
  const [apiResults, setApiResults]: [
    Map<string, ApiResult>,
    Object
  ] = useState(new Map());

  const onChange: (SyntheticInputEvent<>) => void = (searchEvent) => {
    setSearchTerm(searchEvent.target.value);
  };

  const onDismiss: number => void = (id) => {
    const hasDifferentId: Entry => boolean = (entry) => {
      return entry.objectID !== id;
    };

    const cachedResult: ?ApiResult = apiResults.get(searchedKey);
    const updatedList: Array<Entry> = cachedResult
      ? cachedResult.hits.filter(hasDifferentId)
      : [];

    setApiResults(
      cachedResult
        ? new Map(
          apiResults.set(searchTerm, { ...cachedResult, hits: updatedList })
        )
        : apiResults
    );
  };

  const setSearchTopStories: ApiResult => void = (result) => {
    const { hits, page }: ApiResult = result;

    const cachedResult: ?ApiResult = apiResults.get(searchTerm);
    const oldHits: Array<Entry> = !cachedResult ? [] : cachedResult.hits;
    const updatedHits: Array<Entry> = [...oldHits, ...hits];

    setApiResults(
      new Map(
        apiResults.set(searchTerm, { ...cachedResult, hits: updatedHits, page })
      )
    );
  };

  const onSearchSubmit: Event => void = (event) => {
    if (searchedKey !== searchTerm) {
      fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  };

  const fetchSearchTopStories: (string, ?number) => void = (
    searchTerm,
    page = 0
  ) => {
    if (apiResults.get(searchTerm)) {
      setSearchedKey(searchTerm);
      return;
    }
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${
        !page ? 0 : page
      }&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then((response: Object): ApiResult => response.json())
      .then((result: ApiResult): void => setSearchTopStories(result))
      .then((): void => setSearchedKey(searchTerm))
      .catch((error: Error): Error => error);
  };

  useEffect(() => {
    fetchSearchTopStories(searchedKey);
  }, [searchedKey]);

  const resNull: ?ApiResult = apiResults.get(searchedKey);
  const page: number = resNull ? resNull.page : 0;
  const list: Array<Entry> = resNull ? resNull.hits : [];

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
      {!apiResults ? null : <Table list={list} onDismiss={onDismiss} />}
      <div className="interactions">
        <Button onClick={() => fetchSearchTopStories(searchedKey, page + 1)}>
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
