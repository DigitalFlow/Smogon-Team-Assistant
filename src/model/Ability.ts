export interface AbilityProps {
    name: string;
    usageRate: number;
}

export class Ability {
    name: string;
    usageRate: number;

    constructor(props: AbilityProps) {
        this.name = props.name;
        this.usageRate = props.usageRate;
    }
}