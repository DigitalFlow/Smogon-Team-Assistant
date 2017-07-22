import * as React from "react";
import { Item } from "../model/Item";

export interface ItemViewProps {
    item: Item;
}

export class ItemView extends React.PureComponent<ItemViewProps, any> {
    constructor(props: ItemViewProps) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.usageRate}</td>
            </tr>
        );
    }
}