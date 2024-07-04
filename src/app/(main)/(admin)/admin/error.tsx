"use client"
import { ErrorPage } from "@/components";
import { AppPageError } from "@/utils/types/basicTypes";

export default function Error(props : AppPageError) {

    return ErrorPage(props);
}