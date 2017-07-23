import * as React from "react";
import { ButtonGroup, DropdownButton, Button, Well } from "react-bootstrap";
import { Pokemon } from "../model/Pokemon";
import { PokemonSlot } from "./PokemonSlot";
import { TeamProposer } from "../domain/TeamProposer";

export interface TeamBuilderProps {
    pokemon: Map<string, Pokemon>;
 }

class TeamBuilderState {
    slots: Array<PokemonSlot>;
}

export class TeamBuilder extends React.PureComponent<TeamBuilderProps, TeamBuilderState> {
    constructor(props: TeamBuilderProps){
        super(props);

        this.state = {
            slots: new Array<PokemonSlot>()
        };
        
        this.proposeTeam = this.proposeTeam.bind(this);
        this.resetAllSlots = this.resetAllSlots.bind(this);
    }

    proposeTeam() {
        var currentTeam = this.state.slots.map(s => s.state.pokemon);

        var proposedTeam = TeamProposer.proposeByTeammateStats(currentTeam, this.props.pokemon);

        for (let i = 0; i < this.state.slots.length; i++) {
            let slot = this.state.slots[i];

            slot.setState({pokemon: proposedTeam[i]});
        }
    }

    resetAllSlots() {
        this.state.slots.forEach(slot => {
            slot.setState({pokemon: null});
        })
    }

    render(){
        var slots = [];

        for (let i = 0; i < 6; i++) {
            slots.push(<PokemonSlot ref={(slot) => this.state.slots.push(slot)} key={"Pokemon_Slot_" + i} slotNumber={i} pokemon={this.props.pokemon} />);
        }

        var content =
            (<div>
                <Well>
                    <ButtonGroup>
                        <Button onClick={() => this.proposeTeam()} id="proposeTeamButton">Propose Team</Button>
                        <Button id="exportShowDownButton">Export to ShowDown</Button>
                        <Button id="importShowDownButton">Import from ShowDown</Button>
                        <Button onClick={() => this.resetAllSlots()} id="clearButton">Clear</Button>
                    </ButtonGroup>
                </Well>
                { slots }
            </div>);

        return content;
    }
}
