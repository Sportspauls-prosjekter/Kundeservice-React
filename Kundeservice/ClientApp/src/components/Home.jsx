import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
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
        return (
            <div id="faq">
                <h2> Velkommen til NOR-WAY kundeservice </h2>
                <Button className="kategori" variant="primary"> Reise </Button>
                <Button className="kategori" variant="primary"> Ordre </Button>
                <Button className="kategori" variant="primary"> Rutetabell </Button>

                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Click me!
                </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Click me!
                </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>


        );
    }
}
