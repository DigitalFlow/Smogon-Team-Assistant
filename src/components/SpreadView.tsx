import * as React from "react";
import { Spread } from "../model/Spread";

export interface SpreadViewProps {
    spread: Spread;
}

export class SpreadView extends React.PureComponent<SpreadViewProps, any> {
    name: string;
    usageRate: number;

    constructor(props: SpreadViewProps) {
        super(props);
        this.name = props.spread.name;
        this.usageRate = props.spread.usageRate;
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