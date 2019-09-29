import React from "react";
import { Group, Select, Button } from "@vkontakte/vkui";
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
      selectedFile: "",
      timetoread: ""
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
    formData.append("timetoread", this.state.timetoread);
    axios.post(
      "https://arcane-savannah-41356.herokuapp.com/postAdd",
      formData,
      {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total);
        }
      }
    );
  };
  changeTeaser = event => {
    this.setState({ teaser: event.target.value });
    console.log(this.state.teaser);
  };
  changeTeaser = event => {
    this.setState({ timetoread: event.target.value });
    console.log(this.state.timetoread);
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
              fontSize: "1.1rem",
              color: "black",
              width: "97%",
              height: "2rem",
              marginLeft: "1.25%",
              marginTop: "1%",
              marginBottom: "1%",
              boxSizing: "border-box",
              padding: "5px",
              paddingLeft: "10px",
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
              fontSize: "1rem",
              color: "black",
              width: "97%",
              marginLeft: "1.25%",
              marginTop: "1%",
              marginBottom: "1%",
              boxSizing: "border-box",
              padding: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
              border: "1px solid lightgrey",
              borderRadius: "10px"
            }}
            type="text"
            placeholder="Введите текст для предпросмотра"
            onChange={this.changeTeaser}
          />
          <input
            style={{
              boxShadow: "0 0 5px #999999",
              fontSize: "1.1rem",
              color: "black",
              width: "97%",
              height: "2rem",
              marginLeft: "1.25%",
              marginTop: "1%",
              marginBottom: "1%",
              boxSizing: "border-box",
              padding: "5px",
              paddingLeft: "10px",
              border: "1px solid lightgrey",
              borderRadius: "10px"
            }}
            type="Number"
            placeholder="Введите время чтения статьи"
            onChange={this.changeTimeToRead}
          />
          <Select
            style={{
              margin: "5px 5px 5px 5px"
            }}
            onChange={this.changeBuy}
            placeholder="Выберите пол"
          >
            <option value={false}>Платный</option>
            <option value={true}>Бесплатный</option>
          </Select>
          <label className="custom-file-upload">
            <input onChange={this.fileChangedHandler} type="file" />
            Загрузить картинку
          </label>
          <div
            style={{
              marginTop: "15px"
            }}
          >
            <Editor
              initialValue=""
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount"
                ],
                toolbar:
                  " image | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist | removeformat ",
                content_style: "img {width: 100%; height: auto;}"
              }}
              onChange={this.handleEditorChange}
            />
          </div>
          <Button
            style={{
              width: "80%",
              marginBottom: "75px",
              marginTop: "25px",
              marginLeft: "10%"
            }}
            size="xl"
            level="secondary"
          >
            Отправить пост{" "}
          </Button>{" "}
        </form>
        {/*{this.state.content ? (*/}
        {/*  <div*/}
        {/*    className="content"*/}
        {/*    dangerouslySetInnerHTML={{ __html: this.state.content }}*/}
        {/*  ></div>*/}
        {/*) : null}*/}
      </Group>
    );
  }
}

export default ContentEditor;
