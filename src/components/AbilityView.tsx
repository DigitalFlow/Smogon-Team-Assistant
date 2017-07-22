import * as React from "react";
import { Ability } from "../model/Ability";

export interface AbilityViewProps {
    ability: Ability;
}

export class AbilityView extends React.PureComponent<AbilityViewProps, any> {
    constructor(props: AbilityViewProps) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.ability.name}</td>
                <td>{this.props.ability.usageRate}</td>
            </tr>
        );
    }
}