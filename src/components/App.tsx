import * as React from "react";
import StatOverview from "./StatOverview";
import TeamBuilder from "./TeamBuilder";
import Pokemon from "../model/pokemon";
import { Well, Navbar, Nav, NavItem, MenuItem, NavDropdown, Jumbotron } from "react-bootstrap";
import StatParser from "../domain/StatParser";

export interface AppProps { }

class AppState {
    pokemon: Map<string, Pokemon>;
    viewState: ViewState;
}

enum ViewState {
    StatOverview,
    TeamBuilder
}

export default class App extends React.PureComponent<AppProps, AppState> {
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
            content = 
                <Well>
                    <Jumbotron>
                        <h1>No data loaded!</h1>
                        <p>For showing information, data from Smogon needs to be loaded.<br />
                        Head over to <a href="http://www.smogon.com/stats/2017-06/chaos/">Smogon stats</a>, download the stats file you'd like and load it.</p>
                        <h2>But which file to choose?</h2>
                        <h3>Gen</h3>
                        <p>The gen part of the file name represents the Pokemon Generation that those stats are for.<br/>
                        Gen 7 is for Sun / Moon, Gen 6 for ORAS / XY, and so on.</p>
                        <h3>Tier</h3>
                        <p>There are different Tiers, which are calculated by usage. The Smogon standard tier is OU.<br/>
                        If you don't care for tiers, choose AG, as this has no Pokemon banned.</p>
                        <h3>Baseline</h3>
                        <p>The baseline represents a rating of the players that the stats were gathered from.<br/>
                        The higher the base line, the better the players that contributed to those stats.<br />
                        Obviously, for determining movesets etc. you'll want the highest base line stats.
                        However those most often don't contain any Checks and Counters data, so if you want to analyze these,
                        choose 0 or 1500 baseline stats.</p>
                    </Jumbotron>
                </Well>;
        }

        return (
        <div>
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Smogon Team Assistant</a>
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