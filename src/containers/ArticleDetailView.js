import React from 'react';
import axios from 'axios';

import {Button, Card} from 'antd';

import CustomForm from "../components/Form";
import {connect} from "react-redux";

class ArticleDetail extends React.Component {

    state = {
        article: {}
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: newProps.token
            }
            const articleID = this.props.match.params.articleID;
            axios.get(`http://127.0.0.1:8000/api/${articleID}/`)
                .then(res => {
                    this.setState({
                        article: res.data
                    });
                })
        }
    }

    handleDelete = (event) => {
        if (this.props.token !== null) {
            const articleID = this.props.match.params.articleID;
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: this.props.token
            }
            axios.delete(`http://127.0.0.1:8000/api/${articleID}/`);
            this.props.history.push('/');
            this.forceUpdate();
        } else {
            // show king of message
        }

    }

    render() {
        return (
            <div>
                <Card title={this.state.article.title}>
                    <p>{this.state.article.content}</p>
                </Card>
                <CustomForm
                    requestType="put"
                    articleID={this.props.match.params.articleID}
                    binText="Update"
                />
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="submit">Delete</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ArticleDetail);