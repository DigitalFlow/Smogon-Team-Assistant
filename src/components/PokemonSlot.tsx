import * as React from "react";
import { ButtonGroup } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Grid } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { MenuItem } from "react-bootstrap";
import { Pokemon } from "../model/Pokemon";

export interface PokemonSlotProps {
    pokemon: Array<Pokemon>;
 }

class PokemonSlotState {
    pokemon: Pokemon;
}

export class PokemonSlot extends React.PureComponent<PokemonSlotProps, PokemonSlotState> {
    constructor(props: PokemonSlotProps){
        super(props);

        this.state = {
            pokemon: null
        };
    }

    render(){
        var image = null;

        if(this.state.pokemon) {
            image = <img src={this.state.pokemon.GetImageUrl()} />;
        }

        let content = (<div>
            <Grid>
                <Row className="show-grid">
                    <Col>
                        { image }
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
            </Grid>
        </div>);

        return content;
    }
}
