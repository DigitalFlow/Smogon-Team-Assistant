import * as React from "react";
import { Spread } from "../model/Spread";

export interface SpreadViewProps {
    spread: Spread;
}

export class SpreadView extends React.Component<SpreadViewProps, any> {
    name: string;
    usageRate: number;

    constructor(props: SpreadViewProps) {
        super(props);
        this.name = props.spread.name;
        this.usageRate = props.spread.usageRate;
    }

    render() {
        return (<div key={this.name + "_Spreads"}>
            {this.name}: {this.usageRate} <br/>
            </div>
        );
    }
}