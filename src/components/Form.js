import React from 'react';
import { Form, Input, Button } from 'antd';
import TextArea from "antd/es/input/TextArea";

import axios from 'axios';
import {connect} from "react-redux";

class CustomForm extends React.Component {
    handleFormSubmit = async (event, requestType, articleID) => {
        event.preventDefault();

        const postObj = {
            title: event.target.elements.title.value,
            content: event.target.elements.content.value
        }

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`,
        };
        
        if ( requestType === "post" ) {
            await axios.post("http://127.0.0.1:8000/api/create/", postObj)
                .then(res => {
                 if (res.status === 201) {
                     this.props.history.push(`/`);
                 }
                })
        } else if ( requestType === "put" ) {
            await axios.put(`http://127.0.0.1:8000/api/${articleID}/update/`, postObj)
                .then(res => {
                 if (res.status === 200) {
                     this.props.history.push(`/`);
                 }
                })
        }
    };

    // handleChange(event) {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // }

    render() {
    return (
      <div>
        <Form onSubmit={(event) => this.handleFormSubmit(event, this.props.requestType, this.props.articleID )}>
          <Form.Item label="Title" >
            <Input type="text" name="title" placeholder="Put a title here" />
          </Form.Item>
          <Form.Item label="Content">
            <TextArea type="text" name="content" placeholder="Enter some content ..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{this.props.binText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(CustomForm);