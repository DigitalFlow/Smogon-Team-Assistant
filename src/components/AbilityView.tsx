import * as React from "react";
import { Ability } from "../model/Ability";

export interface AbilityViewProps {
    ability: Ability;
}

export class AbilityView extends React.Component<AbilityViewProps, any> {
    name: string;
    usageRate: number;

    constructor(props: AbilityViewProps) {
        super(props);
        this.name = props.ability.name;
        this.usageRate = props.ability.usageRate;
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