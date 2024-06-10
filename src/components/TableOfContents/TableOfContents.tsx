import { FC } from 'react';
import { useTableOfContents } from './useTableOfContents.ts';

type TableOfContentsProps = ReturnType<typeof useTableOfContents>;

// TODO: TableOfContents should render a hierarchical list of items
//  item_1
//      item_1_1
//          item_1_1_1
//      item_1_2
//  item_2
//  item_3
//      item_3_1
//  item_4



export const TableOfContents: FC<TableOfContentsProps> = ({ items, onClick, expandOrCollapseAll, isExpandedAll }) => (
    <div>
        <button onClick={expandOrCollapseAll}>{isExpandedAll ? 'Collapse All' : 'Expand All'}</button>
        {items.map((item) => (
            <div key={item.id} style={{ display: 'flex' }}>
                <div style={{ width: item.level * 20, height: 10 }} />
                <button onClick={onClick(item)}>{item.name}</button>
            </div>
        ))}
    </div>
);

