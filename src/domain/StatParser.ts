import { Pokemon } from "../model/Pokemon";
import { IRankable } from "../model/IRankable";
import { Ability } from "../model/Ability";
import { Item } from "../model/Item";
import { Move } from "../model/Move";
import { Spread } from "../model/Spread";
import { TeamMate } from "../model/TeamMate";
import { IAssociativeArray } from "../model/IAssociativeArray";

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

    private sortByUsage(data: Array<IRankable>, descending?: boolean) {
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
    
    public ParseStats(file: any): Array<Pokemon> {
        let parsed: SmogonFile = JSON.parse(file); 
      
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

        return sorted;
    }
}