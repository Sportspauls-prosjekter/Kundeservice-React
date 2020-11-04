import React, { Component } from 'react';
import axios from "axios";
import '../Style/home.css';

export default class Home extends Component {
    state = {
       faqs: []
    }

    constructor() {
        super();
        this.faqs = { faqs: [] };
    }  


    componentDidMount() {
        axios.get(`https://localhost:44383/api/service`)
            .then(res => {
                const faqs = res.data;
                this.setState({ faqs });
            })
    }

   


    render() {
        return (
            <div id="faq">
                <h2> Velkommen til NOR-WAY kundeservice </h2>
            <ul>
                {this.state.faqs.map(question => <li key={question.id}>{question.sporsmaal}</li>)} 
            </ul>
            </div>
        );
    }
}