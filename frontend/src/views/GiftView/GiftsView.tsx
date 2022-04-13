import React from "react";
import {GiftsList} from "../../components/Gifts/GiftsList";
import {AddGift} from "../../components/AddGift/AddGift";
import './GiftView.css';

export const GiftsView = () => (
    <div className='giftView'>
     <GiftsList/>
     <AddGift/>
    </div>
)
