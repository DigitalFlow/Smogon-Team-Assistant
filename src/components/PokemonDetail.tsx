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
import { AbilityView } from "./AbilityView";
import { ItemView } from "./ItemView";
import { MoveView } from "./MoveView";
import { SpreadView } from "./SpreadView";
import { TeamMateView } from "./TeamMateView";

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
        <div key={this.pokemon.Name + "_Detail"}>
            <Button onClick={ ()=> this.setState({ expanded: !this.state.expanded })}>
                {this.pokemon.Name}
            </Button>
            <Panel collapsible expanded={this.state.expanded}>
                <Grid>
                    <Row className="show-grid">
                        <Col>
                            {image}
                        </Col>
                        <Col>
                            <Tabs defaultActiveKey={1} id={this.pokemon.Name + "Tabs"}>
                                <Tab key={this.pokemon + "GeneralTab"} eventKey={1} title="General">
                                    Name: {this.pokemon.Name}<br />
                                    Usage Rate: {this.pokemon.Usage}
                                </Tab>
                                <Tab key={this.pokemon + "MovesTab"} eventKey={2} title="Moves">
                                    Moves (Usage Rate %):<br />
                                    {this.pokemon.Moves.map(move => <MoveView move={move}/>)}
                                </Tab>
                                <Tab key={this.pokemon + "AbilitiesTab"} eventKey={3} title="Abilities">
                                    Abilities (Usage Rate %):<br />
                                    {this.pokemon.Abilities.map(ability => <AbilityView ability={ability}/>)}
                                </Tab>
                                <Tab key={this.pokemon + "ItemsTab"} eventKey={4} title="Items">
                                    Items (Usage Rate %):<br />
                                    {this.pokemon.Items.map(item => <ItemView item={item}/>)}
                                </Tab>
                                <Tab key={this.pokemon + "SpreadsTab"} eventKey={5} title="Spreads">
                                    Spreads (Usage Rate %):<br />
                                    {this.pokemon.Spreads.map(spread => <SpreadView spread={spread}/>)}
                                </Tab>
                                <Tab key={this.pokemon + "TeamMatesTab"} eventKey={6} title="Team Mates">
                                    Team Mates (Usage Rate %):<br />
                                    {this.pokemon.TeamMates.map(tM => <TeamMateView teamMate={tM}/>)}
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Grid>
            </Panel>
        </div>);
    }
}