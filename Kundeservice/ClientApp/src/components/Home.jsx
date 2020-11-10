import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import '../Style/home.css';


export default class Home extends Component {

    

    constructor(props) {
        super(props);
        this.state = {
            faqs: [],
            open: false
        };
    }

    async componentDidMount() {
        const { data } = await axios.get(`https://localhost:44383/api/service`);
        this.setState({ faqs: data});
    }

    finneKategoriFAQ = (e) => {

        const filtrert = this.state.filtrert.filter(kat => kat.kategori === e.target.value);
        this.setState({ filtrert});
    }

    async sendInnSporsmaal(event) {
        const url = `https://localhost:44383/api/service`;
        
        {/*let sendData = () => {
            await axios.post(url, formData)
        }
        event.preventDefault(); */}
    }
   
    render() {
        
        return (
            <div id="faq">
                <h2> Velkommen til NOR-WAY kundeservice </h2>
                <Button className="kategori" onClick={this.finneKategoriFAQ} value="Reise" variant="primary"> Reise </Button>
                <Button className="kategori" onClick={this.finneKategoriFAQ} value="Ordre" variant="primary"> Ordre </Button>
                <Button className="kategori" onClick={this.finneKategoriFAQ} value="Rutetabell" variant="primary"> Rutetabell </Button>
                <Button variant="success" className="kategori" id="lagre" onClick={() => this.setState({open: !this.state.open })} >
                    Nytt spørsmål </Button>
                <Collapse in={this.state.open}>
                    <Form onSubmit={this.handleSubmit}>
                   
                        <Form.Control
                            as="select"
                            className="mr-sm-2"
                            id="inlineFormCustomSelect" custom>
                            <option value="Reise">Reise</option>
                            <option value="Ordre">Ordre</option>
                            <option value="Rutetabell">Rutetabell</option>
                        </Form.Control>

                        <Form.Group controlId="question">
                            <Form.Label>Still ditt spørsmål:</Form.Label>
                            <Form.Control placeholder="Hva lurer jeg på?" />
                        </Form.Group>
                        {/* Svaret til spørsmålet er bare i webappen for syns skyld. Ved utvidelse kan en FAQ vedlikeholdes.*/}
                        <Form.Group controlId="answer">
                            <Form.Label>Svar:</Form.Label>
                            <Form.Control plaintext readOnly defaultValue="Svaret kommer innen kort tid." />
                        </Form.Group>
                        <Form.Group controlId="rating">
                            <Form.Label>Initial rating:</Form.Label>
                            <Form.Control  readOnly defaultValue="0" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Send inn spørsmålet
                        </Button>
                        </Form>
                </Collapse>
                {this.state.faqs.map( faq => <Accordion key={faq.id}>

                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                {faq.sporsmaal}   <Button className="endreRating" variant="success"> +</Button>
                                {faq.rating}
                                    <Button className="endreRating" variant="danger">-</Button> 
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {faq.svar}
                              
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>  
                </Accordion>) }
            </div>


        );
    }
}
