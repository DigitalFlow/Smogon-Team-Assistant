import { Pokemon } from "../model/Pokemon";
import { IRankable } from "../model/IRankable";
import { Ability } from "../model/Ability";
import { Item } from "../model/Item";
import { Move } from "../model/Move";
import { Spread } from "../model/Spread";
import { TeamMate } from "../model/TeamMate";
import { IAssociativeArray } from "../model/IAssociativeArray";
import { DataSorter } from "./DataSorter";

interface SmogonFile {
    data: IAssociativeArray;
    info: object;
}

export class StatParser {
    private calculateAggregateSum (data: Array<number>) {
        var sum = data.reduce(function(acc: number, val: number) {
            return acc + val;
        }, 0);

        return sum;
    }

    private calculateObjectBase(obj: any) {
        return this.calculateAggregateSum(Object.keys(obj).map(key => obj[key]));
    }

    private calculatePercentage(base: number, value: number) {
         return value / base * 100;
    }
    
    public ParseStats(file: any): Array<Pokemon> {
        let parsed: SmogonFile = JSON.parse(file); 
      
        let temp: Array<Pokemon> = [];

        for(let entry in parsed.data)
        {
            let data = parsed.data[entry];

            // Stat base for the whole pokemon is easiest calculated using the sum of all abilities
            let statBase = this.calculateObjectBase(data.Abilities);

            let abilities = new Array<Ability>();
            Object.keys(data.Abilities).forEach(key => {
                abilities.push(new Ability({
                    name: key, 
                    usageRate: this.calculatePercentage(statBase, data.Abilities[key])
                }));
            });

            let items = new Array<Item>();
            Object.keys(data.Items).forEach(key => {
                items.push(new Item({
                    name: key, 
                    usageRate: this.calculatePercentage(statBase, data.Items[key])
                }));
            });

            let moves = new Array<Move>();
            Object.keys(data.Moves).forEach(key => {
                moves.push(new Move({
                    name: key, 
                    usageRate: this.calculatePercentage(statBase, data.Moves[key])
                }));
            });

            let spreads = new Array<Spread>();
            Object.keys(data.Spreads).forEach(key => {
                spreads.push(new Spread({
                    name: key, 
                    usageRate: this.calculatePercentage(statBase, data.Spreads[key])
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
                name: entry,
                abilities: DataSorter.sortByUsage(abilities),
                checks_And_Counters: data["Checks and Counters"],
                happiness: data.Happiness,
                items: DataSorter.sortByUsage(items),
                moves: DataSorter.sortByUsage(moves),
                raw_Count: data["Raw count"],
                spreads: DataSorter.sortByUsage(spreads),
                teamMates: DataSorter.sortByUsage(teamMates, true),
                usageRate: data.usage,
                viability_Ceiling: data["Viability Ceiling"] 
            });
          
            temp.push(pokemon);
        }

        var sorted = DataSorter.sortByName(temp);

        return sorted;
    }
}