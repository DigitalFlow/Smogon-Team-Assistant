import * as React from "react";
import IRankable from "../domain/IRankable"

const IRankableView = (props: IRankable) => (
    <tr>
        <td>{props.name}</td>
        <td>{props.usageRate}</td>
    </tr>
);

export default IRankableView;