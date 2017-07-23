import * as React from "react";
import { Pokemon } from "../Model/Pokemon";
import { PokemonProps } from "../Model/Pokemon";
import { Button } from "react-bootstrap";
import { Panel } from "react-bootstrap";
import { Grid } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { AbilityView } from "./AbilityView";
import { ItemView } from "./ItemView";
import { MoveView } from "./MoveView";
import { SpreadView } from "./SpreadView";
import { TeamMateView } from "./TeamMateView";

export interface PokemonDetailProps { 
    pokemon: Pokemon;
    buttonName?: string;
    hideImage?: boolean;
}

class PokemonDetailState {
    expanded: boolean
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class PokemonDetail extends React.PureComponent<PokemonDetailProps, PokemonDetailState> {
    constructor(props: PokemonDetailProps) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    shouldComponentUpdate(nextProps: PokemonDetailProps, nextState: PokemonDetailState){
        if (nextProps.pokemon != this.props.pokemon){
            return true;
        }

        if (nextState.expanded != this.state.expanded) {
            return true;
        }

        return false;
    }

    render(){
        let content = null;
        let buttonName = this.props.buttonName || this.props.pokemon.name;
        let image = null;

        if(!this.props.hideImage) {
            image = <img src={this.props.pokemon.GetImageUrl()} />;
        }

        if (this.state.expanded) {
            content = 
            <div>
                { image }
                <Grid>
                    <Row className="show-grid">
                        <Col>
                            <Tabs defaultActiveKey={1} id={this.props.pokemon.name + "Tabs"}>
                                <Tab key={this.props.pokemon + "GeneralTab"} eventKey={1} title="General">
                                    <Table striped bordered condensed hover>
                                        <thead>
                                            <tr>
                                                <th>Property</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{this.props.pokemon.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Usage Rate</td>
                                                <td>{this.props.pokemon.usageRate}</td>
                                            </tr>
                                            <tr>
                                                <td>Raw Count</td>
                                                <td>{this.props.pokemon.raw_Count}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Tab>
                                <Tab key={this.props.pokemon + "MovesTab"} eventKey={2} title="Moves">
                                    <Table striped bordered condensed hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Usage Rate (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.pokemon.moves.map(move => <MoveView move={move}/>)}
                                        </tbody>
                                    </Table>
                                </Tab>
                                <Tab key={this.props.pokemon + "AbilitiesTab"} eventKey={3} title="Abilities">
                                    <Table striped bordered condensed hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Usage Rate (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.pokemon.abilities.map(ability => <AbilityView ability={ability}/>)}
                                        </tbody>
                                    </Table>
                                </Tab>
                                <Tab key={this.props.pokemon + "ItemsTab"} eventKey={4} title="Items">
                                    <Table striped bordered condensed hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Usage Rate (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.pokemon.items.map(item => <ItemView item={item}/>)}
                                        </tbody>
                                    </Table>
                                </Tab>
                                <Tab key={this.props.pokemon + "SpreadsTab"} eventKey={5} title="Spreads">
                                    <Table striped bordered condensed hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Usage Rate (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.pokemon.spreads.map(spread => <SpreadView spread={spread}/>)}
                                        </tbody>
                                    </Table>
                                </Tab>
                                <Tab key={this.props.pokemon + "TeamMatesTab"} eventKey={6} title="Team Mates">
                                    <Table striped bordered condensed hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Usage Rate (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.pokemon.teamMates.map(tM => <TeamMateView teamMate={tM}/>)}
                                        </tbody>
                                    </Table>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Grid>
            </div>;
        }

        return (
        <div key={this.props.pokemon.name + "_Detail"}>
            <Button onClick={ ()=> this.setState({ expanded: !this.state.expanded })}>
                {buttonName}
            </Button>
            <Panel collapsible expanded={this.state.expanded}>
                {content}
            </Panel>
        </div>);
    }
}