import React, {MouseEvent} from "react";
import { Link } from "react-router-dom";
import { GiftEntity } from "types";


interface Props {
    gift: GiftEntity;
    onGiftsChange: () => void;
}

export const GiftTableRow =( props: Props) => {
const deleteGift = async (e: MouseEvent) => {
    e.preventDefault()

    if(!window.confirm(`Are you sure you wont to remove ${props.gift.name}`)) {
        return
    }

   const result = await fetch(`http://localhost:3001/gift/${props.gift.id}`,{
        method:'DELETE',
    });
    console.log(result)
    if(result.status === 400 || result.status === 500) {
        const error = await result.json();
        alert(`Error occurred : ${error.message}`);
        return
    }
    props.onGiftsChange()
};
    return (
    <tr>
        <td>
            <Link style={{
                textDecoration:'none'
            }} to={`/gift/${props.gift.id}`}>
                {props.gift.name}
            </Link>
        </td>
        <td>{props.gift.count}</td>
        <td>
            <a style={{
                textDecoration:'none'
            }}
                href="#" onClick={deleteGift}>🗑️</a>
          </td>

    </tr>
    );
};


