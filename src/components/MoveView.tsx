import * as React from "react";
import { Move } from "../model/Move";

export interface MoveViewProps {
    move: Move;
}

export class MoveView extends React.PureComponent<MoveViewProps, any> {
    name: string;
    usageRate: number;

    constructor(props: MoveViewProps) {
        super(props);
        this.name = props.move.name;
        this.usageRate = props.move.usageRate;
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