"use client";

import { debugLog } from "@/functions/helpers";
import { Popover } from "@radix-ui/themes";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function TypePopover({
  className,
  search = "",
}: {
  className?: string;
  search?: string;
}) {
  const pathname = usePathname();
  const { query } = useParams();
  const q = query
    ? typeof query == "string"
      ? query
      : (query ?? []).join(" ")
    : "";
  const { push } = useRouter();
  const [currentLink, setCurrentLink] = useState("/search");

  useEffect(() => {
    setCurrentLink((_) => {
      if (pathname.includes("artisan")) return "/artisan";
      return "/search";
    });
  }, [pathname]);

  const s = useMemo(() => search, [search]);

  return (
    <>
      <input type="hidden" name="type" value={currentLink.replace("/", "")} />
      <Popover.Root>
        <Popover.Trigger>
          <button
            defaultValue={pathname.includes("artisan") ? "artisan" : "search"}
            name="type"
            className={
              className ??
              "inline-flex h-auto items-center gap-2 border-none bg-[#F0F0F0] px-2 py-1.5 text-label font-semibold text-black-400 outline-none focus:outline-none max-lg:hidden"
            }
          >
            {checkIcon}
            {links.filter((i) => i.href == currentLink)[0].title}
          </button>
        </Popover.Trigger>
        <Popover.Content style={{ padding: 12, borderRadius: 8 }}>
          <div className="flex flex-col items-stretch">
            {links.map((link) => {
              const active = link.href == currentLink;
              return (
                <Popover.Close key={link.title}>
                  <button
                    onClick={() => {
                      // debugLog({ q, s, currentLink });
                      if (q.trim().length == 0 && s.trim().length == 0) {
                        // debugLog(link.href);
                        setCurrentLink(link.href);
                      } else if (s) push(`${link.href}/${s}`);
                      else if (q) push(`${link.href}/${q}`);
                    }}
                    className={`inline-flex min-w-[150px] items-center gap-2 rounded-lg px-3 py-2 text-start text-label font-semibold text-black-300 hover:bg-black-50 ${active ? "text-black-500" : ""}`}
                  >
                    {link.icon}
                    <span className="w-full">{link.title}</span>
                    {active && (
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.0001 7.77989L1.2201 4.9999L0.273438 5.93989L4.0001 9.66656L12.0001 1.66656L11.0601 0.726562L4.0001 7.77989Z"
                          fill="#121212"
                        />
                      </svg>
                    )}
                  </button>
                </Popover.Close>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Root>
    </>
  );
}

const checkIcon = (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 1.5L6 6.5L1 1.5"
      stroke="#606060"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const links = [
  {
    title: "Services",
    href: "/search",
    icon: (
      <svg
        width="18"
        height="15"
        viewBox="0 0 18 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.83317 3V2.16667C4.83317 1.70833 4.9965 1.31611 5.32317 0.99C5.64984 0.663889 6.04206 0.500556 6.49984 0.5H11.4998C11.9582 0.5 12.3507 0.663333 12.6773 0.99C13.004 1.31667 13.1671 1.70889 13.1665 2.16667V3H13.7498C14.0832 3 14.3854 3.09389 14.6565 3.28167C14.9276 3.46944 15.1254 3.70889 15.2498 4L17.2082 8.5C17.2498 8.61111 17.2812 8.72222 17.3023 8.83333C17.3234 8.94444 17.3337 9.05555 17.3332 9.16667V13C17.3332 13.4583 17.1701 13.8508 16.844 14.1775C16.5179 14.5042 16.1254 14.6672 15.6665 14.6667H2.33317C1.87484 14.6667 1.48262 14.5036 1.1565 14.1775C0.830393 13.8514 0.667059 13.4589 0.666504 13V9.16667C0.666504 9.05555 0.67706 8.94444 0.698171 8.83333C0.719282 8.72222 0.750393 8.61111 0.791504 8.5L2.74984 4C2.87484 3.70833 3.07289 3.46861 3.344 3.28083C3.61511 3.09306 3.91706 2.99944 4.24984 3H4.83317ZM6.49984 3H11.4998V2.16667H6.49984V3ZM4.83317 8V7.16667H6.49984V8H11.4998V7.16667H13.1665V8H15.1665L13.7498 4.66667H4.24984L2.83317 8H4.83317ZM4.83317 9.66667H2.33317V13H15.6665V9.66667H13.1665V10.5H11.4998V9.66667H6.49984V10.5H4.83317V9.66667Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "Artisans",
    href: "/artisan",
    icon: (
      <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.8915 5.6747C10.3977 4.96742 10.6699 4.11947 10.6699 3.2497C10.6699 2.37994 10.3977 1.53199 9.8915 0.824705C10.3655 0.501814 10.9263 0.330371 11.4998 0.333038C12.2734 0.333038 13.0152 0.640329 13.5622 1.18731C14.1092 1.73429 14.4165 2.47616 14.4165 3.2497C14.4165 4.02325 14.1092 4.76512 13.5622 5.3121C13.0152 5.85908 12.2734 6.16637 11.4998 6.16637C10.9263 6.16904 10.3655 5.9976 9.8915 5.6747ZM3.58317 3.2497C3.58317 2.67284 3.75423 2.10894 4.07472 1.62929C4.3952 1.14965 4.85073 0.775812 5.38368 0.555057C5.91663 0.334301 6.50307 0.276541 7.06885 0.389082C7.63463 0.501622 8.15433 0.779407 8.56223 1.18731C8.97013 1.59521 9.24792 2.11491 9.36046 2.68069C9.473 3.24647 9.41524 3.83291 9.19448 4.36586C8.97373 4.89882 8.59989 5.35434 8.12025 5.67482C7.64061 5.99531 7.0767 6.16637 6.49984 6.16637C5.72629 6.16637 4.98442 5.85908 4.43744 5.3121C3.89046 4.76512 3.58317 4.02325 3.58317 3.2497ZM5.24984 3.2497C5.24984 3.49693 5.32315 3.73861 5.4605 3.94417C5.59785 4.14973 5.79307 4.30994 6.02148 4.40455C6.24989 4.49916 6.50122 4.52392 6.7437 4.47569C6.98618 4.42745 7.2089 4.3084 7.38372 4.13359C7.55854 3.95877 7.67759 3.73604 7.72582 3.49357C7.77405 3.25109 7.7493 2.99976 7.65469 2.77135C7.56008 2.54294 7.39986 2.34772 7.1943 2.21037C6.98874 2.07302 6.74706 1.9997 6.49984 1.9997C6.16832 1.9997 5.85037 2.1314 5.61595 2.36582C5.38153 2.60024 5.24984 2.91818 5.24984 3.2497ZM12.3332 11.1664V12.833H0.666504V11.1664C0.666504 11.1664 0.666504 7.83304 6.49984 7.83304C12.3332 7.83304 12.3332 11.1664 12.3332 11.1664ZM10.6665 11.1664C10.5498 10.5164 9.55817 9.4997 6.49984 9.4997C3.4415 9.4997 2.3915 10.5914 2.33317 11.1664M12.2915 7.83304C12.8023 8.23031 13.2199 8.73458 13.515 9.31043C13.8101 9.88628 13.9756 10.5198 13.9998 11.1664V12.833H17.3332V11.1664C17.3332 11.1664 17.3332 8.14137 12.2832 7.83304H12.2915Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];
