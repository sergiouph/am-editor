import React, { useEffect, useState } from "react";

export const About = () => {
  return (
    <>
      <p>
        Created by{" "}
        <a href="https://github.com/sergiouph" target="_blank">
          Sergio P
        </a>
        , source code available on{" "}
        <a href="https://github.com/sergiouph/am-editor" target="_blank">
          GitHub
        </a>.
      </p>
      <p>
        This app uses{" "}
        <a href="http://viz-js.com/" target="_blank">
          Viz.js
        </a>{" "}
        and{" "}
        <a href="https://www.graphviz.org/doc/info/lang.html" target="_blank">
          DOT
        </a>{" "}
        for the diagram rendering.
      </p>
    </>
  );
};
