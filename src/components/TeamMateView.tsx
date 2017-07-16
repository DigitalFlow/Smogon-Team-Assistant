import * as React from "react";
import { TeamMate } from "../model/TeamMate";

export interface TeamMateViewProps {
    teamMate: TeamMate;
}

export class TeamMateView extends React.Component<TeamMateViewProps, any> {
    name: string;
    usageRate: number;

    constructor(props: TeamMateViewProps) {
        super(props);
        this.name = props.teamMate.name;
        this.usageRate = props.teamMate.usageRate;
    }

    render() {
        return (<div key={this.name + "_TeamMates"}>
            {this.name}: {this.usageRate} <br/>
            </div>
        );
    }
}