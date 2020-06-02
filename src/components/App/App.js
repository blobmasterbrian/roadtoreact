// @flow strict
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../Buttons";
import { Search } from "../Searchs";
import { Table } from "../Tables";

import type { Element, Node } from "react";
import type { Entry } from "../Tables";

type Props = {};

type ApiResult = {
  hits: Array<Entry>,
  page: number,
};

const DEFAULT_HPP: string = "100";
const DEFAULT_QUERY: string = "redux";
const PARAM_HPP: string = "hitsPerPage=";
const PARAM_PAGE: string = "page=";
const PARAM_SEARCH: string = "query=";
const PATH_BASE: string = "https://hn.algolia.com/api/v1";
const PATH_SEARCH: string = "/search";

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
  const [error, setError]: [Error | null, Object] = useState(null);

  const onChange: (SyntheticInputEvent<>) => void = (searchEvent) => {
    setSearchTerm(searchEvent.target.value);
  };

  const onDismiss: (number) => void = (id) => {
    const hasDifferentId: (Entry) => boolean = (entry) => {
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

  const setSearchTopStories: (ApiResult) => void = (result) => {
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

  const onSearchSubmit: (Event) => void = (event) => {
    if (searchedKey !== searchTerm) {
      fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  };

  const fetchSearchTopStories: (string, number | void) => void = (
    searchTerm,
    page = 0
  ) => {
    const cachedResult: ?ApiResult = apiResults.get(searchTerm);
    if (cachedResult && cachedResult.page >= page) {
      setSearchedKey(searchTerm);
      return;
    }
    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${
        !page ? 0 : page
      }&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then((result: { data: ApiResult }): void =>
        setSearchTopStories(result.data)
      )
      .then((): void => setSearchedKey(searchTerm))
      .catch((error: Error): Error => setError(error));
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
      {error ? (
        <div className="interactions">
          <p>Something went wrong.</p>
        </div>
      ) : (
        <Table list={list} onDismiss={onDismiss} />
      )}
      <div className="interactions">
        <Button onClick={() => fetchSearchTopStories(searchedKey, page + 1)}>
          More
        </Button>
      </div>
    </div>
  );
}

export default App;
