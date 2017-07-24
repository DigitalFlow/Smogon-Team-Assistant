import * as React from "react";
import Pokemon from "../Model/Pokemon";
import { Button, Panel, Grid, Row, Col, Tabs, Tab, Table } from "react-bootstrap";
import IRankableView from "./IRankableView";
import IRankable from "../domain/IRankable";

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
export default class PokemonDetail extends React.PureComponent<PokemonDetailProps, PokemonDetailState> {
    constructor(props: PokemonDetailProps) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    filterByUsageRate<T extends IRankable>(data: Array<T>){
        return data.filter(element => {
            return element.usageRate > 0.1;
        })
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
            // Inside content, array index 1 of Viability Ceiling is used, as this is the top GXE
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
                                                <td>Usage Rate (weighted)</td>
                                                <td>{this.props.pokemon.usageRate}</td>
                                            </tr>
                                            <tr>
                                                <td>Raw Count</td>
                                                <td>{this.props.pokemon.raw_Count}</td>
                                            </tr>
                                            <tr>
                                                <td>Viability Ceiling</td>
                                                <td>{this.props.pokemon.viability_Ceiling[1]}</td>
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
                                            {this.filterByUsageRate(this.props.pokemon.moves)
                                                .map(IRankableView)}
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
                                            {this.props.pokemon.abilities
                                                .map(IRankableView)}
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
                                            {this.filterByUsageRate(this.props.pokemon.items)
                                                .map(IRankableView)}
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
                                            {this.filterByUsageRate(this.props.pokemon.spreads)
                                                .map(IRankableView)}
                                        </tbody>
                                    </Table>
                                </Tab>
                                <Tab key={this.props.pokemon + "TeamMatesTab"} eventKey={6} title="Team Mates">
                                    <Table striped bordered condensed hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Teams with {this.props.pokemon.name} and X (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.filterByUsageRate(this.props.pokemon.teamMates)
                                                .map(IRankableView)}
                                        </tbody>
                                    </Table>
                                </Tab>
                                <Tab key={this.props.pokemon + "CountersTab"} eventKey={7} title="Checks and Counters">
                                    <Table striped bordered condensed hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Counter Score</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.filterByUsageRate(this.props.pokemon.checks_And_Counters)
                                                .map(IRankableView)}
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