import * as React from "react";
import { Well, MenuItem, Grid, DropdownButton, ButtonGroup, Col, Row } from "react-bootstrap";
import Select = require("react-select");
import Pokemon from "../model/Pokemon";
import PokemonDetail from "./PokemonDetail";

export interface PokemonSlotProps {
    slotNumber: number;
    pokemon: Map<string, Pokemon>;
 }

class PokemonSlotState {
    pokemon: Pokemon;
}

export default class PokemonSlot extends React.PureComponent<PokemonSlotProps, PokemonSlotState> {
    constructor(props: PokemonSlotProps){
        super(props);

        this.state = {
            pokemon: null
        };
    }

    render(){
        let image = null;
        let name = null;
        let statDetail = null;

        if(this.state.pokemon) {
            image = <img src={this.state.pokemon.GetImageUrl()} />;
            name = this.state.pokemon.name;
            statDetail = <PokemonDetail key={this.props.slotNumber + "_Stats"} hideImage={true} buttonName={"Stats"} pokemon={this.state.pokemon} />
        }

        let options = Array.from(this.props.pokemon.keys())
            .map(name => { return {value: name, label: name}});

        let content = (
            <div>
                <Well>
                    { image }
                    <Grid>
                        <Row className="show-grid">
                            <Col>
                                <Select
                                    name={this.props.slotNumber + "pokemonSelect"}
                                    options={options}
                                    value={name}
                                    onChange={(event: any) => this.setState({pokemon: this.props.pokemon.get(event.value)})}
                                />
                            </Col>
                        </Row>
                    </Grid>
                    { statDetail }
                </Well>
            </div>);

        return content;
    }
}
