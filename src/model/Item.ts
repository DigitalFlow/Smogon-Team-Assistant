export interface ItemProps {
    name: string;
    usageRate: number;
}

export class Item {
    name: string;
    usageRate: number;

    constructor(props: ItemProps) {
        this.name = props.name;
        this.usageRate = props.usageRate;
    }
}