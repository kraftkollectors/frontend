

export type Category = {
    _id: string;
    title: string;
    subcategories: SubCategory[];
    serviceCount: number;
}

export type SubCategory = {
    _id: string;
    categoryId: string;
    title: string;
    serviceCount: number;
}
