// @flow strict
import React from "react";

import type { AbstractComponent, Element } from "react";

type LoadingProps = {
  isLoading: boolean,
  ...
};

export function Loading(): Element<"div"> {
  return <div>Loading...</div>;
}

export const withLoading = (
  Component: AbstractComponent<Object>
): AbstractComponent<Object> => ({
  isLoading,
  ...rest
}: LoadingProps): Element<Object> => {
  return isLoading ? <Loading /> : <Component {...rest} />;
};
