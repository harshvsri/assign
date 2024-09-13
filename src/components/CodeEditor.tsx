import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

function CodeEditor({ code, setCode }: CodeEditorProps) {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue={code}
      onChange={(value) => {
        setCode(value || "");
      }}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 18,
        lineNumbers: "on",
        automaticLayout: true,
        wordWrap: "on",
      }}
    />
  );
}

export default CodeEditor;
