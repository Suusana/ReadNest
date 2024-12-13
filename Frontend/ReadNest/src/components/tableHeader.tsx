import { TableProps } from "@/types/staticData";

const TableHeader: React.FC<TableProps> = ({ headers, showCheckbox, isAllSelected, handleSelectAll }) => {
    return (
        <thead className='text-lg'>
            <tr className='bg-cyan-400'>
                <th className="w-16">
                    {showCheckbox && 
                    <label>
                        <input type="checkbox"
                            className="checkbox border-2 border-gray-500"
                            checked={isAllSelected}
                            onChange={handleSelectAll} />
                    </label>}

                </th>
                {headers.map((header, index) => (
                    <th key={index} className={header.width}>{header.title}</th>
                ))}
            </tr>
        </thead>


    );
}

export default TableHeader


