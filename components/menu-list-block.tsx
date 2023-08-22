'use client';

import { BlockTitle, List, ListItem } from 'konsta/react';
import { InAppLink } from '@/components/in-app-link';
import * as React from 'react';

export const MenuListBlock = ({
  title,
  items,
}: {
  title: string;
  items: { title: string; href: string; after?: string }[];
}) => {
  return (
    <>
      <BlockTitle>{title}</BlockTitle>
      <List>
        {items.map((item) => (
          // <ListItem key={item.href} linkComponent={InAppLink} {...item} />
          <ListItem
            key={item.href}
            linkComponent={React.forwardRef((props, ref) => (
              <InAppLink ref={ref} {...props} />
            ))}
            {...item}
          />
        ))}
      </List>
    </>
  );
};

// <ListItem
//     key={item.href}
//     linkComponent={React.forwardRef((props, ref) => (
//         <InAppLink ref={ref} {...props} />
//     ))}
//     {...item}
// />
