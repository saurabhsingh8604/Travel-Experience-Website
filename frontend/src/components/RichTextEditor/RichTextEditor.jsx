import React, { useRef,useState,useMemo } from "react";
import JoditEditor from "jodit-react";

const config = {
  // buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
  width: "80vw",
  height: "500px",
  background: "#fefefe",
  readonly: false,
  enableDragAndDropFileToEditor: true,
  // uploader: {
  //   url: "https://cloudinary.com/console/c-aa5927a1e0e31369de29d23eb92eb1/media_library/folders/c0c6b8a71a89128b190c708cc99dfce86f/connector/index.php?action=upload",
  // },
  // uploader: {
  //   url: "/api/upload",
  // },
  zIndex: 0,
  saveModeInCookie: false,
  spellcheck: true,
  editorCssClass: false,
  triggerChangeEvent: true,
  direction: "ltr",
  language: "en",
  debugLanguage: false,
  i18n: "en",
  tabIndex: -1,
  toolbar: true,
  enter: "P",
  useSplitMode: false,
  colorPickerDefaultTab: "background",
  imageDefaultWidth: 100,
  disablePlugins: ["paste", "stat"],
  events: {},
  textIcons: false,
};

const RichTextEditor = ({ initialValue, getValue ,placeholder}) => {
  const editor = useRef(null);
const [content, setContent] = useState('');
	// const config = useMemo({
	// 	readonly: false // all options from https://xdsoft.net/jodit/doc/,
  //   placeholder : {placeholder} || 'Start typings...'
	// }, [placeholder])

  return (
    <div style={{maxWidth:"80vw",minHeight:"550px", display:"flex",justifyContent:"center", alignItems:"center"}}>
      <JoditEditor
        ref={editor ? editor : ""}
        value={initialValue}
        tabIndex={1}
        config={config}
        onBlur={(newContent) => setContent(newContent)}
        //   onBlur={(newContent) => getValue(newContent)}
        onChange={(newContent) => getValue(newContent)}
      />
    </div>
  );
};

export default RichTextEditor;



// import React from "react";
// import { Jodit } from "jodit";
// import JoditReact from "jodit-react";
// import { FileUpload } from "../../services/cloudinaryService";

// class JoditEditor extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       editorContent: "",
//     };

//     this.editorConfig = {
//       readonly: false,
//       autofocus: true,
//       tabIndex: 1,

//       askBeforePasteHTML: false,
//       askBeforePasteFromWord: false,
//       defaultActionOnPaste: "insert_clear_html",

//       placeholder: "Write something awesome ...",
//       beautyHTML: true,
//       toolbarButtonSize: "large",
//       buttons: [
//         "source",
//         "|",
//         "bold",
//         "italic",
//         "|",
//         "ul",
//         "ol",
//         "|",
//         "font",
//         "fontsize",
//         "brush",
//         "paragraph",
//         "|",
//         "video",
//         "table",
//         "link",
//         "|",
//         "left",
//         "center",
//         "right",
//         "justify",
//         "|",
//         "undo",
//         "redo",
//         "|",
//         "hr",
//         "eraser",
//         "fullsize",
//       ],
//       extraButtons: ["uploadImage", "codeBlock"],
//     };
//   }

//   componentWillMount() {
//     this.uploadImageButton();
//     this.codeBlockButton();
//   }

//   uploadImageButton = () => {
//     Jodit.defaultOptions.controls.uploadImage = {
//       name: "Upload image to Cloudinary",
//       iconURL:
//         "https://www.kindpng.com/picc/m/261-2619141_cage-clipart-victorian-cloud-upload-icon-svg-hd.png",
//       exec: async (editor) => {
//         await this.imageUpload(editor);
//       },
//     };
//   };

//   codeBlockButton = () => {
//     Jodit.defaultOptions.controls.codeBlock = {
//       name: "Code Block",
//       iconURL:
//         "https://cdn.icon-icons.com/icons2/2406/PNG/512/codeblock_editor_highlight_icon_145997.png",
//       exec: async (editor) => {
//         const pre = editor.selection.j.createInside.element("pre");
//         pre.style = "background-color:#F0F0F0; text-align:left; padding:10px"; // this can be done by adding an editor class: editorCssClass: my-class - see doc https://xdsoft.net/jodit/v.2/doc/Jodit.defaultOptions.html
//         pre.innerHTML = `${editor.selection.html}`;
//         editor.selection.insertNode(pre);
//       },
//     };
//   };

//   imageUpload = (editor) => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async function () {
//       const imageFile = input.files[0];

//       if (!imageFile) {
//         return;
//       }

//       if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
//         return;
//       }

//       const imageInfo = await FileUpload(imageFile);

//       this.insertImage(editor, imageInfo.url);
//     }.bind(this);
//   };

//   insertImage = (editor, url) => {
//     const image = editor.selection.j.createInside.element("img");
//     image.setAttribute("src", url);
//     editor.selection.insertNode(image);
//   };

//   onChange = (value) => {};

//   setContent = (newContent) => {};

//   render() {
//     return (
//       <React.Fragment>
//         <JoditReact
//           value={this.state.editorContent}
//           config={this.editorConfig}
//           onChange={this.onChange.bind(this)}
//           onBlur={(newContent) => this.setContent(newContent)}
//         />
//       </React.Fragment>
//     );
//   }
// }

// export default JoditEditor;
