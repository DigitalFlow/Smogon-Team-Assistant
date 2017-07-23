import { IRankable } from "../domain/IRankable"

export interface TeamMateProps {
    name: string;
    usageRate: number;
}

export class TeamMate implements IRankable {
    name: string;
    usageRate: number;

    constructor(props: TeamMateProps) {
        this.name = props.name;
        this.usageRate = props.usageRate;
    }
}