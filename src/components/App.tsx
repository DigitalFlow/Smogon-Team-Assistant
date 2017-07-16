import * as React from "react";
import { PokemonDetail } from "./PokemonDetail";
import { PokemonDetailProps } from "./PokemonDetail";
import { Pokemon } from "../model/pokemon";
import { IAssociativeArray } from "../model/IAssociativeArray";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavItem } from "react-bootstrap";
import { MenuItem } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Ability } from "../model/Ability";
import { Item } from "../model/Item";
import { Move } from "../model/Move";
import { Spread } from "../model/Spread";
import { TeamMate } from "../model/TeamMate";

export interface AppProps { }

interface SmogonFile {
    data: IAssociativeArray;
    info: object;
}

class AppState {
    pokemon: Array<Pokemon>
}

export class App extends React.Component<AppProps, AppState> {
    fileInput: HTMLInputElement;

    constructor(props: AppProps){
        super(props);
        this.loadFile = this.loadFile.bind(this);
        this.receivedText = this.receivedText.bind(this);

        this.state = {
            pokemon: []
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
      let parsed: SmogonFile = JSON.parse(target.result); 
      
      let temp: Array<Pokemon> = [];

      for(let entry in parsed.data)
      {
            let data = parsed.data[entry];

            let abilities = new Array<Ability>();
            Object.keys(data.Abilities).forEach(key => {
                abilities.push(new Ability({name: key, usageRate: data.Abilities[key]}));
            });

            let items = new Array<Item>();
            Object.keys(data.Items).forEach(key => {
                items.push(new Item({name: key, usageRate: data.Items[key]}));
            });

            let moves = new Array<Move>();
            Object.keys(data.Moves).forEach(key => {
                moves.push(new Move({name: key, usageRate: data.Moves[key]}));
            });

            let spreads = new Array<Spread>();
            Object.keys(data.Spreads).forEach(key => {
                spreads.push(new Spread({name: key, usageRate: data.Spreads[key]}));
            });

            let teamMates = new Array<TeamMate>();
            Object.keys(data.Teammates).forEach(key => {
                teamMates.push(new TeamMate({name: key, usageRate: data.Teammates[key]}));
            });

            // We need to create an object using the constructor, otherwise its functions won't be available
            let pokemon = new Pokemon({
                Name: entry,
                Abilities: abilities,
                Checks_And_Counters: data["Checks and Counters"],
                Happiness: data.Happiness,
                Items: items,
                Moves: moves,
                Raw_Count: data["Raw count"],
                Spreads: spreads,
                TeamMates: teamMates,
                Usage: data.usage,
                Viability_Ceiling: data["Viability Ceiling"] 
            });
          
            temp.push(pokemon);
      }

      var sorted = temp.sort((pokeA, pokeB) => pokeA.Name.localeCompare(pokeB.Name));

      this.setState({pokemon: sorted});
    }

    render() {
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
                    <NavItem href="#">Stat Overview</NavItem>
                    <NavItem href="#">Team Builder</NavItem>
                    <NavDropdown title="Load file" id="basic-nav-dropdown">
                        <input type='file' id='fileinput' ref={(input) => { this.fileInput = input; }}/>
                        <input type='button' id='btnLoad' value='Load' onClick={this.loadFile}/>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div>
                {
                    this.state.pokemon.map(poke => <PokemonDetail pokemon={poke} />)
                }
            </div>
        </div>);
    }
}