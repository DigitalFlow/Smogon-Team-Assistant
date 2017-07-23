import * as React from "react";
import { PokemonDetail } from "./PokemonDetail";
import { PokemonDetailProps } from "./PokemonDetail";
import { StatOverview } from "./StatOverview";
import { TeamBuilder } from "./TeamBuilder";
import { Pokemon } from "../model/pokemon";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavItem } from "react-bootstrap";
import { MenuItem } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Jumbotron } from "react-bootstrap";
import { IRankable } from "../model/IRankable";
import { StatParser } from "../domain/StatParser";
import { DataSorter } from "../domain/DataSorter";

export interface AppProps { }

class AppState {
    pokemon: Map<string, Pokemon>;
    viewState: ViewState;
}

enum ViewState {
    StatOverview,
    TeamBuilder
}

export class App extends React.PureComponent<AppProps, AppState> {
    fileInput: HTMLInputElement;

    constructor(props: AppProps){
        super(props);
        this.loadFile = this.loadFile.bind(this);
        this.receivedText = this.receivedText.bind(this);

        this.state = {
            pokemon: new Map<string, Pokemon>(),
            viewState: ViewState.StatOverview
        };
    }

    loadFile() : void {
        if (!this.fileInput.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
            return;
        }
    
        let file = this.fileInput.files[0];

        if (!file) {
            alert("Please select a file before clicking 'Load'");
            return;
        }
    
        let fileReader = new FileReader();
        fileReader.onload = this.receivedText;
        fileReader.readAsText(file);
    }

    receivedText(e: Event) {
        let target: any = e.target;
        var parser = new StatParser();

        var pokemon = parser.ParseStats(target.result);

        this.setState({pokemon: pokemon});
    }

    render() {
        let content = null;

        if (this.state.pokemon.size > 0) {
            if (this.state.viewState === ViewState.StatOverview) {
                content = (<StatOverview key={"StatOverview"} pokemon={this.state.pokemon} />);
            }
            else {
                content = (<TeamBuilder key={"TeamBuilder"} pokemon={this.state.pokemon}/>);
            }
        }
        else {
            content = <Jumbotron>
                <h1>No data loaded!</h1>
                <p>For showing information, data from Smogon needs to be loaded.<br />
                Head over to <a href="http://www.smogon.com/stats/2017-06/chaos/">Smogon stats</a>, download the stats file you'd like and load it.</p>
            </Jumbotron>;
        }

        return (
        <div>
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Smogon Team Assistance</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav>
                    <NavItem onClick={() => {this.setState({viewState: ViewState.StatOverview})}}>Stat Overview</NavItem>
                    <NavItem onClick={() => {this.setState({viewState: ViewState.TeamBuilder})}}>Team Builder</NavItem>
                    <NavDropdown title="Load file" id="basic-nav-dropdown">
                        <input type='file' id='fileinput' ref={(input) => { this.fileInput = input; }}/>
                        <input type='button' id='btnLoad' value='Load' onClick={this.loadFile}/>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div>
                { content }
            </div>
        </div>);
    }
}