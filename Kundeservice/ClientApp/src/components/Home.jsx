import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import { Row, Col } from 'reactstrap';
import axios from "axios";
import '../Style/home.css';


export default class Home extends Component {

    
   
    state = {
        faqs: [],
        filtrert: [],
        open: false
        
    }

    async componentDidMount() {
        const { data } = await axios.get(`https://localhost:44383/api/service`);
        const filtrert = data;
        
        this.setState({ faqs: data, filtrert });
    }

    finneKategoriFAQ = (e) => {

        const faqs = this.state.filtrert.filter(kat => kat.kategori === e.target.value);
        this.setState({ faqs });
    }
   
    render() {
        
        return (
            <div id="faq">
                <h2> Velkommen til NOR-WAY kundeservice </h2>
                <Button className="kategori" onClick={this.finneKategoriFAQ} value="Reise" variant="primary"> Reise </Button>
                <Button className="kategori" onClick={this.finneKategoriFAQ} value="Ordre" variant="primary"> Ordre </Button>
                <Button className="kategori" onClick={this.finneKategoriFAQ} value="Rutetabell" variant="primary"> Rutetabell </Button>
                <Button variant="success" >
                    Nytt spørsmål </Button>
                <Collapse in={this.state.open}>
                    <Form>
                    <Col xs="auto" className="my-1">
                        <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                            Preference
                        </Form.Label>
                        <Form.Control
                            as="select"
                            className="mr-sm-2"
                            id="inlineFormCustomSelect"
                            custom
                        >
                            <option value="0">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Control>
                        </Col>
                        </Form>
                </Collapse>
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
