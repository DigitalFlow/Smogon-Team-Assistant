import Ability from "./Ability"
import Item from "./Item"
import Move from "./Move"
import Spread from "./Spread"
import TeamMate from "./TeamMate"
import Counter from "./Counter"
import IRankable from "../domain/IRankable"

export interface PokemonProps {
    name: string; 
    abilities: Array<Ability>;
    checks_And_Counters: Array<Counter>;
    happiness: object;
    items: Array<Item>;
    moves: Array<Move>;
    raw_Count:number;
    spreads: Array<Spread>;
    teamMates: Array<TeamMate>;
    viability_Ceiling: Array<number>
    usageRate: number;
}

export default class Pokemon implements PokemonProps, IRankable {
    name: string; 
    abilities: Array<Ability>;
    checks_And_Counters: Array<Counter>;
    happiness: object;
    items: Array<Item>;
    moves: Array<Move>;
    raw_Count:number;
    spreads: Array<Spread>;
    teamMates: Array<TeamMate>;
    viability_Ceiling: Array<number>
    usageRate: number;

    constructor(parameters: PokemonProps){
        this.name = parameters.name;
        this.abilities = parameters.abilities;
        this.checks_And_Counters = parameters.checks_And_Counters;
        this.happiness = parameters.happiness;
        this.items = parameters.items;
        this.moves = parameters.moves;
        this.raw_Count = parameters.raw_Count;
        this.spreads = parameters.spreads;
        this.teamMates = parameters.teamMates;
        this.viability_Ceiling = parameters.viability_Ceiling;
        this.usageRate = parameters.usageRate;
    }

    public GetImageUrl() : string {
        return `http://www.smogon.com/dex/media/sprites/xy/${this.name
            .toLowerCase()
            .replace(' ', "_")
            .replace('%', '')}.gif`;
    }
}