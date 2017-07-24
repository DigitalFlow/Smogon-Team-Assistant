import IRankable from "../domain/IRankable"

export interface SpreadProps {
    name: string;
    usageRate: number;
}

export default class Spread implements IRankable {
    name: string;
    usageRate: number;

    constructor(props: SpreadProps) {
        this.name = props.name;
        this.usageRate = props.usageRate;
    }
}