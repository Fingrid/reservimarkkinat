"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useFSRoute } from "nextra/hooks";
import type { PageMapItem } from "nextra";
import { Anchor } from "nextra/components";
import { normalizePages } from "nextra/normalize-pages";
import type { FC } from "react";
import { KeyboardArrowRight, KeyboardArrowDown } from "@fingrid/design-system-components";
import * as styleVariables from "@fingrid/design-system-components/static/styles/variables.js";

const NaviBlock: FC<{ item: ReturnType<typeof normalizePages>["docsDirectories"][0] }> = ({ item }) => {
  const [open, setOpen] = React.useState(false);

  if (!item.children) {
    return (
      <li key={item.name} className="border-l-1 border-(--color-neutral-neutral-80)">
        <Anchor
          key={`anchor_${item.name}`}
          href={item.route}
          className={
            "text-(--color-text-text-primary) group flex gap-x-3 rounded-md p-2 text-sm/6 font-medium hover:text-(--color-text-text-highlight)"
          }
        >
          <KeyboardArrowRight aria-hidden="true" fill={styleVariables.ColorNeutralWhite} className="inline size-6 shrink-0" />
          {item.title}
        </Anchor>
      </li>
    );
  }

  return (
    <li key={item.name} className="border-l-1 border-(--color-neutral-neutral-80)">
      <div
        onClick={() => setOpen(!open)}
        className={
          "text-(--color-text-text-primary) group flex gap-x-3 rounded-md p-2 text-sm/6 font-medium hover:text-(--color-text-text-highlight)"
        }
      >
        { open ? 
            <KeyboardArrowDown aria-hidden="true" className="inline size-6 shrink-0 pr-0" /> :
            <KeyboardArrowRight aria-hidden="true" className="inline size-6 shrink-0 pr-0" />
        }
        {item.title}
      </div>
      <ul className={`${open ? "block" : "hidden"} list-none`}>
        {item.children.map((child) => (
          <li key={child.route}>
            <Anchor
              key={child.route}
              href={child.route}
              className={
                "text-(--color-text-text-primary) group flex gap-x-3 rounded-md p-0 text-sm/6 font-light pl-4 hover:text-(--color-text-text-highlight)"
              }
            >
              <KeyboardArrowRight aria-hidden="true" fill={styleVariables.ColorNeutralWhite} className="inline size-6 shrink-0" />
              {child.title}
            </Anchor>
          </li>
        ))}
      </ul>
    </li>
  );
};

export const Sidebar: FC<{ pageMap: PageMapItem[] }> = ({ pageMap }) => {
  const [open, setOpen] = React.useState(true);
  const pathname = usePathname();
  const routeOriginal = useFSRoute();
  const route = routeOriginal.split("#", 1)[0]!;

  const { docsDirectories } = normalizePages({
    list: pageMap,
    route: pathname,
  });

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-1 list-none">
        {docsDirectories.map((item) => (
          <NaviBlock item={item} key={item.route} />
        ))}
      </ul>
    </nav>
  );
};
