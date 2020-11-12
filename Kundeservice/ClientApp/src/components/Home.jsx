import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import '../Style/home.css';


export default class Home extends Component {
    state = {
        faqs: [],
        filtrert: [],
        open: false,
        nyKategori: "",
        nySporsmaal: "",
        nySvar: "Svaret kommer innen kort tid.",
        nyRating: 0
    };

    
    constructor(props) {
        super(props);
        this.state = {
            faqs: [],
            filtrert: [],
            open: false,
            nyKategori : "",
            nySporsmaal : "",
            nySvar: "Svaret kommer innen kort tid.",
            nyRating : 0 
        };
    }

   

    async componentDidMount() {
        {/*Feilhåndtering*/}
        const { data } = await axios.get("/api/service");
        
        this.setState({ faqs: data });
        this.setState({ filtrert: data });       
    }

    /* EventHandlers for skjemadata  */

    HandleKategori = (e) => {
        this.setState({ nyKategori: e.target.value });
        
    }

    HandleSporsmaal = (e) => {
        this.setState({ nySporsmaal: e.target.value });
    }

    /* EventHandlers for oppdatert rating  */


    HandleBedreRating = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        for (let faq in this.state.faqs) {
            if (this.state.faqs[faq].id == e.target.value) {
                this.state.faqs[faq].rating++;
                console.log("Ny rating", this.state.faqs[faq].rating, this.state.faqs[faq].id )
                
            }
            
        }
        this.setState(this.state.faqs)

    }

    HandleDaarligereRating = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        for (let faq in this.state.faqs) {
            console.log(this.state.faqs[faq].id)
            if (this.state.faqs[faq].id == e.target.value) {
                this.state.faqs[faq].rating--;
                console.log("Ny rating", this.state.faqs[faq].rating, this.state.faqs[faq].id)

            }
        }
        this.setState(this.state.faqs)
    }

  
  
   
    render() {
        return (
            <div id="faq">
                <h2> Velkommen til NOR-WAY FAQ </h2>
                {/*TODO: filtrere og vise på siden*/}
                <Button className="kategori" value="Reise" variant="primary"> Reise </Button>
                <Button className="kategori" value="Bestilling" variant="primary"> Bestilling </Button>
                <Button className="kategori" value="Rutetabell" variant="primary"> Rutetabell </Button>
                <Button variant="success" className="kategori" id="lagre" onClick={() => this.setState({open: !this.state.open })} >
                    Nytt spørsmål </Button>

                {/* Skjema for å legge til nytt spørsmål */}
                <Collapse in={this.state.open}>
                    <Form onSubmit={this.HandleSubmit}>
                   
                        <Form.Control
                            onChange={this.HandleKategori.bind(this)}
                            as="select"
                            className="mr-sm-2"
                            id="inlineFormCustomSelect" custom>
                            <option value="">Velg Kategori</option>
                            <option value="Bestilling">Bestilling</option>
                            <option value="Reise">Reise</option>
                            <option value="Rutetabell">Rutetabell</option>
                        </Form.Control>

                        <Form.Group controlId="question">
                            <Form.Label>Still ditt spørsmål:</Form.Label>
                            <Form.Control onChange={this.HandleSporsmaal} placeholder="Hva lurer jeg på?" />
                        </Form.Group>
                        {/* Svaret til spørsmålet er bare i webappen for syns skyld. Ved utvidelse kan en FAQ vedlikeholdes.*/}
                        <Form.Group controlId="answer">
                            <Form.Label>Svar:</Form.Label>
                            <Form.Control plaintext readOnly  defaultValue="Svaret kommer innen kort tid." />
                        </Form.Group>
                        <Form.Group controlId="rating">
                            <Form.Label>Initial rating:</Form.Label>
                            <Form.Control readOnly defaultValue="0" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Send inn spørsmålet
                        </Button>
                        </Form>
                </Collapse>

                {/* Presentasjon av FAQ-objektene ved hjelp av Collapse-objekter */}
                {this.state.filtrert.map(faq => <Accordion key={faq.id}>
                    <Row>
                        <Col sm={9} >
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        {faq.sporsmaal}  
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {faq.svar}
                              
                            </Card.Body>
                        </Accordion.Collapse>
                            </Card>  </Col>
                        <Col sm={3}>
                            <Card>
                                { /*TODO: Sortere basert på rating */}
                            <Card.Body>
                                    <Button className="endreRating" value={faq.id} onClick={this.HandleBedreRating} variant="success">+</Button>
                             {faq.rating}
                                    <Button className="endreRating" value={faq.id} onClick={this.HandleDaarligereRating}  variant="danger">-</Button>
                            </Card.Body>
                    </Card> </Col>
                        </Row>
                </Accordion>)
                }
            </div>


        );
    }
}

