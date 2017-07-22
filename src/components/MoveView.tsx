import * as React from "react";
import { Move } from "../model/Move";

export interface MoveViewProps {
    move: Move;
}

export class MoveView extends React.PureComponent<MoveViewProps, any> {
    constructor(props: MoveViewProps) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.move.name}</td>
                <td>{this.props.move.usageRate}</td>
            </tr>
        );
    }
}