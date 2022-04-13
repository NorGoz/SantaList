import React, {useEffect, useState} from "react";
import { ListChildrenRes } from "types";
import {Spinner} from "../common/Spinner";
import {ChildTable} from "./ChildrenTable";
import './Children.css';

export const ChildList = () => {
    const [data, setData] = useState<ListChildrenRes | null>(null)

    const refresh = async () => {
        setData(null)
        const res = await fetch('http://localhost:3001/child');
        const data = await res.json();
        setData(data);

    }
    useEffect(() => {
        refresh();
    }, [])

    if (data === null) {
        return <Spinner/>
    }

    return <div className='children'>
        <h1 className='children__title'>Child</h1>
        <ChildTable childrenList={data.childrenList} giftsList={data.giftsList}/>
    </div>
}
