// @flow strict
import React from "react";

import type { Element } from "react";

type LoadingProps = {};

export function Loading(props: LoadingProps): Element<"div"> {
  return <div>Loading...</div>;
}
