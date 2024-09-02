
export interface IFood {
    title: string;
    price: number;
    image: string;
    _id: string;
}

export interface ICartItem extends IFood {
    quantity: number;
}