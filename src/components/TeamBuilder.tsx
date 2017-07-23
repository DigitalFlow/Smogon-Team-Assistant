import * as React from "react";
import { ButtonGroup } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Well } from "react-bootstrap";
import { Pokemon } from "../model/Pokemon";
import { PokemonSlot } from "./PokemonSlot";

export interface TeamBuilderProps {
    pokemon: Map<string, Pokemon>;
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
            slots.push(<PokemonSlot key={"Pokemon_Slot_" + i} slotNumber={i} pokemon={this.props.pokemon} />);
        }

        var content =
            (<div>
                <Well>
                    <ButtonGroup>
                        <Button id="proposeTeamButton">Propose Team</Button>
                        <Button id="exportShowDownButton">Export to ShowDown</Button>
                        <Button id="importShowDownButton">Import from ShowDown</Button>
                    </ButtonGroup>
                </Well>
                { slots }
            </div>);

        return content;
    }
}
