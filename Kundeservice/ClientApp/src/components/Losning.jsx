import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../Style/losning.css';

export default class Losning extends Component {
    state = { lastetInn: false }

    componentDidMount() {
        const image = new Image();
        image.onload = () => this.setState({ lastetInn: true });
    }

    render() {
        const { lastetInn } = this.state
        return (
            <div id="appReferanse">
                <div id="info">
                    <h2> NOR-WAY billettkjøpsløsning</h2>
                    <p> Dette er bare en infoside om at løsningen finnes i et annet prosjekt </p>
                    <Link to="/">
                        <Button variant="info">Tilbake til kundeservice </Button>
                    </Link>
                </div>

                <img
                    src="/Bilder/billettkjop.jpg"
                    alt="NOR-WAY sin Billettkjøpmeny for enveisreiser" />
            </div>
        );
    }
}