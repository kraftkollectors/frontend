

export type Category = {
    _id: string;
    title: string;
}

export type SubCategory = {
    _id: string;
    categoryId: string;
    title: string;
}

export type CategoryDetails = Category & {
    subCategories: SubCategory[];
    servicesCount: number;
}

export type SubCategoryDetails = SubCategory & {
    servicesCount: number;
}