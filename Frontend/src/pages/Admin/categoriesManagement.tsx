import { CaterogiesHeaders } from "@/assets/staticData";
import Alert from "@/components/Alert";
import Pagination from "@/components/Pagination";
import RecordsPerPage from "@/components/RecordsPerPage";
import Reminder from "@/components/reminder";
import TableHeader from "@/components/tableHeader";
import usePage from "@/hooks/usePage";
import useSelection from "@/hooks/useSelection";
import { addCategory, DeleteCategory, editCategory, fetchCategories } from "@/service/categories";
import { Category, CategoryRoot, CategoryType } from "@/types/categories";
import { closeDialog, openModal } from "@/utils/uiInteract";
import { useEffect, useState } from "react";

const Categories = () => {
  const [Data, setData] = useState<CategoryRoot | null>(null); // all the categories info
  const { Page, setPage, PageSize, setPageSize, Total, setTotal } = usePage();

  const [deleteSuccess, setDeleteSuccess] = useState<Boolean>(false);
  const [addSuccess, setAddSuccess] = useState<Boolean>(false);
  const [editSuccess, setEditSuccess] = useState<Boolean>(false);
  const [noSelect, setNoSelect] = useState<Boolean>(false);
  const [CategoryExist, setCategoryExist] = useState<boolean>(false);

  const {
    selectedItems: selectedCategories, // 已选择的
    handleSelectAll, // 全选/取消全选处理函数
    handleSelectItem, // 单个选择/取消选择处理函数
    isAllSelected, // 是否已经全选
    changePage
  } = useSelection(
    Data?.categories || [], // 数据源
    (Category) => Category.categoryId // 唯一标识函数
  );

  const [EmptyInput, setEmptyInput] = useState({
    category: false,
    description: false,
  });

  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [editcategory, setEditCategory] = useState<string>("");
  const [editdescription, setEditDescription] = useState<string>("");

  const loadCategories = async ()=>{
    try {
      const res = await fetchCategories(Page, PageSize);
      const Total = res.data.data.total; //total records
      setTotal(Total)
      setData({ categories: res.data.data.rows })
  } catch (error) {
      console.error("Error fetching books categories:", error);
  }
  }

  useEffect(() => {
    loadCategories()
  }, [Page, PageSize, Total])

  const totalPages = Math.ceil(Total / PageSize);

  // delete the chosen categories
  const Delete = async (categoryIds: number[] | Set<number>) => {
    const categoriesIds = Array.from(categoryIds);
    try {
      await DeleteCategory(categoriesIds);

      setData(prevCategories => {
        if (!prevCategories) return null;
        const updatedCategories = prevCategories.categories.filter(
          (category) => !categoriesIds.includes(category.categoryId)
        );
        setTotal(updatedCategories.length)
        return {
          ...prevCategories,
          categories: updatedCategories
        };
      });

      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleBulkDelete = () => {
    if (selectedCategories.size === 0) {
      setNoSelect(true);
      return
    }
    openModal("Bulk_Delete")
  }

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const allEempty = {
      category: category.trim() === '',
      description: description.trim() === ''
    };
    setEmptyInput(allEempty);

    if (!allEempty.category && !allEempty.description) {
      const newCategory: CategoryType = {
        category, description
      }

      const data = await addCategory(newCategory);
      if (data === 0) {
        setEmptyInput({ ...EmptyInput, category: true })
        setCategoryExist(true);
      } else {
        setCategoryExist(false)
        console.log("huilaide ", data)
        const newData: Category = data;
        // console.log("return object:" + newData)

        closeDialog("addNewCategory");
        setData(prevCategories => {
          const updatedCategories = prevCategories ? [...prevCategories.categories, newData] : [newData];

          setTotal(updatedCategories.length);
          return {
            ...prevCategories,
            categories: updatedCategories
          };
        });
        setAddSuccess(true);
        setCategory("");
        setDescription("");
      }

    }
  }

  const handleClose = () => {
    setCategory("");
    setDescription("");
    setCategoryExist(false);
    closeDialog("addNewCategory")
    setEmptyInput({
      category: false,
      description: false
    })
  }

  const openEditModal = (mode: string, category: string, description: string) => {
    const modal = document.getElementById(mode) as HTMLDialogElement;

    setEditCategory(category);
    setEditDescription(description);

    modal?.showModal();
  }

  const edit = async (categoryId: number) => {
    const newCategory: Category = {
      categoryId,
      category: editcategory,
      description: editdescription,
      totalBooks: 0 //backend will not edit the totals num, so can pass any number
    }

    const newData = await editCategory(newCategory);

    setData(prevCategories => {
      if (prevCategories) {
        return {
          ...prevCategories,
          categories: prevCategories.categories.map(category =>
            category.categoryId === categoryId ? newData : category
          )
        };
      }
      return { categories: [newData] };
    });
    setEditSuccess(true);
  }

  return (
    <div className="p-4">
      {noSelect && <Alert content="Please select at least one category" alertType="alert-error" onClose={() => setNoSelect(false)} />}
      {deleteSuccess && <Alert content="Delete successfully" alertType="alert-success" onClose={() => setDeleteSuccess(false)} />}
      {addSuccess && <Alert content="Add new category successfully" alertType="alert-success" onClose={() => setAddSuccess(false)} />}
      {editSuccess && <Alert content="Edit category successfully" alertType="alert-success" onClose={() => setEditSuccess(false)} />}


      <h1 className="text-4xl font-bold mb-5">Categories Management</h1>
      <div className="flex justify-between space-x-2 mb-4">
        <RecordsPerPage PageSize={PageSize} Total={Total} setPageSize={setPageSize} />

        <button className="btn btn-accent mr-10" onClick={() => openModal("addNewCategory")}>Add New Category</button>
        <button
          onClick={handleBulkDelete}
          className="btn btn-secondary">Bulk Delete</button>

        <Reminder id="Bulk_Delete"
          title="Are you sure you want to delete?"
          content="After you delete these categories, you can not view them again"
          onClick={() => Delete(selectedCategories)} />

      </div>
      <table className="table table-zebra w-full table-fixed">
        <TableHeader headers={CaterogiesHeaders} showCheckbox={true}
          isAllSelected={isAllSelected} handleSelectAll={handleSelectAll} />
        <tbody>
          {Data?.categories.map((category) => (
            <tr key={category.categoryId}>
              <th className="w-16" >
                <label>
                  <input type="checkbox"
                    className="checkbox border-2 border-gray-500"
                    checked={selectedCategories.has(category.categoryId)}
                    onChange={() => { handleSelectItem(category.categoryId) }} />
                </label>
              </th>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap text-center" title={category.category}>{category.category}</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap" title={category.description}>{category.description}</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap text-center">{category.totalBooks}</td>
              <td>
                <button
                  onClick={() => openEditModal(`EditCategory-${category.categoryId}`, category.category, category.description)}
                  className="btn btn-outline btn-success mr-3">Edit</button>

                {/* Edit this category */}
                <dialog id={`EditCategory-${category.categoryId}`} className="modal">
                  <div className="modal-box space-y-4">
                    <h3 className="font-bold text-lg">Edit Category</h3>
                    <label className="form-control">
                      <span className="label-text mb-2 text-md">Category</span>
                      <input
                        value={editcategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        onClick={() => setEmptyInput({ ...EmptyInput, category: false })}
                        type="text" placeholder="Type a category"
                        className="input input-bordered" />
                      <span className={`text-red-700 text-sm ${EmptyInput.category ? 'visible' : 'invisible'}`}>
                        Please enter the category
                      </span>
                    </label>
                    <label className="form-control">
                      <span className="label-text mb-2 text-md">Description</span>
                      <textarea
                        value={editdescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="textarea textarea-bordered h-96 resize-none "
                        placeholder="Describe this category"
                        onClick={() => setEmptyInput({ ...EmptyInput, description: false })}
                      ></textarea>
                      <span className={`text-red-700 text-sm ${EmptyInput.description ? 'visible' : 'invisible'}`}>
                        Please enter the description
                      </span>
                    </label>
                    <div className="modal-action">
                      <form method="dialog">
                        <button
                          onClick={() => edit(category.categoryId)}
                          className="btn">Save</button>
                        <button className="btn ml-5">Cancel</button>
                      </form>
                    </div>
                  </div>
                </dialog>

                <button
                  onClick={() => openModal(`DeleteCategory-${category.categoryId}`)}
                  className="btn btn-outline btn-error ">Delete</button>

                <Reminder id={`DeleteCategory-${category.categoryId}`}
                  title="Are you sure you want to delete?"
                  content="After you delete this category, you can not view it anymore"
                  onClick={() => Delete([category.categoryId])} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination Page={Page} totalPages={totalPages} setPage={setPage} changePage={changePage} />

      {/* add new category */}
      <dialog id="addNewCategory" className="modal">
        <div className="modal-box space-y-4">
          <h3 className="font-bold text-lg">Add a New Category</h3>
          <label className="form-control">
            <span className="label-text mb-2 text-md">Category</span>
            <input
              value={category}
              onChange={(e) => { setCategory(e.target.value); setCategoryExist(false) }}
              onClick={() => { setEmptyInput({ ...EmptyInput, category: false }); setCategoryExist(false) }}
              type="text" placeholder="Type a category"
              className="input input-bordered" />
            <span className={`text-red-700 text-sm ${EmptyInput.category ? 'visible' : 'invisible'}`}>
              {CategoryExist ? "This category has already exist" : "Please enter the category"}
            </span>
          </label>
          <label className="form-control">
            <span className="label-text mb-2 text-md">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered h-96 resize-none "
              placeholder="Describe this category"
              onClick={() => setEmptyInput({ ...EmptyInput, description: false })}
            ></textarea>
            <span className={`text-red-700 text-sm ${EmptyInput.description ? 'visible' : 'invisible'}`}>
              Please enter the description
            </span>
          </label>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={(e) => add(e)}
                className="btn">Comfirm</button>
              <button className="btn ml-5" onClick={handleClose}>Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Categories