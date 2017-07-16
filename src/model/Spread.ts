export interface SpreadProps {
    name: string;
    usageRate: number;
}

export class Spread {
    name: string;
    usageRate: number;

    constructor(props: SpreadProps) {
        this.name = props.name;
        this.usageRate = props.usageRate;
    }
}