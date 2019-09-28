import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./ContentEditor.css";
import { timingSafeEqual } from "crypto";

class ContentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: "",
      teaser: "",
      buy: "",
      image: ""
    };
    this.fileInput = React.createRef();
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  changeTitle = event => {
    this.setState({ title: event.target.value });
    console.log(this.state.title);
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.fileInput.current.files[0]);
  };
  changeTeaser = event => {
    this.setState({ teaser: event.target.value });
    console.log(this.state.teaser);
  };
  changeBuy = event => {
    this.setState({ buy: event.target.value });
    console.log(this.state.buy);
  };
  sendDataToDB(p) {
    // do something with {p}
  }

  async handleEditorChange(e) {
    let content = await this.setState({ content: [e.target.getContent()] });
    console.log("Content was updated:", e.target.getContent());
    console.log(this.state.content);
    this.sendDataToDB(content);
    return content;
  }

  render() {
    return (
      <form
        enctype="multipart/form-data"
        onSubmit={this.handleSubmit}
        id="postForm"
      >
        <input
          type="text"
          placeholder="Введите заголовок"
          onChange={this.changeTitle}
        />
        <textarea
          type="text"
          placeholder="Введите демо текст статьи"
          onChange={this.changeTeaser}
        />
        <select onChange={this.changeBuy}>
          <option disabled>Выберите героя</option>
          <option value={true}>Платный</option>
          <option selected value={false}>
            Бесплатный
          </option>
        </select>
        <input ref={this.fileInput} type="file"></input>

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
        <button type="submit"></button>
      </form>
    );
  }
}

export default ContentEditor;
