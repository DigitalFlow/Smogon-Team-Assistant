import * as React from "react";
import { Modal, ButtonGroup, DropdownButton, Button, Well } from "react-bootstrap";
import Pokemon from "../model/Pokemon";
import PokemonSlot from "./PokemonSlot";
import TeamProposer from "../domain/TeamProposer";

export interface TeamBuilderProps {
    pokemon: Map<string, Pokemon>;
 }

class TeamBuilderState {
    slots: Array<PokemonSlot>;
    showExport: boolean;
}

export default class TeamBuilder extends React.PureComponent<TeamBuilderProps, TeamBuilderState> {
    constructor(props: TeamBuilderProps){
        super(props);

        this.state = {
            slots: new Array<PokemonSlot>(),
            showExport: false
        };
        
        this.proposeTeam = this.proposeTeam.bind(this);
        this.resetAllSlots = this.resetAllSlots.bind(this);
        this.exportTeam = this.exportTeam.bind(this);
        this.close = this.close.bind(this);
    }

    proposeTeam() {
        var currentTeam = this.state.slots.map(s => s.state.pokemon);

        var proposedTeam = TeamProposer.proposeByTeammateStats(currentTeam, this.props.pokemon);

        for (let i = 0; i < this.state.slots.length; i++) {
            let slot = this.state.slots[i];

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
        this.state.slots.forEach(slot => {
            slot.setState({pokemon: null});
        });
    }

    render(){
        var slots = [];

        for (let i = 0; i < 6; i++) {
            slots.push(<PokemonSlot ref={(slot) => this.state.slots.push(slot)} key={"Pokemon_Slot_" + i} slotNumber={i} pokemon={this.props.pokemon} />);
        }

        let teamExport = this.state.slots.map(slot => {
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
                        <Button onClick={this.proposeTeam} id="proposeTeamButton">Propose Team</Button>
                        <Button onClick={this.exportTeam} id="exportShowDownButton">Export to ShowDown</Button>
                        <Button id="importShowDownButton">Import from ShowDown</Button>
                        <Button onClick={this.resetAllSlots} id="clearButton">Clear</Button>
                    </ButtonGroup>
                </Well>
                { slots }
            </div>);

        return content;
    }
}
