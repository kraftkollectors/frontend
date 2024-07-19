'use client'

import * as Popover from '@radix-ui/react-popover';
import { HTMLAttributes, useCallback, useMemo } from "react";
import { debugLog } from "@/functions/helpers";
import { useChangeSearchParams } from "@/hooks";
import { Paginated } from '@/utils/types/basicTypes';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

export type PaginationProps = HTMLAttributes<HTMLDivElement> & {
    baseUrl?: string;
    pagination: Paginated<any>;
}

export function Pagination({ pagination, baseUrl, ...props }: PaginationProps) {
    const { currentPage: page, totalPages } = pagination;
    const { params, pushParams } = useChangeSearchParams(baseUrl);
    const toPage = (page: number) => pushParams({ 'page': page.toString() })

    const _page = useMemo(() => +(params.get('page') ?? 1), [params])
    debugLog(_page);

    const firstThree = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 3);
    const lastThree = Array.from({ length: totalPages }, (_, i) => i + 1).slice(totalPages - 3, totalPages).filter((page) => !firstThree.includes(page));

    return (
        <nav aria-label="Page navigation" {...props}>
            <ul className="flex items-center -space-x-px h-10 text-base font-semibold gap-3 w-fit">

                <li>
                    <button 
                    disabled={page === 1}
                    onClick={() => toPage(page - 1)} className="inline-flex items-center justify-center p-2 gap-1 disabled:pointer-events-none disabled:text-black-200 text-black-500">
                        <FaArrowLeftLong />
                        <span className="">Prev</span>
                        
                    </button>
                </li>

                {
                    firstThree.map((page) => (
                        <li key={page}>
                            <button onClick={() => toPage(page)} {...{ 'data-active': page == _page }} className="pagination-button">
                                {page}
                            </button>
                        </li>
                    ))
                }

                {
                    totalPages > 6 && (
                        <li>
                            <Popover.Root>
                                <Popover.Trigger>
                                    <span className="pagination-button">...</span>
                                </Popover.Trigger>
                                <Popover.Anchor />
                                <Popover.Portal>
                                    <Popover.Content style={{
                                        maxWidth: 300,
                                        maxHeight: 300,
                                    }}>
                                        <div className="flex flex-wrap gap-2 rounded-lg border shadow-2xl p-4 bg-light">
                                            {
                                                Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                    <button onClick={() => toPage(page)} key={page} {...{ 'data-active': page == _page }} className="pagination-button !border !rounded">
                                                        {page}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </Popover.Content>
                                </Popover.Portal>
                            </Popover.Root>
                        </li>
                    )
                }
                {
                    lastThree.map((page) => (
                        <li key={page} >
                            <button onClick={() => toPage(page)} {...{ 'data-active': page == _page }} className="pagination-button">
                                {page}
                            </button>
                        </li>
                    ))
                }


               
                        <li>
                            <button 
                            disabled={page >= totalPages}
                            onClick={() => toPage(page + 1)}  className="inline-flex items-center justify-center p-2 gap-1 disabled:pointer-events-none disabled:text-black-200 text-black-500">
                                <span className="">Next</span>
                                <FaArrowRightLong />
                            </button>
                        </li>
            </ul>
        </nav>

    );
}