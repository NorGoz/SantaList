import React, {FormEvent, useState} from "react";
import { CreateGiftReq, GiftEntity } from "types";
import {Spinner} from "../common/Spinner";
import './addGift.css'

export const AddGift = () => {
    const [form,setForm] = useState<CreateGiftReq>({
        name:'',
        count:0,
    });

    const [loading,setLoading] = useState<boolean>(false);
    const [resultInfo,setResultInfo] = useState<string | null>(null)

    const updateForm = (key: string, value:any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const res = await fetch(`http://localhost:3001/gift`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
        const data: GiftEntity = await res.json();

        setLoading(false);
        setResultInfo(`${data.name} added with ID ${data.id}`)
    }

    if(loading) {
        return <Spinner/>;
    }

    if (resultInfo !== null) {
        return  <div>
            <p><strong>{resultInfo}</strong></p>
            <button onClick={() => setResultInfo(null)}>Add another one</button>
        </div>

    }

    return <form className='addGift' onSubmit={sendForm}>
        <h2>Add gift</h2>
        <label>
            Name: <br/>
            <input
                type="text"
                value={form.name}
                onChange={e => updateForm('name', e.target.value)}/>
        </label> <br/>
        <label>
            count: <br/>
            <input
                type="number"
                value={form.count}
                onChange={e => updateForm('count', Number(e.target.value))}/>
        </label> <br/>
        <button className='btn'>Add</button>
    </form>
}
