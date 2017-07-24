import * as React from "react";
import { ButtonGroup, DropdownButton, MenuItem, Well } from "react-bootstrap";
import Pokemon from "../model/Pokemon";
import PokemonDetail from "./PokemonDetail";
import DataSorter from "../domain/DataSorter";

export enum OrderBy {
    Name = 1,
    Usage = 2,
    ViabilityCeiling = 3
}

export interface StatOverviewProps {
    pokemon: Map<string, Pokemon>;
 }

class StatOverviewState {
    orderBy: OrderBy;
    descendingOrder: boolean;
}

export default class StatOverview extends React.PureComponent<StatOverviewProps, StatOverviewState> {
    constructor(props: StatOverviewProps){
        super(props);

        this.state = {
            orderBy: OrderBy.Name,
            descendingOrder: false
        };
    }

    mapPokeDetail(poke: Pokemon){
        return (<PokemonDetail key={poke.name + "_Detail"} pokemon={poke} />);
    }

    render(){
        let pokeDetails = null;
        let pokemon = this.props.pokemon.values();

        switch(this.state.orderBy){
            case OrderBy.Name:
                pokeDetails = DataSorter.sortByName(pokemon, this.state.descendingOrder).map(this.mapPokeDetail);
                break;
            case OrderBy.Usage:
                pokeDetails = DataSorter.sortByUsage(pokemon, this.state.descendingOrder).map(this.mapPokeDetail);                        
                break;
            case OrderBy.ViabilityCeiling:
                pokeDetails = DataSorter.sortByViabilityCeiling(pokemon, this.state.descendingOrder).map(this.mapPokeDetail);                        
                break;
            default:
                throw new Error(this.state.orderBy + " is not a valid order by value");
        }

        var content =
            (<div>
                <Well>
                    <ButtonGroup>
                        <DropdownButton title="Order By" id="statOverviewOrderBy">
                            <MenuItem onClick={() => this.setState({orderBy: OrderBy.Name})} eventKey="1">Name</MenuItem>
                            <MenuItem onClick={() => this.setState({orderBy: OrderBy.Usage})} eventKey="2">Usage</MenuItem>
                            <MenuItem onClick={() => this.setState({orderBy: OrderBy.ViabilityCeiling})} eventKey="3">Viability Ceiling</MenuItem>
                        </DropdownButton>
                        <DropdownButton title="Order Direction" id="statOverviewOrderDirection">
                            <MenuItem onClick={() => this.setState({descendingOrder: false})} eventKey="1">Ascending</MenuItem>
                            <MenuItem onClick={() => this.setState({descendingOrder: true})} eventKey="2">Descending</MenuItem>
                        </DropdownButton>
                    </ButtonGroup>
                </Well>
                <Well>
                    { pokeDetails }
                </Well>
            </div>);

        return content;
    }
}
