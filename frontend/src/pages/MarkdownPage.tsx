import { useState, useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import HomeNavbar from "../components/HomeNavbar";
import "../assets/markdownEditor.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [fileId, setFileId] = useState("");
  const [fileIdInput, setFileIdInput] = useState("");
  const [theme, setTheme] = useState("light");
  const { colorMode, toggleColorMode } = useColorMode();

  const mockMarkdownContent = `
  # Markdown Title
  
  This is a *mock* of the Markdown file with ID 1234.
  
  ## Subheader
  
  - List item 1
  - List item 2
  - List item 3
  
  \`\`\`javascript
  // Example code block
  console.log('Hello, world!');
  \`\`\`
  
  > Blockquote text here.
  `;

  const saveMarkdown = async () => {
    try {
      const response = await fetch("/api/markdown", {
        method: fileId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: markdown,
          fileId: fileId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert("File saved successfully!");
        setFileId(data.fileId);
      } else {
        alert("Error saving file!");
      }
    } catch (error) {
      console.error("Error saving the markdown content:", error);
      alert("Failed to save the file.");
    }
  };

  const loadMarkdown = async (id: string) => {
    try {
      const response = await fetch(`/api/markdown/${id}`);
      const data = await response.json();
      if (data.content) {
        setMarkdown(data.content);
        setFileId(id);
      } else {
        alert("File not found!");
      }
    } catch (error) {
      console.error("Error loading the markdown content:", error);
      alert("Failed to load the file.");
    }
  };

  useEffect(() => {
    if (fileId) {
      loadMarkdown(fileId);
    }
  }, [fileId]);

  const handleLoadById = () => {
    const id = fileIdInput.trim();
    const mockFileId = "1234";
    if (id === mockFileId) {
      setMarkdown(mockMarkdownContent);
    } else if (id) {
      loadMarkdown(id);
    } else {
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = `${newTheme}-theme`;
    toggleColorMode();
  };

  return (
    <div className={`container ${theme}-theme`}>
      <HomeNavbar children={['Markdown']} />
      <div className={`container ${theme}-theme`}>
        <div className="editor-container">
          <MDEditor
            onChange={(newMarkdown = "") => setMarkdown(newMarkdown)}
            value={markdown}
            height={500}
            data-color-mode={theme as "light" | "dark"}
          />
        </div>
        <div className="editor-actions">
          <input
            className={`theme-input ${
              theme === "light" ? "input-light" : "input-dark"
            }`}
            type="text"
            placeholder="Enter file ID"
            value={fileIdInput}
            onChange={(e) => setFileIdInput(e.target.value)}
          />
          <button onClick={handleLoadById}>Load</button>
          <button onClick={saveMarkdown}>Save</button>
          <button onClick={toggleTheme}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
