import React from "react";
import { Group, Select } from "@vkontakte/vkui";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "./ContentEditor.css";
import FormData from "form-data";

class ContentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: "",
      teaser: "",
      buy: "",
      selectedFile: ""
    };
    this.fileInput = React.createRef();
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  changeTitle = event => {
    this.setState({ title: event.target.value });
    console.log(this.state.title);
  };

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "postImage",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append("title", this.state.title);
    formData.append("teaser", this.state.teaser);
    formData.append("buy", this.state.buy);
    formData.append("content", this.state.content);
    axios.post("http://localhost:5000/postAdd", formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    });
  };
  changeTeaser = event => {
    this.setState({ teaser: event.target.value });
    console.log(this.state.teaser);
  };
  changeBuy = event => {
    this.setState({ buy: event.target.value });
    console.log(this.state.buy);
  };

  async handleEditorChange(e) {
    let content = await this.setState({ content: [e.target.getContent()] });
    console.log("Content was updated:", e.target.getContent());
    return content;
  }

  render() {
    return (
      <Group>
        <form
          encType="multipart/form-data"
          onSubmit={this.uploadHandler}
          id="postForm"
        >
          <input
            style={{
              boxShadow: "0 0 5px #999999",
              fontSize: "1.75rem",
              color: "black",
              width: "97%",
              height: "2rem",
              marginLeft: "1.25%",
              marginTop: "1%",
              marginBottom: "1%",
              boxSizing: "border-box",
              padding: "5px",
              border: "1px solid lightgrey",
              borderRadius: "10px"
            }}
            type="text"
            placeholder="Введите заголовок"
            onChange={this.changeTitle}
          />
          <textarea
            style={{
              boxShadow: "0 0 5px #999999",
              resize: "none",
              height: "30vh",
              outline: "none",
              border: "1px solid #999",
              fontSize: "1rem",
              color: "black",
              width: "97%",
              marginLeft: "1.25%",
              marginTop: "1%",
              marginBottom: "1%",
              boxSizing: "border-box",
              padding: "5px",
              border: "1px solid lightgrey",
              borderRadius: "10px"
            }}
            type="text"
            placeholder="Введите демо текст статьи"
            onChange={this.changeTeaser}
          />
          <Select
            style={{
              margin: "5px 5px 5px 5px"
            }}
            onChange={this.changeBuy}
            placeholder="Выберите пол"
          >
            <option value={true}>Платный</option>
            <option value={false}>Бесплатный</option>
          </Select>
          <input
            className="inputfile"
            style={{
              width: "100%"
            }}
            id="file"
            type="file"
            name="file"
            style={{
              display: "flex",
              width: "100%"
            }}
            onChange={this.fileChangedHandler}
          />
          <label
            style={{
              boxShadow: "0 0 5px #999999",
              textAlign: "center",
              margin: "10px",
              padding: "10px"
            }}
            for="file"
          >
            Выберите фотографию
          </label>

          <Editor
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount"
              ],
              toolbar:
                "undo redo | formatselect | image | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help"
            }}
            onChange={this.handleEditorChange}
          />
          <button>Загрузить пост</button>
        </form>
        {this.state.content ? (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: this.state.content }}
          ></div>
        ) : null}
      </Group>
    );
  }
}

export default ContentEditor;
