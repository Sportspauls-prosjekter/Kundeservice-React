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
            open: false,
            gyldig: false,
            galInput: {},
            nyKategori: "",
            nySporsmaal: "",
            nySvar: "Svaret kommer innen kort tid.",
            nyRating: 0
        };
    }

    async componentDidMount() {
        {/*Feilhåndtering*/ }
        const { data } = await axios.get("/api/service");

        this.setState({ faqs: data });
    }

    /* EventHandlers for skjemadata  */
    validerSporsmaal = (e) => {
        const regex = /[a-zA-ZæøåÆØÅ 0-9 . \( \) - / \?]{7,80}/
        const gyldig = regex.test(e.target.value);
        this.setState({ gyldig: gyldig })
    }

    HandleKategori = (e) => {
        let galInput = {};
        if (e.target.value == undefined) {
            galInput.kategori = 'En kategori må velges!'
        } else {
            galInput = null;
        }
        this.setState({ nyKategori: e.target.value, galInput: galInput });
    }

    HandleSporsmaal = (e) => {
        this.validerSporsmaal(e);
        let galInput = {};
        if (!this.state.gyldig || e.target.value == undefined) {
            galInput.sporsmaal = 'Inputfeltet krever et spørsmål på minst 7 tegn';
        } else {
            galInput = null;
        }

        this.setState({ nySporsmaal: e.target.value, galInput: galInput });
    }

    HandleSubmit = async (e) => {
        e.preventDefault();
        const Id = this.state.faqs.length + 1;
        const Sporsmaal = this.state.nySporsmaal;
        const Svar = this.state.nySvar;
        const Kategori = this.state.nyKategori;
        const Rating = this.state.nyRating;
        const nyFaq = {
            Id: Id,
            Sporsmaal: Sporsmaal,
            Svar: Svar,
            Kategori: Kategori,
            Rating: Rating
        }
        await axios.post("/api/service", nyFaq);

        const { data } = await axios.get("/api/service");

        this.setState({ faqs: data });
    }

    /* EventHandlers for oppdatert rating  */

    /*TODO: Legge til put-request*/
    HandleBedreRating = (e) => {
        e.preventDefault();

        for (let faq in this.state.faqs) {
            if (this.state.faqs[faq].id == e.target.value) {
                this.state.faqs[faq].rating++;
                const Id = this.state.faqs[faq].id;
                const Sporsmaal = this.state.faqs[faq].sporsmaal;
                const Svar = this.state.faqs[faq].svar;
                const Kategori = this.state.faqs[faq].kategori;
                const Rating = this.state.faqs[faq].rating;
                const oppdatertFaq = {
                    Id: Id,
                    Sporsmaal: Sporsmaal,
                    Svar: Svar,
                    Kategori: Kategori,
                    Rating: Rating
                }
                this.updateRatingDB(Id, oppdatertFaq);
            }
        }
        this.setState(this.state.faqs)
    }

    /*TODO: Legge til put-request*/
    HandleDaarligereRating = (e) => {
        e.preventDefault();

        for (let faq in this.state.faqs) {
            if (this.state.faqs[faq].id == e.target.value) {
                this.state.faqs[faq].rating--;
                const Id = this.state.faqs[faq].id;
                const Sporsmaal = this.state.faqs[faq].sporsmaal;
                const Svar = this.state.faqs[faq].svar;
                const Kategori = this.state.faqs[faq].kategori;
                const Rating = this.state.faqs[faq].rating;
                const oppdatertFaq = {
                    Id: Id,
                    Sporsmaal: Sporsmaal,
                    Svar: Svar,
                    Kategori: Kategori,
                    Rating: Rating
                }
                this.updateRatingDB(Id, oppdatertFaq);
            }
        }

        this.setState(this.state.faqs)
    }

    //Oppdatere rating i databasen
    updateRatingDB = async (id, endret) => {
        try {
            await axios.put("/api/service/" + id, endret)
        } catch (err) {
            console.log(err.response)
        }
    }

    render() {
        return (
            <div id="faq">
                <h2> Velkommen til NOR-WAY FAQ </h2>
                <Button variant="success" className="kategori" id="lagre" onClick={() => this.setState({ open: !this.state.open })} >
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
                            <Form.Control plaintext readOnly defaultValue="Svaret kommer innen kort tid." />
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
                {this.state.faqs.map(faq => <Accordion key={faq.id}>

                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                {faq.sporsmaal} ({faq.kategori}) <i className="arrow down"></i>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {faq.svar}
                                <Button className="endreRating" value={faq.id} onClick={this.HandleBedreRating} variant="success">+</Button>
                                {faq.rating}
                                <Button className="endreRating" value={faq.id} onClick={this.HandleDaarligereRating} variant="danger">-</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>)
                }
            </div>

        );
    }
}