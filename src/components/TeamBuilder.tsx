import * as React from "react";
import { MenuItem, Modal, ButtonGroup, DropdownButton, Button, Well } from "react-bootstrap";
import Pokemon from "../model/Pokemon";
import PokemonSlot from "./PokemonSlot";
import TeamProposer from "../domain/TeamProposer";

export interface TeamBuilderProps {
    pokemon: Map<string, Pokemon>;
 }

 enum ProposalStrategie {
    ByTeamMate,
    ByCounter,
    Balanced
 }

class TeamBuilderState {
    slot1: PokemonSlot;
    slot2: PokemonSlot;
    slot3: PokemonSlot;
    slot4: PokemonSlot;
    slot5: PokemonSlot;
    slot6: PokemonSlot;
    showExport: boolean;
    proposalStrategie: ProposalStrategie;
}

export default class TeamBuilder extends React.PureComponent<TeamBuilderProps, TeamBuilderState> {
    constructor(props: TeamBuilderProps){
        super(props);

        this.state = {
            slot1: null,
            slot2: null,
            slot3: null,
            slot4: null,
            slot5: null,
            slot6: null,
            showExport: false,
            proposalStrategie: ProposalStrategie.ByTeamMate
        };
        
        this.proposeTeam = this.proposeTeam.bind(this);
        this.resetAllSlots = this.resetAllSlots.bind(this);
        this.exportTeam = this.exportTeam.bind(this);
        this.close = this.close.bind(this);
        this.getSlots = this.getSlots.bind(this);
    }

    getSlots(){
        return [this.state.slot1, this.state.slot2, this.state.slot3, 
            this.state.slot4, this.state.slot5, this.state.slot6];
    }

    proposeTeam() {
        let slots = this.getSlots();

        let currentTeam = slots.map(s => s.state.pokemon);

        var proposedTeam = null;
        
        switch (this.state.proposalStrategie) {
            case ProposalStrategie.ByTeamMate:
                proposedTeam = TeamProposer.proposeByTeammate(currentTeam, this.props.pokemon);
                break;
            case ProposalStrategie.ByCounter:
                proposedTeam = TeamProposer.proposeByCounter(currentTeam, this.props.pokemon);
                break;
            case ProposalStrategie.Balanced:
                proposedTeam = TeamProposer.proposeBalanced(currentTeam, this.props.pokemon);
                break;
            default:
                throw new Error("No strategie defined for " + this.state.proposalStrategie);
        }

        for (let i = 0; i < proposedTeam.length; i++) {
            let slot = slots[i];

            slot.setState({pokemon: proposedTeam[i]});
        }
    }

    exportTeam() {
        this.setState({showExport: true})
    }

    close() {
        this.setState({ showExport: false });
    }

    resetAllSlots() {
        this.getSlots().forEach(slot => {
            slot.setState({pokemon: null});
        });
    }

    render(){
        let teamExport = this.getSlots().map(slot => {
            if (!slot || !slot.state || !slot.state.pokemon) {
               return <p/>;
            }

            let memberConfig = slot.state.form.state;
            let nature = null;
            let spread = null;

            if(memberConfig.spread) {
                nature = memberConfig.spread.substr(0, memberConfig.spread.indexOf(':'));
                let stats = memberConfig.spread.replace(nature + ":", "").split("/");

                let labels = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];

                var values = labels.map(function (e, i) {
                    return {label: e, value:  parseInt(stats[i])};
                })
                .filter((stat) => { return stat.value > 0 })
                .map(stat => { return `${stat.label} ${stat.value}` });

                spread = values.join(" / ");
            }

            return (<p>{slot.state.pokemon.name} @ {memberConfig.item}<br/>
                Ability: {memberConfig.ability}<br/>
                EVs: {spread}<br/>
                {nature} Nature<br/>
                - {memberConfig.move1}<br/>
                - {memberConfig.move2}<br/>
                - {memberConfig.move3}<br/>
                - {memberConfig.move4}<br/><br />
            </p>);
        });

        var content =
            (<div>
                <Modal show={this.state.showExport} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Showdown Export</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {teamExport}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Well>
                    <ButtonGroup>
                        <DropdownButton title="Proposal Strategie" id="proposalStrategieDropdown">
                            <MenuItem onClick={() => this.setState({proposalStrategie: ProposalStrategie.ByTeamMate})} eventKey="1">By Teammate</MenuItem>
                            <MenuItem onClick={() => this.setState({proposalStrategie: ProposalStrategie.ByCounter})} eventKey="2">By Counter</MenuItem>
                            <MenuItem onClick={() => this.setState({proposalStrategie: ProposalStrategie.Balanced})} eventKey="3">Balanced</MenuItem>
                        </DropdownButton>
                        <Button onClick={this.proposeTeam} id="proposeTeamButton">Propose Team</Button>
                        <Button onClick={this.exportTeam} id="exportShowDownButton">Export to ShowDown</Button>
                        <Button onClick={this.resetAllSlots} id="clearButton">Clear</Button>
                    </ButtonGroup>
                </Well>
                    <PokemonSlot ref={(s => {this.setState({slot1: s})})} pokemon={this.props.pokemon} slotNumber={1} />
                    <PokemonSlot ref={(s => {this.setState({slot2: s})})} pokemon={this.props.pokemon} slotNumber={2} />
                    <PokemonSlot ref={(s => {this.setState({slot3: s})})} pokemon={this.props.pokemon} slotNumber={3} />
                    <PokemonSlot ref={(s => {this.setState({slot4: s})})} pokemon={this.props.pokemon} slotNumber={4} />
                    <PokemonSlot ref={(s => {this.setState({slot5: s})})} pokemon={this.props.pokemon} slotNumber={5} />
                    <PokemonSlot ref={(s => {this.setState({slot6: s})})} pokemon={this.props.pokemon} slotNumber={6} />
            </div>);

        return content;
    }
}
