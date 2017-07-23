import { IRankable } from "./IRankable";
import { Pokemon } from "../model/Pokemon";

export module DataSorter {
    export function sortByUsage<T extends IRankable>(data: IterableIterator<T> | Array<T>, descending?: boolean) {
        var multiplier = descending ? -1 : 1;
        var array = Array.from(data);

        return array.slice(0).sort((a, b) => { 
            if (a.usageRate < b.usageRate) {
                return -1 * multiplier;
            }

            if (a.usageRate > b.usageRate) {
                return 1 * multiplier;
            }

            return 0;
        });
    }

    export function sortByViabilityCeiling<T extends IterableIterator<Pokemon>>(data: T, descending?: boolean) {
        var multiplier = descending ? -1 : 1;
        var array = Array.from(data);

        return array.slice(0).sort((a, b) => { 
            if (a.viability_Ceiling[1] < b.viability_Ceiling[1]) {
                return -1 * multiplier;
            }

            if (a.usageRate > b.usageRate) {
                return 1 * multiplier;
            }

            return 0;
        });
    }

    export function sortByName(data: IterableIterator<Pokemon> | Array<Pokemon>, descending?: boolean) {
        var array = Array.from(data);

        var sorted = array.slice(0).sort((pokeA, pokeB) => pokeA.name.localeCompare(pokeB.name));

        if (descending) {
            return sorted.reverse();
        }
        return sorted;
    }
}