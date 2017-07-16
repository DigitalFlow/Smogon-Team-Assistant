import * as React from "react";
import { Pokemon } from "../Model/Pokemon";
import { PokemonProps } from "../Model/Pokemon";
import { Button } from "react-bootstrap";
import { Panel } from "react-bootstrap";

export interface PokemonDetailProps { 
    pokemon: Pokemon;
}

class PokemonDetailState {
    expanded: boolean
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class PokemonDetail extends React.Component<PokemonDetailProps, PokemonDetailState> implements PokemonDetailProps {
    pokemon: Pokemon;

    constructor(props: PokemonDetailProps) {
        super(props);
        this.pokemon = props.pokemon;
        this.state = {
            expanded: false
        }
    }

    render(){
        let image = null;

        if (this.state.expanded) {
            image = <img src={this.pokemon.GetImageUrl()} />;
        }

        return (
        <div>
            <Button onClick={ ()=> this.setState({ expanded: !this.state.expanded })}>
                {this.pokemon.Name}
            </Button>
            <Panel collapsible expanded={this.state.expanded}>
                {image}
                {this.pokemon.Name}
                {this.pokemon.Viability_Ceiling}
            </Panel>
        </div>);
    }
}