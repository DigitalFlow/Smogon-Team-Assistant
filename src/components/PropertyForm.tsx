import * as React from "react";
import Select = require("react-select");
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import Pokemon from "../model/Pokemon";

interface FieldGroupProps{
        id: string;
        label: string;
        help?: string;
        type?: string;
        componentClass?: string;
        placeholder?: string;
        content?: Array<any>;
        value?: string;
        onChange?: any;
}

interface PropertyFormProps {
    pokemon: Pokemon;
}

interface PropertyFormState {
    spread?: string;
    ability?: string;
    item?: string;
    move1?: string;
    move2?: string;
    move3?: string;
    move4?: string;
}

export default class PropertyForm extends React.PureComponent<PropertyFormProps, PropertyFormState>{
    constructor(props: PropertyFormProps) {
        super(props);

        if (!props.pokemon) {
            this.state = {};
            return;
        }
    }

    componentWillReceiveProps(nextProps: PropertyFormProps){
        if (!nextProps.pokemon) {
            return;
        }

        this.setState({
            spread: nextProps.pokemon.spreads[0].name,
            ability: nextProps.pokemon.abilities[0].name,
            item: nextProps.pokemon.items[0].name,
            move1: nextProps.pokemon.moves[0].name,
            move2: nextProps.pokemon.moves[1].name,
            move3: nextProps.pokemon.moves[2].name,
            move4: nextProps.pokemon.moves[3].name
        });
    }

    render(){
        if (!this.props.pokemon) {
            return (<div/>);
        }

        return (
            <Form>
                <ControlLabel>Spread</ControlLabel>
                <Select
                    name={"spreadSelect"}
                    options={this.props.pokemon.spreads.map(spread => { return {value: spread.name, label: spread.name}})}
                    value={this.state.spread}
                    onChange={(event : any) => { this.setState({spread: event ? event.value : null});}}
                />
                <ControlLabel>Ability</ControlLabel>
                <Select
                    name={"abilitySelect"}
                    options={this.props.pokemon.abilities.map(ability => { return {value: ability.name, label: ability.name}})}
                    value={this.state.ability}
                    onChange={(event : any) => { this.setState({ability: event ? event.value : null});}}
                />
                <ControlLabel>Item</ControlLabel>
                <Select
                    name={"itemSelect"}
                    options={this.props.pokemon.items.map(item => { return {value: item.name, label: item.name}})}
                    value={this.state.item}
                    onChange={(event : any) => { this.setState({item: event ? event.value : null});}}
                />
                <ControlLabel>Move 1</ControlLabel>
                <Select
                    name={"move1"}
                    options={this.props.pokemon.moves.map(move => { return {value: move.name, label: move.name}})}
                    value={this.state.move1}
                    onChange={(event : any) => { this.setState({move1: event ? event.value : null});}}
                />
                <ControlLabel>Move 2</ControlLabel>
                <Select
                    name={"move2"}
                    options={this.props.pokemon.moves.map(move => { return {value: move.name, label: move.name}})}
                    value={this.state.move2}
                    onChange={(event : any) => { this.setState({move2: event ? event.value : null});}}
                />
                <ControlLabel>Move 3</ControlLabel>
                <Select
                    name={"move3"}
                    options={this.props.pokemon.moves.map(move => { return {value: move.name, label: move.name}})}
                    value={this.state.move3}
                    onChange={(event : any) => { this.setState({move3: event ? event.value : null});}}
                />
                <ControlLabel>Move 4</ControlLabel>
                <Select
                    name={"move4"}
                    options={this.props.pokemon.moves.map(move => { return {value: move.name, label: move.name}})}
                    value={this.state.move4}
                    onChange={(event : any) => { this.setState({move4: event ? event.value : null});}}
                />
            </Form>
        );
    }
}