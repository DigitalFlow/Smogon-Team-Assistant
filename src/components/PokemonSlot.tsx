import * as React from "react";
import { MenuItem, Grid, DropdownButton, ButtonGroup, Col, Row } from "react-bootstrap";
import Select = require("react-select");
import { Pokemon } from "../model/Pokemon";

export interface PokemonSlotProps {
    pokemon: Map<string, Pokemon>;
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
        let image = null;

        if(this.state.pokemon) {
            image = <img src={this.state.pokemon.GetImageUrl()} />;
        }

        let options = Array.from(this.props.pokemon.keys())
            .map(name => { return {value: name, label: name}});

        let content = (<div>
            <Grid>
                <Row className="show-grid">
                    <Col>
                        { image }
                    </Col>
                    <Col>
                        <Select
                            name={"pokemonSelect"}
                            options={options}
                            onChange={(event: any) => this.setState({pokemon: this.props.pokemon.get(event.value)})}
                        />
                    </Col>
                </Row>
            </Grid>
        </div>);

        return content;
    }
}
