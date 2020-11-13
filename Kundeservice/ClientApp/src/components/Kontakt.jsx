import React, { Component } from 'react';
import '../Style/kontakt.css';

export default class Kontakt extends Component {
    render() {
        return (
            <div id="kontaktinfo">
                <h1>Kontakt NOR-WAY kundeservice</h1>
                <div id="info">
                    {/* Data hentet fra: https://www.nor-way.no/kontakt-oss/kundeservice/ */}
                    <p> Adresse: NOR-WAY Bussekspress AS
                     Karl Johans gate 16, 0154 Oslo <br />
                    E-post: kundeservice@norway.no <br /> {/* E-posten er bare funnet på */}
                     Telefonnummer: 22 31 31 50 <br />
                        Telefontider: <br />
                        mandag–fredag kl. 08:00 – 19:00 <br />
                        lørdag kl 09:00 - 15:00
                    </p>
                </div>
            </div>
        );
    }
}