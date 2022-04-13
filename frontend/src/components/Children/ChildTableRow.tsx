import React from "react";
import {ChildEntity, GiftEntity } from "types";
import {ChildGiftSelect} from "./ChildGiftSelect";

interface Props{
  child: ChildEntity;
  giftsList: GiftEntity[];

}

export const ChildTableRow = (props:Props) => {
    return (
        <tr>
            <th>{props.child.name}</th>
            <td>
                <ChildGiftSelect childId={props.child.id as string} giftsList={props.giftsList} selectedId={props.child.giftId}/>
            </td>
        </tr>
    )
}
