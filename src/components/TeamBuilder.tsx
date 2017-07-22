import * as React from "react";
import { ButtonGroup } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { MenuItem } from "react-bootstrap";
import { Well } from "react-bootstrap";
import { Pokemon } from "../model/Pokemon";
import { PokemonSlot } from "./PokemonSlot";

export interface TeamBuilderProps {
    pokemon: Array<Pokemon>;
 }

class TeamBuilderState {

}

export class TeamBuilder extends React.PureComponent<TeamBuilderProps, TeamBuilderState> {
    constructor(props: TeamBuilderProps){
        super(props);

        this.state = {
        };
    }

    render(){
        var slots = [];

        for (let i = 0; i < 6; i++) {
            slots.push(<PokemonSlot key={"Pokemon_Slot_" + i} pokemon={this.props.pokemon} />);
        }

        var content =
            (<div>
                <Well>
                    <ButtonGroup>
                        <DropdownButton title="Propose Team" id="proposeTeamButton">
                            <MenuItem onClick={() => this.setState({})} eventKey="1">Name</MenuItem>
                        </DropdownButton>
                    </ButtonGroup>
                </Well>
                { slots }
            </div>);

        return content;
    }
}
