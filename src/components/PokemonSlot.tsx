import * as React from "react";
import { ControlLabel, Well, MenuItem, Grid, DropdownButton, ButtonGroup, Col, Row } from "react-bootstrap";
import Select = require("react-select");
import Pokemon from "../model/Pokemon";
import PokemonDetail from "./PokemonDetail";
import PropertyForm from "./PropertyForm";

export interface PokemonSlotProps {
    slotNumber: number;
    pokemon: Map<string, Pokemon>;
 }

class PokemonSlotState {
    pokemon: Pokemon;
    form: PropertyForm;
}

export default class PokemonSlot extends React.PureComponent<PokemonSlotProps, PokemonSlotState> {
    constructor(props: PokemonSlotProps){
        super(props);

        this.state = {
            pokemon: null,
            form: null
        };

        this.onPokemonSelect = this.onPokemonSelect.bind(this);
        this.setForm = this.setForm.bind(this);
    }

    onPokemonSelect(event: any) {
        let pokemon = event ? this.props.pokemon.get(event.value) : null;
        
        this.setState({
            pokemon: pokemon,
        });
    }

    setForm(form: PropertyForm) {
        this.setState({form: form});
    }

    render(){
        let image = null;
        let name = null;
        let statDetail = null;
        let pokemon = this.state.pokemon;

        if(pokemon) {
            image = <img src={pokemon.GetImageUrl()} />;
            name = pokemon.name;
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
                                <ControlLabel className="col-sm-8">{"Pokemon"}</ControlLabel>
                                <Select
                                    name={this.props.slotNumber + "pokemonSelect"}
                                    options={options}
                                    value={name}
                                    onChange={this.onPokemonSelect}
                                />
                            </Col>
                        </Row>
                    </Grid>
                    <PropertyForm ref={this.setForm} key={this.props.slotNumber + "_PropertyForm"} pokemon={pokemon} />
                    { statDetail }
                </Well>
            </div>);

        return content;
    }
}
