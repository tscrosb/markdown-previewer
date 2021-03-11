import React, { useState, useEffect } from "react";
import "./App.scss";
import marked from "marked";
import defaultTextPath from "./startingText.md";

function App() {
  const [editorText, setEditorText] = useState("");

  useEffect(() => {
    marked.setOptions({ breaks: true, smartLists: true });
    fetch(defaultTextPath)
      .then(res => res.text())
      .then(text => setEditorText(text));
  }, []);

  const handleText = event => {
    setEditorText(event.target.value);
  };

  const reactMarkupParse = text => {
    return { __html: marked(text) };
  };

  return (
    <div className="App">
      <h1>MarkDown Previewer</h1>
      <div className="markdown-app">
        <div className="editor-container">
          <h2>Editor</h2>
          <textarea
            id="editor"
            value={editorText}
            onChange={handleText}
          ></textarea>
        </div>
        <div className="preview-container">
          <h2>Preview</h2>
          <article
            id="preview"
            dangerouslySetInnerHTML={reactMarkupParse(editorText)}
          ></article>
        </div>
      </div>
    </div>
  );
}

export default App;
