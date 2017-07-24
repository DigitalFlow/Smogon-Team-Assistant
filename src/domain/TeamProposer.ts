import Pokemon from "../model/Pokemon";
import DataSorter from "./DataSorter";

module TeamProposer {
    export function proposeByTeammateStats(team: Array<Pokemon>, pokemon: Map<string, Pokemon>) {
        if (!team || !team.find(p => p !== null) || team.length === 0) {
            // If no data entered, get the pokemon with the highest usage as starting point and proceed
            team = DataSorter.sortByUsage<Pokemon>(pokemon.values(), true).slice(0, 1);
        }

        let proposedTeam = new Map<string, Pokemon>();
        
        for (let i = 0; i < team.length; i++) {
            let pokemon = team[i];

            if (!pokemon) {
                continue;
            }

            proposedTeam.set(pokemon.name, pokemon);
        }

        do 
        {
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

                    if (teamMate.name.includes("-Mega") && 
                        Array.from(proposedTeam.keys()).find(n => n.includes("-Mega"))) {
                        continue;
                    }

                    if (teamMateRanking.has(teamMate.name)) {
                        currentValue = teamMateRanking.get(teamMate.name);
                    }

                    teamMateRanking.set(teamMate.name, currentValue + teamMate.usageRate);
                }
            });

            let bestMember: {name: string, value: number} = null;

            teamMateRanking.forEach((value, key) => {
                if (!bestMember || bestMember.value < value) {
                    bestMember = {name: key, value: value};
                }
            });

            proposedTeam.set(bestMember.name, pokemon.get(bestMember.name));
        } while(proposedTeam.size < 6);

        return Array.from(proposedTeam.values());
    }
}

export default TeamProposer;