// Card List type in the dashboard
export interface cardItem {
    key: string
    link: string,
    title: string,
    content: string
}

//alerts' type
export interface AlertProps {
    content: string;
    alertType: string;
    onClose?: () => void;
}

//menu type
export interface menuItem {
    label: string,
    key: string,
    icon: string
}

export interface OneFunProps {
    onClose?: () => void;
}

//reminders components type
export interface ReminderProps {
    id: string;
    title: string;
    content: string;
    onClick: () => void;
}

//svg components type
export interface SvgProps {
    Link: string;
}

//Paginition components type
export interface PageType {
    Page: number,
    totalPages: number,
    setPage: (Page: number) => void,
    changePage: () => void
}

// table headers type
export type tableheader = {
    title: string,
    width: string
}

//table headers components type
export type TableProps = {
    headers: Array<{ title: string, width: string }>
    showCheckbox?: boolean
    isAllSelected ?:boolean
    handleSelectAll ?: () => void
}

// per page props
export interface PerPageProps {
    PageSize: number
    Total: number
    setPageSize: (size: number) => void
}
