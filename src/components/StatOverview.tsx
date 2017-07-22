import * as React from "react";
import { ButtonGroup } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { MenuItem } from "react-bootstrap";
import { Pokemon } from "../model/Pokemon";
import { PokemonDetail } from "./PokemonDetail";
import { DataSorter } from "../domain/DataSorter";

export enum OrderBy {
    Name = 1,
    Usage = 2
}

export interface StatOverviewProps {
    pokemon: Array<Pokemon>;
 }

class StatOverviewState {
    orderBy: OrderBy;
}

export class StatOverview extends React.PureComponent<StatOverviewProps, StatOverviewState> {
    constructor(props: StatOverviewProps){
        super(props);

        this.state = {
            orderBy: OrderBy.Name
        };
    }

    mapPokeDetail(poke: Pokemon){
        return (<PokemonDetail key={poke.name + "_Detail"} pokemon={poke} />);
    }

    render(){
        let pokeDetails = null;

        if (this.state.orderBy === OrderBy.Name) {
            pokeDetails = DataSorter.sortByName(this.props.pokemon).map(this.mapPokeDetail);
        } else {
            pokeDetails = DataSorter.sortByUsage(this.props.pokemon).map(this.mapPokeDetail);                        
        }

        var content =
            (<div>
                <ButtonGroup>
                    <DropdownButton title="Order By" id="statOverviewOrderBy">
                        <MenuItem onClick={() => this.setState({orderBy: OrderBy.Name})} eventKey="1">Name</MenuItem>
                        <MenuItem onClick={() => this.setState({orderBy: OrderBy.Usage})} eventKey="2">Usage</MenuItem>
                    </DropdownButton>
                </ButtonGroup>
                { pokeDetails }
            </div>);

        return content;
    }
}
