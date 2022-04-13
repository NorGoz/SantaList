import React, {useEffect, useState} from "react";
import {GiftEntity} from 'types';
import {GiftsTable} from "./GiftsTable";
import {Spinner} from "../common/Spinner";
import './Gifts.css';

export const GiftsList = () => {
    const [giftsList, setGiftsList] = useState<GiftEntity[] | null>(null);

const refreshGifts = async () => {
        setGiftsList(null);
        const res = await fetch('http://localhost:3001/gift');
        const data = await res.json();
        console.log(data)
        setGiftsList(data.giftsList);
}
    useEffect(() => {
        refreshGifts();
    }, [])

    if (giftsList === null) {
        return <Spinner/>
    }

    return <div className='gifts'>
        <h1 className='gifts__title'>Gifts</h1>
        <GiftsTable gifts={giftsList} onGiftsChange={refreshGifts}/>
    </div>
}
