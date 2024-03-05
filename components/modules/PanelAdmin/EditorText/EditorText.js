// components/custom-editor.js

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "blockQuote",
    "undo",
    "redo",
  ],
};

function EditorText(props) {
  return (
    <div className="my-3">
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        data={props.value}
        onChange={(event, editor) => {
          const data = editor.getData();
          props.changeValue(data);
        }}
      />
    </div>
  );
}

export default EditorText;
