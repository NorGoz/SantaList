import {ChildRecord}  from "../records/child.record";
import {GiftRecord}  from "../records/gift.record";
import {ValidationError}  from "../utils/errors";
import {CreateChildReq, ListChildrenRes} from "../types/child/child";
import {Request, Response, Router} from 'express';
import {MyRouter} from '../types/router/my-router';

// export const childRouter = Router();

export class ChildRouter implements MyRouter{
    public readonly urlPrefix = '/child';
    public readonly router :Router = Router();

    constructor() {
        this.setUpRoutes()
    }

    setUpRoutes() {
        this.router.get('/',this.showAllChildrenAndGifts);
        this.router.post('/',this.createNewChild);
        this.router.patch('/gift/:childId',this.updateChildGift);
    }

    private showAllChildrenAndGifts = async (req:Request,res:Response): Promise<void> => {
        const childrenList = await ChildRecord.listAll();
        const giftsList = await GiftRecord.listAll();

        res.json({
            childrenList,
            giftsList,
        } as ListChildrenRes);
    }
    private createNewChild =  async (req:Request,res:Response): Promise<void> => {
        const newChild = new ChildRecord(req.body as CreateChildReq);
        await newChild.insert();
        console.log(`metoda post ${req.body}`)
        res.json(newChild)
    }
    private updateChildGift = async (req:Request, res:Response): Promise<void> => {
        const child = await ChildRecord.getOne(req.params.childId);
        console.log(`metoda patch${req.params}`)
        if (child === null) {
            throw new ValidationError('Nie znaleziono dziecka z podanym ID.');
        }

        const gift = req.body.giftId === '' ? null : await GiftRecord.getOne(req.body.giftId);

        if (gift) {
            if (gift.count <= await gift.countGivenGifts()) {
                throw new ValidationError('Tego prezentu jest za mało.');
            }
        }

        child.giftId = gift?.id ?? null;
        await child.update();

        res.json(child)

    }
}

// childRouter // /child

    // .get('/', async (req, res) => {
    //     const childrenList = await ChildRecord.listAll();
    //     const giftsList = await GiftRecord.listAll();
    //
    //     res.json({
    //         childrenList,
    //         giftsList,
    //     } as ListChildrenRes);
    // })

    // .post('/', async (req, res) => {
    //     const newChild = new ChildRecord(req.body as CreateChildReq);
    //     await newChild.insert();
    //     console.log(`metoda post ${req.body}`)
    //     res.json(newChild)
    // })

    // .patch('/gift/:childId', async (req, res) => {
    //     const child = await ChildRecord.getOne(req.params.childId);
    //     console.log(`metoda patch${req.params}`)
    //     if (child === null) {
    //         throw new ValidationError('Nie znaleziono dziecka z podanym ID.');
    //     }
    //
    //     const gift = req.body.giftId === '' ? null : await GiftRecord.getOne(req.body.giftId);
    //
    //     if (gift) {
    //         if (gift.count <= await gift.countGivenGifts()) {
    //             throw new ValidationError('Tego prezentu jest za mało.');
    //         }
    //     }
    //
    //     child.giftId = gift?.id ?? null;
    //     await child.update();
    //
    //     res.json(child)
    //
    // });

