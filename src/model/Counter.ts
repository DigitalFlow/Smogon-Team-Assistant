import IRankable from "../domain/IRankable"

export interface CounterProps {
    name: string;
    usageRate: number;
}

export default class Counter implements IRankable {
    name: string;
    usageRate: number;

    constructor(props: CounterProps) {
        this.name = props.name;
        this.usageRate = props.usageRate;
    }
}