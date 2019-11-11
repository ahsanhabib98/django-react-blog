import React from 'react';
import { Form, Input, Button } from 'antd';
import TextArea from "antd/es/input/TextArea";

import axios from 'axios';

class CustomForm extends React.Component {
    handleFormSubmit = (event, requestType, articleID) => {
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        
        switch ( requestType ) {
            case 'post':
                return axios.post('http://127.0.0.1:8000/api/', {
                    title: title,
                    content: content
                })
                    .then(res => console.log(res))
                    .catch(error => console.err(error));
            case 'put':
                return axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
                    title: title,
                    content: content
                })
                    .then(res => console.log(res))
                    .catch(error => console.err(error));
            default:
                return false
        }
    }

    render() {
    return (
      <div>
        <Form onSubmit={(event) => this.handleFormSubmit(event, this.props.requestType, this.props.articleID )}>
          <Form.Item label="Title" >
            <Input value={this.props.title} name="title" placeholder="Put a title here" />
          </Form.Item>
          <Form.Item label="Content">
            <TextArea value={this.props.content} name="content" placeholder="Enter some content ..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{this.props.binText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CustomForm;