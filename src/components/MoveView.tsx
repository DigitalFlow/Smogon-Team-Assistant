import * as React from "react";
import { Move } from "../model/Move";

export interface MoveViewProps {
    move: Move;
}

export class MoveView extends React.Component<MoveViewProps, any> {
    name: string;
    usageRate: number;

    constructor(props: MoveViewProps) {
        super(props);
        this.name = props.move.name;
        this.usageRate = props.move.usageRate;
    }

    render() {
        return (<div key={this.name + "_Moves"}>
            {this.name}: {this.usageRate} <br/>
            </div>
        );
    }
}