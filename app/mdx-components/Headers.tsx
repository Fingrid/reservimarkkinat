"use client";
import cn from 'clsx'
import type { ComponentProps, FC, JSX } from 'react'
import { HeadingAnchor } from './HeadingAnchor'
import { Body, Heading1, Heading2, Heading3, Heading4 } from '@fingrid/design-system-components';

const createHeading = (
  Tag: `h${1 | 2 | 3 | 4 | 5 | 6}`
): FC<ComponentProps<typeof Tag>> =>
  function Heading({ children, id, className }) {
    let element: JSX.Element | undefined = undefined;
    switch (Tag) {
        case 'h1': {
            element = <Heading1 className={`${className} py-4`}>{children}</Heading1>;
            break;
        }
        case 'h2': {
            element = <Heading2 className={`${className} py-3`}>{children}</Heading2>;
            break;
        }
        case 'h3': {
            element = <Heading3 className={`${className} py-2`}>{children}</Heading3>;
            break;
        }
        case 'h4': {
            element = <Heading4 className={`${className} py-2`}>{children}</Heading4>;
            break;
        }
        default: {
            element = <Body kind="primary" className={`${className} py-2`}>{children as any}</Body>;
            break;
        }
    }

    return (
      <Tag id={id}>
        {element}
        {id && <HeadingAnchor id={id} />}
      </Tag>
    )
  }

export const H1 = createHeading('h1')
export const H2 = createHeading('h2')
export const H3 = createHeading('h3')
export const H4 = createHeading('h4')
export const H5 = createHeading('h5')
export const H6 = createHeading('h6')
