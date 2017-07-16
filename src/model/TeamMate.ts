export interface TeamMateProps {
    name: string;
    usageRate: number;
}

export class TeamMate {
    name: string;
    usageRate: number;

    constructor(props: TeamMateProps) {
        this.name = props.name;
        this.usageRate = props.usageRate;
    }
}