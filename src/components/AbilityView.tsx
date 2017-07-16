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
        return (<div key={this.name + "_Abilities"}>
            {this.name}: {this.usageRate} <br/>
            </div>
        );
    }
}