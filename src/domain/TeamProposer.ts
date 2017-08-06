import Pokemon from "../model/Pokemon";
import DataSorter from "./DataSorter";

module TeamProposer {
    function blockMega(name: string, proposedTeam: Map<string, Pokemon>){
        return name.includes("-Mega") && 
            Array.from(proposedTeam.keys()).find(n => n.includes("-Mega"));
    }

    function createTeammateRanking(proposedTeam: Map<string, Pokemon>){
        let teamMateRanking = new Map<string, number>();

            proposedTeam.forEach((pokemon, name) => {
                if (!pokemon) {
                    return;
                }
            
                let teamMembers = pokemon.teamMates;

                if (!teamMembers) {
                    return;
                }

                for (let j = 0; j < teamMembers.length; j++) {
                    let teamMate = teamMembers[j];
                    let currentValue = 0;

                    if (proposedTeam.has(teamMate.name)) {
                        continue;
                    }

                    if (blockMega(teamMate.name, proposedTeam)) {
                        continue;
                    }

                    if (teamMateRanking.has(teamMate.name)) {
                        currentValue = teamMateRanking.get(teamMate.name);
                    }

                    teamMateRanking.set(teamMate.name, currentValue + teamMate.usageRate);
                }
            });
        return teamMateRanking;
    }

    export function createCounterRanking(proposedTeam: Map<string, Pokemon>, countersDone: Array<string>){
        let counterRanking = new Map<string, number>();

            proposedTeam.forEach((pokemon, name) => {
                if (!pokemon) {
                    return;
                }
            
                let counters = pokemon.checks_And_Counters;

                if (!counters) {
                    return;
                }

                for (let j = 0; j < counters.length; j++) {
                    let counter = counters[j];
                    let currentValue = 0;

                    if (countersDone.indexOf(counter.name) !== -1) {
                        continue;
                    }

                    if (counterRanking.has(counter.name)) {
                        currentValue = counterRanking.get(counter.name);
                    }

                    counterRanking.set(counter.name, currentValue + counter.usageRate);
                }
            });

        return counterRanking;
    }

    function findHighestScore(ranking: Map<string, number>){
        let bestMember: {name: string, value: number} = null;

        ranking.forEach((value, key) => {
            if (!bestMember || bestMember.value < value) {
                bestMember = {name: key, value: value};
            }
        });

        return bestMember;
    }

    function createInitialProposedTeam(team: Array<Pokemon>) {
        let proposedTeam = new Map<string, Pokemon>();
        
        for (let i = 0; i < team.length; i++) {
            let pokemon = team[i];

            if (!pokemon) {
                continue;
            }

            proposedTeam.set(pokemon.name, pokemon);
        }

        return proposedTeam;
    }

    function teamOrFallback(team: Array<Pokemon>, pokemon: Map<string, Pokemon>) {
        if (!team || !team.find(p => p !== null) || team.length === 0) {
            // If no data entered, get the pokemon with the highest usage as starting point and proceed
            return DataSorter.sortByUsage<Pokemon>(pokemon.values(), true).slice(0, 1);
        }

        return team;
    }

    export function proposeByTeammate(team: Array<Pokemon>, pokemon: Map<string, Pokemon>): Array<Pokemon> {
        team = teamOrFallback(team, pokemon);
        let proposedTeam = createInitialProposedTeam(team);

        do 
        {
            let teamMateRanking = createTeammateRanking(proposedTeam);
            let bestMember = findHighestScore(teamMateRanking);

            proposedTeam.set(bestMember.name, pokemon.get(bestMember.name));
        } while(proposedTeam.size < 6);

        return Array.from(proposedTeam.values());
    }

    export function proposeByCounter(team: Array<Pokemon>, pokemon: Map<string, Pokemon>): Array<Pokemon> {
        team = teamOrFallback(team, pokemon);

        let proposedTeam = createInitialProposedTeam(team);
        let countersDone = new Array<string>();

        do {
            let counterRanking = createCounterRanking(proposedTeam, countersDone);
            let mostDangerousCounter = findHighestScore(counterRanking);

            if (!mostDangerousCounter) {
                return Array.from(proposedTeam.values());
            }

            countersDone.push(mostDangerousCounter.name);
            var counter = pokemon.get(mostDangerousCounter.name);
            var mateByCounter = null;
            
            for(let k = 0; counter.checks_And_Counters && k < counter.checks_And_Counters.length; k++) {
                let counterPokemon = counter.checks_And_Counters[k];
                
                if(proposedTeam.has(counterPokemon.name)) {
                    continue;
                }

                if (blockMega(counterPokemon.name, proposedTeam)) {
                    continue;
                }

                // Only choose strongest counter, they are sorted desc by counter rate
                mateByCounter = pokemon.get(counterPokemon.name);
                break;
            }

            proposedTeam.set(mateByCounter.name, mateByCounter);
        } while(proposedTeam.size < 6);

        return Array.from(proposedTeam.values());
    }

    export function proposeBalanced(team: Array<Pokemon>, pokemon: Map<string, Pokemon>): Array<Pokemon> {
        team = teamOrFallback(team, pokemon);

        let proposedTeam = createInitialProposedTeam(team);
        let countersDone = new Array<string>();

        do {
            let counterRanking = createCounterRanking(proposedTeam, countersDone);
            let mostDangerousCounter = findHighestScore(counterRanking);

            if (!mostDangerousCounter) {
                return Array.from(proposedTeam.values());
            }

            countersDone.push(mostDangerousCounter.name);
            var counter = pokemon.get(mostDangerousCounter.name);

            let balancedCounters = createCounterRanking(new Map<string, Pokemon>([[counter.name, counter]]), Array.from(proposedTeam.keys()));
            let teamMateRanking = createTeammateRanking(proposedTeam);
            
            let balancedRanking = new Map<string, number>();

            balancedCounters.forEach((score, pokemon) => {
                if (!pokemon) {
                    return;
                }

                if (blockMega(pokemon, proposedTeam)) {
                    return;
                }

                let balancedScore = score;

                if (teamMateRanking.has(pokemon)) {
                    balancedScore += teamMateRanking.get(pokemon);
                }

                balancedRanking.set(pokemon, balancedScore);
            });

            let bestBalancedMate = findHighestScore(balancedRanking);

            if (!bestBalancedMate) {
                return Array.from(proposedTeam.values());
            }

            proposedTeam.set(bestBalancedMate.name, pokemon.get(bestBalancedMate.name));
        } while(proposedTeam.size < 6);

        return Array.from(proposedTeam.values());
    }
}

export default TeamProposer;