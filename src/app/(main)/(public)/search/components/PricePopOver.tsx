"use client";

import AppRangeSlider from "@/components/ui/AppRangeSlider";
import { Popover } from "@radix-ui/themes";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import Price from "./price";

export default function PricePopOver() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="search-filter-btn">
          Price <FaChevronDown />
        </button>
      </Popover.Trigger>
      <Popover.Content
        style={{
          maxWidth: 400,
        }}
      >
        <Price />
      </Popover.Content>
    </Popover.Root>
  );
}
