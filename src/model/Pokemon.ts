import { Ability } from "./Ability"
import { Item } from "./Item"
import { Move } from "./Move"
import { Spread } from "./Spread"
import { TeamMate } from "./TeamMate"

export interface PokemonProps {
    Name: string; 
    Abilities: Array<Ability>;
    Checks_And_Counters: object;
    Happiness: object;
    Items: Array<Item>;
    Moves: Array<Move>;
    Raw_Count:number;
    Spreads: Array<Spread>;
    TeamMates: Array<TeamMate>;
    Viability_Ceiling: Array<number>
    Usage: number;
}

export class Pokemon implements PokemonProps {
    Name: string; 
    Abilities: Array<Ability>;
    Checks_And_Counters: object;
    Happiness: object;
    Items: Array<Item>;
    Moves: Array<Move>;
    Raw_Count:number;
    Spreads: Array<Spread>;
    TeamMates: Array<TeamMate>;
    Viability_Ceiling: Array<number>
    Usage: number;

    constructor(parameters: PokemonProps){
        this.Name = parameters.Name;
        this.Abilities = parameters.Abilities;
        this.Checks_And_Counters = parameters.Checks_And_Counters;
        this.Happiness = parameters.Happiness;
        this.Items = parameters.Items;
        this.Moves = parameters.Moves;
        this.Raw_Count = parameters.Raw_Count;
        this.Spreads = parameters.Spreads;
        this.TeamMates = parameters.TeamMates;
        this.Viability_Ceiling = parameters.Viability_Ceiling;
        this.Usage = parameters.Usage;
    }

    public GetImageUrl() : string {
        return `http://www.smogon.com/dex/media/sprites/xy/${this.Name
            .toLowerCase()
            .replace(' ', "_")
            .replace('%', '')}.gif`;
    }
}