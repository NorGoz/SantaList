import {GiftEntity} from "./giftEntity";

export type CreateGiftReq = Omit<GiftEntity, 'id'>

export interface GetSingleGiftRes {
    gift: GiftEntity;
    givenCount: number;
}
