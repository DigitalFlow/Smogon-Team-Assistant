import IRankable from "../domain/IRankable"

export interface MoveProps {
    name: string;
    usageRate: number;
}

export default class Move implements IRankable {
    name: string;
    usageRate: number;

    constructor(props: MoveProps) {
        this.name = props.name;
        this.usageRate = props.usageRate;
    }
}