import * as React from "react";
import { Spread } from "../model/Spread";

export interface SpreadViewProps {
    spread: Spread;
}

export class SpreadView extends React.PureComponent<SpreadViewProps, any> {
    constructor(props: SpreadViewProps) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.spread.name}</td>
                <td>{this.props.spread.usageRate}</td>
            </tr>
        );
    }
}