import Pokemon from "../model/Pokemon";
import IRankable from "./IRankable";
import Ability from "../model/Ability";
import Item from "../model/Item";
import Move from "../model/Move";
import Spread from "../model/Spread";
import TeamMate from "../model/TeamMate";
import IAssociativeArray from "./IAssociativeArray";
import DataSorter from "./DataSorter";

interface SmogonFile {
    data: IAssociativeArray;
    info: object;
}

export default class StatParser {
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
    
    public ParseStats(file: any): Map<string, Pokemon> {
        let parsed: SmogonFile = JSON.parse(file); 
      
        let stats = new Map<string, Pokemon>();
        let temp = new Array<Pokemon>();

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

            // teammate stats are % of teams with A that also have B - % of teams with B
            let teamMates = new Array<TeamMate>();
            Object.keys(data.Teammates).forEach(key => {
                teamMates.push(new TeamMate({
                    name: key, 
                    usageRate: this.calculatePercentage(statBase, data.Teammates[key])
                }));
            });

            // We need to create an object using the constructor, otherwise its functions won't be available
            let pokemon = new Pokemon({
                name: entry,
                abilities: DataSorter.sortByUsage(abilities, true),
                checks_And_Counters: data["Checks and Counters"],
                happiness: data.Happiness,
                items: DataSorter.sortByUsage(items, true),
                moves: DataSorter.sortByUsage(moves, true),
                raw_Count: data["Raw count"],
                spreads: DataSorter.sortByUsage(spreads, true),
                teamMates: DataSorter.sortByUsage(teamMates, true),
                usageRate: data.usage,
                viability_Ceiling: data["Viability Ceiling"] 
            });
          
            temp.push(pokemon);
        }

        DataSorter.sortByName(temp).forEach(p => {
            stats.set(p.name, p);
        });

        return stats;
    }
}