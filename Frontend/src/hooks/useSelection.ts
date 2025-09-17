import { useState } from "react";

const useSelection = <T,>(items: T[], getItemId: (item: T) => number) => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());// store the ids of selected items
  const [selectAll, setSelectAll] = useState(false); // control the status of select all checkbox

  // Toggle select all

  const handleSelectAll = () => {
    setSelectAll((prevSelectAll) => {
      const newSelectAll = !prevSelectAll;
      setSelectedItems(
        newSelectAll ? new Set(items.map(getItemId)) : new Set()
      );
      return newSelectAll;
    });
  };

  // Check if all items are selected
  const isAllSelected = selectedItems.size === items.length;

  // Toggle single item selection
  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prevSelectedItems => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemId)) {
        newSelectedItems.delete(itemId);
      } else {
        newSelectedItems.add(itemId);
      }
      setSelectAll(newSelectedItems.size === items.length);
      return newSelectedItems;
    });
  };

  const changePage = () => {
    setSelectedItems(new Set())
    setSelectAll(false);
  }

  return {
    selectedItems,
    selectAll,
    handleSelectAll,
    handleSelectItem,
    isAllSelected,
    setSelectAll,
    changePage
  };
};

export default useSelection;
