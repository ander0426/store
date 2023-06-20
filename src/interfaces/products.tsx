export interface ReqResListado {
    products: Array<Product>;
}

export type Product = {
    name: string;
    img: string;
    price: number;
    amount: number;
    description: string;
    id: number;
}

export type Item = {
    id: number;
    img: string;
    quantity: number;
    total?: number;
    price?: number;
}