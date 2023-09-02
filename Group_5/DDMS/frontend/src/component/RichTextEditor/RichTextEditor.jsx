import React, { useState, useEffect, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./RichTextEditor.css";

function RichTextEditor({update}) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  //const [alignment, setAlignment] = useState("left");

  const ref = useRef(null);
  // useEffect(() => {

  // },[editorState])
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9) { // Tab Key
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType) => {
    if (["left", "center", "right"].includes(blockType)) {
      setEditorState(RichUtils.toggleBlockType(editorState, "align"));
      setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    } else {
      setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    }
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  };

  const handlePastedText = (text, html) => {
    console.log(text, html);
    return "handled";
  };

  // useEffect(() => {
  //   // log the content state whenever it changes
  //   console.log(
  //     convertToRaw(editorState.getCurrentContent())
  //   );
  // }, [editorState]);

  const content = convertToRaw(editorState.getCurrentContent());

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button onClick={() => toggleBlockType("header-one")}>
          H1
        </button>
        <button onClick={() => toggleBlockType("header-two")}>
          H2
        </button>
        <button onClick={() => toggleBlockType("blockquote")}>
          Blockquote
        </button>
        <button onClick={() => toggleBlockType("unordered-list-item")}>
          UL
        </button>
        <button onClick={() => toggleBlockType("ordered-list-item")}>
          OL
        </button>
        <button onClick={() => toggleInlineStyle("BOLD")}>
          B
        </button>
        <button onClick={() => toggleInlineStyle("ITALIC")}>
          I
        </button>
        <button onClick={() => toggleInlineStyle("UNDERLINE")}>
          U
        </button>
        {/* <button onClick={() => toggleBlockType("left")}>Left</button>
        <button onClick={() => toggleBlockType("center")}>Center</button>
        <button onClick={() => toggleBlockType("right")}>Right</button> */}
      </div>
      <div className="editor" onClick={() => ref.current.focus()}>
        <Editor
          editorState={editorState}
          onChange={(e)=>{setEditorState(e); update( convertToRaw(editorState.getCurrentContent()))}}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          handlePastedText={handlePastedText}
          placeholder="Enter some text"
          ref={ref}
        />
      </div>
    </div>
  );
}

export default RichTextEditor;
