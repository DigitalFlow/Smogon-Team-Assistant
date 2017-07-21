import * as React from "react";
import { Item } from "../model/Item";

export interface ItemViewProps {
    item: Item;
}

export class ItemView extends React.PureComponent<ItemViewProps, any> {
    name: string;
    usageRate: number;

    constructor(props: ItemViewProps) {
        super(props);
        this.name = props.item.name;
        this.usageRate = props.item.usageRate;
    }

    render() {
        return (
            <tr>
                <td>{this.name}</td>
                <td>{this.usageRate}</td>
            </tr>
        );
    }
}