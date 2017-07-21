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
import { Jumbotron } from "react-bootstrap";
import { Ability } from "../model/Ability";
import { Item } from "../model/Item";
import { Move } from "../model/Move";
import { Spread } from "../model/Spread";
import { TeamMate } from "../model/TeamMate";
import { IRankable } from "../model/IRankable";

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

    calculateAggregateSum (data: Array<number>) {
        var sum = data.reduce(function(acc: number, val: number) {
            return acc + val;
        }, 0);

        return sum;
    }

    calculateObjectBase(obj: any) {
        return this.calculateAggregateSum(Object.keys(obj).map(key => obj[key]));
    }

    calculatePercentage(base: number, value: number) {
         return value / base * 100;
    }

    sortByUsage(data: Array<IRankable>, descending?: boolean) {
        var multiplier = descending ? -1 : 1;

        return data.sort((a, b) => { 
            if (a.usageRate < b.usageRate) {
                return 1 * multiplier;
            }

            if (a.usageRate > b.usageRate) {
                return -1 * multiplier;
            }

            return 0;
        });
    }

    receivedText(e: Event) {
      let target: any = e.target;
      let parsed: SmogonFile = JSON.parse(target.result); 
      
      let temp: Array<Pokemon> = [];

      for(let entry in parsed.data)
      {
            let data = parsed.data[entry];

            let abilities = new Array<Ability>();
            let abilityBase = this.calculateObjectBase(data.Abilities);

            Object.keys(data.Abilities).forEach(key => {
                abilities.push(new Ability({
                    name: key, 
                    usageRate: this.calculatePercentage(abilityBase, data.Abilities[key])
                }));
            });

            let items = new Array<Item>();
            let itemBase = this.calculateObjectBase(data.Items);
            Object.keys(data.Items).forEach(key => {
                items.push(new Item({
                    name: key, 
                    usageRate: this.calculatePercentage(itemBase, data.Items[key])
                }));
            });

            let moves = new Array<Move>();
            let moveBase = this.calculateObjectBase(data.Moves);
            Object.keys(data.Moves).forEach(key => {
                moves.push(new Move({
                    name: key, 
                    usageRate: this.calculatePercentage(moveBase, data.Moves[key])
                }));
            });

            let spreads = new Array<Spread>();
            let spreadBase = this.calculateObjectBase(data.Spreads);
            Object.keys(data.Spreads).forEach(key => {
                spreads.push(new Spread({
                    name: key, 
                    usageRate: this.calculatePercentage(spreadBase, data.Spreads[key])
                }));
            });

            let teamMates = new Array<TeamMate>();
            let teamMateBase = this.calculateObjectBase(data.Teammates);
            Object.keys(data.Teammates).forEach(key => {
                teamMates.push(new TeamMate({
                    name: key, 
                    usageRate: this.calculatePercentage(teamMateBase, data.Teammates[key])
                }));
            });

            // We need to create an object using the constructor, otherwise its functions won't be available
            let pokemon = new Pokemon({
                Name: entry,
                Abilities: this.sortByUsage(abilities),
                Checks_And_Counters: data["Checks and Counters"],
                Happiness: data.Happiness,
                Items: this.sortByUsage(items),
                Moves: this.sortByUsage(moves),
                Raw_Count: data["Raw count"],
                Spreads: this.sortByUsage(spreads),
                TeamMates: this.sortByUsage(teamMates, true),
                Usage: data.usage,
                Viability_Ceiling: data["Viability Ceiling"] 
            });
          
            temp.push(pokemon);
      }

      var sorted = temp.sort((pokeA, pokeB) => pokeA.Name.localeCompare(pokeB.Name));

      this.setState({pokemon: sorted});
    }

    render() {
        let content = null;

        if (this.state.pokemon.length > 0) {
            content = this.state.pokemon.map(poke => <PokemonDetail pokemon={poke} />);
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
                { content }
            </div>
        </div>);
    }
}