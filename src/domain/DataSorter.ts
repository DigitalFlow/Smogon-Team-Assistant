import { IRankable } from "../model/IRankable";
import { Pokemon } from "../model/Pokemon";

export module DataSorter {
    export function sortByUsage<U extends IRankable>(data: IterableIterator<U> | Array<U>, descending?: boolean) {
        var multiplier = descending ? -1 : 1;
        var array = Array.from(data);

        return array.slice(0).sort((a, b) => { 
            if (a.usageRate < b.usageRate) {
                return 1 * multiplier;
            }

            if (a.usageRate > b.usageRate) {
                return -1 * multiplier;
            }

            return 0;
        });
    }

    export function sortByName<T extends IterableIterator<Pokemon>>(data: T) {
        var array = Array.from(data);

        return array.slice(0).sort((pokeA, pokeB) => pokeA.name.localeCompare(pokeB.name));
    }
}