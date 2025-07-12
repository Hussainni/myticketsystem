import { JumboCard } from "@jumbo/components/JumboCard";
import { Div } from "@jumbo/shared";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
/** todo Editor props defined any */
import { Editor } from "react-draft-wysiwyg";

const styleOptions = {
  width: "100%",
  minHeight: 100,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "lightgray",
};
const WysiwygEditor = () => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  React.useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, []);

  return (
    <JumboCard
      title={"WYSIWYG"}
      contentWrapper
      contentSx={{
        backgroundColor: "background.paper",
      }}
    >
      <Div sx={{ flex: 1 }}>
        <Editor
          editorStyle={styleOptions}
          editorState={editorState}
          onEditorStateChange={(editorState) => setEditorState(editorState)}
        />
        <textarea
          style={{ width: "100%", height: 200 }}
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </Div>
    </JumboCard>
  );
};

export { WysiwygEditor };
