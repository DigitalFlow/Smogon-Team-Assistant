import { IRankable } from "../domain/IRankable"

export interface AbilityProps {
    name: string;
    usageRate: number;
}

export class Ability implements IRankable {
    name: string;
    usageRate: number;

    constructor(props: AbilityProps) {
        this.name = props.name;
        this.usageRate = props.usageRate;
    }
}