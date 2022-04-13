import React, {useEffect, useState} from 'react'
import {GetSingleGiftRes } from 'types';
import {Link, useParams} from "react-router-dom";

export const SingleGiftView = () => {
    const [giftInfo,setGiftInfo] = useState<GetSingleGiftRes |null>(null);
    const {giftId} = useParams();

    useEffect(() => {
        (async () =>{
          const res = await fetch(`http://localhost:3001/gift/${giftId}`);

            if(res.status === 400 || res.status === 500) {
                const error = await res.json();
                alert(`Error occurred : ${error.message}`);
                return
            }

            const data = await res.json();
            setGiftInfo(data);
        })()
    },[])

    if(giftInfo ===null) {
        return null;
    }

    return <div className='singielGiftView'>
        <h1>{giftInfo.gift.name}</h1>
        <p>This gift has ID <strong>{giftInfo.gift.id}</strong>.
            We had <strong>{giftInfo.gift.count}</strong>
            of this item and <strong>{giftInfo.givenCount}</strong> were already given!</p>
        <p>
            <Link to={'/gift'}>Go to gifts</Link>
        </p>
    </div>;
}
