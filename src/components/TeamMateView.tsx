import * as React from "react";
import { TeamMate } from "../model/TeamMate";

export interface TeamMateViewProps {
    teamMate: TeamMate;
}

export class TeamMateView extends React.PureComponent<TeamMateViewProps, any> {
    constructor(props: TeamMateViewProps) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.teamMate.name}</td>
                <td>{Math.abs(this.props.teamMate.usageRate)}</td>
            </tr>
        );
    }
}