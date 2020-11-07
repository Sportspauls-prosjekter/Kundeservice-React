import React, { Component } from 'react';
import axios from "axios";
import '../Style/home.css';

export default class Home extends Component {
    

    state = {
        faqs: []
    }

    async componentDidMount() {
        const { data : faqs } = await axios.get(`https://localhost:44383/api/service`);
        this.setState({faqs})
    }

    render() {
        const kategoriene = ["Reise", "Ordre", "Ruter", "Innlogging"]
        return (
            <div id="faq">
                <h2> Velkommen til NOR-WAY kundeservice </h2>
                {kategoriene.map(kat => <div className="kategori" key={ kategoriene.indexOf(kat)}> <p>{kat}</p> </div>)}
            </div>
        );
    }
}
