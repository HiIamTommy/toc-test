import { ContentItem } from './types/ContentItem.ts';
import { useState } from 'react';

type TableOfContentsArg = {
    items: ContentItem[];
};

// TODO: expand/collapse of items
// TODO: Collapse recursively

export const useTableOfContents = ({ items }: TableOfContentsArg) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const visibleItems: ContentItem[] = items.filter((item) => {
        expandedItems.has(item.id)
        if(item.level === 1) {
            return true;
        }
        return expandedItems.has(<string>item.parentId);
    });

    const collapseChildren = (item: ContentItem) => {
        items.forEach((child) => {
            if (child.parentId === item.id) {
                setExpandedItems((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(child.id);
                    return newSet;
                });
                collapseChildren(child);
            }
        });
    }


    const [isExpandedAll, setIsExpandedAll] = useState<boolean>(false);
    const expandOrCollapseAll = () => {
        if(isExpandedAll) {
            setExpandedItems(new Set());
        } else {
            setExpandedItems(new Set(items.map(item => item.id)));
        }
        setIsExpandedAll(!isExpandedAll);
    }

    const onClick = (item: ContentItem) => () => {
        setExpandedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(item.id)) {
                newSet.delete(item.id);
                collapseChildren(item);
            } else {
                newSet.add(item.id);
            }
            return newSet;
        });
        console.log(expandedItems)


    };

    return { items: visibleItems, onClick, expandOrCollapseAll, isExpandedAll };
};

