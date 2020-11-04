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
                <table>
                    <thead>
                        <tr>
                            <th>Spørsmål</th>
                            <th>Svar</th>
                            <th>Tema</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                            {this.state.faqs.map(question => (
                                <tr key={question.id}>
                                    <td>{question.sporsmaal}</td>
                                    <td>{question.svar}</td>
                                    <td>{question.tema}</td>
                                    <td>{question.rating}</td>
                                </tr>)
                            )
                        } 
                   </tbody>
            </table>
            </div>
        );
    }
}