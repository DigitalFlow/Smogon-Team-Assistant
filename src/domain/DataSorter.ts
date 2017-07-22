import { IRankable } from "../model/IRankable";
import { Pokemon } from "../model/Pokemon";

export module DataSorter {
    export function sortByUsage<U extends IRankable>(data: Array<U>, descending?: boolean) {
        var multiplier = descending ? -1 : 1;

        return data.slice(0).sort((a, b) => { 
            if (a.usageRate < b.usageRate) {
                return 1 * multiplier;
            }

            if (a.usageRate > b.usageRate) {
                return -1 * multiplier;
            }

            return 0;
        });
    }

    export function sortByName(data: Array<Pokemon>) {
        return data.slice(0).sort((pokeA, pokeB) => pokeA.name.localeCompare(pokeB.name));
    }
}