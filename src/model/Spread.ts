import { IRankable } from "./IRankable"

export interface SpreadProps {
    name: string;
    usageRate: number;
}

export class Spread implements IRankable {
    name: string;
    usageRate: number;

    constructor(props: SpreadProps) {
        this.name = props.name;
        this.usageRate = props.usageRate;
    }
}