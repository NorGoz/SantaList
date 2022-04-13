import React from "react";
import {ChildEntity, GiftEntity } from "types";
import {GiftTableRow} from "../Gifts/GiftTableRow";
import {ChildTableRow} from "./ChildTableRow";

interface Props{
 giftsList: GiftEntity[];
 childrenList: ChildEntity[];

}

export const ChildTable = (props:Props) => {
    return(
        <table className='children__table'>
            <thead>
            <tr>
                <th>Name</th>
                <th>Gift</th>
            </tr>
            </thead>
            <tbody>
            {
                props.childrenList.map(child => (
                    <ChildTableRow
                    key={child.id}
                    child={child}
                    giftsList = {props.giftsList}

                    />
                ))
            }
            </tbody>
        </table>
    )
}

