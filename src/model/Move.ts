import { IRankable } from "./IRankable"

export interface MoveProps {
    name: string;
    usageRate: number;
}

export class Move implements IRankable {
    name: string;
    usageRate: number;

    constructor(props: MoveProps) {
        this.name = props.name;
        this.usageRate = props.usageRate;
    }
}