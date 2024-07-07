import { fetchCategories } from "@/actions";
import { AppSelectOption } from "@/components/ui/AppSelect";
import { tags } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useChangeSearchParams } from "./useChangeSearchParams";


export function useCategories() {
    const [key, setKey] = useState("-");
    const [selectedCat, setSelectedCat] = useState("");
    const [cats, setCats] = useState<AppSelectOption[]>([]);
    const [subCats, setSubCats] = useState<AppSelectOption[]>([]);
    const { params } = useChangeSearchParams();
    const withAll = (others: AppSelectOption[] = []): AppSelectOption[] => ([{ title: "All", value: '' }, ...others]);

    const query = useQuery({
        queryKey: [tags.categories],
        queryFn: () => fetchCategories({ throwsError: false }).then(v => {
            if (v === 'error' || !v) return undefined;
            return v
        }),
    })

    useEffect(() => {
        setKey(i => i + '-');
        setSelectedCat(decodeURIComponent(params.get('category') ?? ''))
    }, [params, cats])

    useEffect(()=>{
        onCatChange(selectedCat)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCat])

    function onCatChange(newCat: string) {
        if (!newCat) setSubCats(withAll());
        if (!query.data) return;
        const categories = query.data.existingRecords;
        const c = categories.filter(i => i.title === newCat)[0];
        if (!c) return;
        setSubCats(withAll(
            c.subcategories.map(i => ({
                title: i.title,
                value: i.title
            }))
        ));
        setKey(i => i + '-');
    }

    useEffect(() => {
        if (!query.data) return;
        const categories = query.data.existingRecords;
        setCats(withAll(categories.map(i => ({
            title: i.title,
            value: i.title
        }))));
        setSubCats(withAll());
    }, [query.data])

    return { cats, subCats, onCatChange, key, selectedCat, ...query }
}