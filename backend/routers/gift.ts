import {Request, Response, Router} from 'express';
import {GiftRecord} from "../records/gift.record";
import {ValidationError} from "../utils/errors";
import {CreateGiftReq, GetSingleGiftRes, GiftEntity} from "../types";
import {MyRouter} from "../types/router";

// export const giftRouter = Router();


export class GiftRouter implements MyRouter {
    public readonly urlPrefix = '/gift';
    public readonly router :Router = Router();

    constructor() {
        this.setUpRoutes()
    }

    setUpRoutes() {
        this.router.get('/',this.getAllGifts);
        this.router.get('/:giftId',this.getOneGift);
        this.router.delete('/:id',this.removeGift);
        this.router.post('/',this.addGift);
    }

    private getAllGifts = async (req:Request,res:Response): Promise<void> => {
        const giftsList = await GiftRecord.listAll();
        res.json({
            giftsList,
        })
    }

    private getOneGift = async (req:Request,res:Response): Promise<void> => {
        const gift = await GiftRecord.getOne(req.params.giftId);
        const givenCount = await gift.countGivenGifts();

        res.json({
            gift,
            givenCount,
        }as GetSingleGiftRes);
    }

    private removeGift = async (req:Request,res:Response): Promise<void> => {
        const gift = await GiftRecord.getOne(req.params.id);
        console.log(gift)
        if(!gift) {
            throw new ValidationError('No such gift');
        }

        if(await gift.countGivenGifts() > 0){
            throw new ValidationError('Cannot remove given gift.')
        }

        await gift.delete();

        res.end();
    }

    private addGift = async (req:Request,res:Response): Promise<void> => {
        const newGift = new GiftRecord(req.body as CreateGiftReq);
        await newGift.insert();

        res.json(newGift);
    }

}

// giftRouter

    // .get('/',async (req,res) => {
    //     const giftsList = await GiftRecord.listAll();
    //
    //     res.json({
    //         giftsList,
    //     })
    // })

    // .get('/:giftId', async (req, res) => {
    //     const gift = await GiftRecord.getOne(req.params.giftId);
    //     const givenCount = await gift.countGivenGifts();
    //
    //     res.json({
    //         gift,
    //         givenCount,
    //     }as GetSingleGiftRes);
    // })

    // .delete('/:id', async (req,res) => {
    //         const gift = await GiftRecord.getOne(req.params.id);
    //         console.log(gift)
    //         if(!gift) {
    //             throw new ValidationError('No such gift');
    //         }
    //
    //         if(await gift.countGivenGifts() > 0){
    //             throw new ValidationError('Cannot remove given gift.')
    //         }
    //
    //         await gift.delete();
    //
    //         res.end();
    // })
    //
    // .post('/', async (req, res) => {
    //
    //     const newGift = new GiftRecord(req.body as CreateGiftReq);
    //     await newGift.insert();
    //
    //     res.json(newGift);
    // });

