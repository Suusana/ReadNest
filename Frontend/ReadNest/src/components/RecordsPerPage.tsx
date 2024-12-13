interface PerPageProps {
    PageSize: number
    Total: number
    setPageSize: (size: number) => void
}

const RecordsPerPage: React.FC<PerPageProps> = ({ PageSize, Total, setPageSize }) => {
    return (
        <div className="flex items-center space-x-4 mr-10">
            <span className="text-sm font-semibold">Show</span>
            <select
                value={PageSize}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setPageSize(Number(e.target.value)) }}
                className="select select-bordered w-32">
                <option value={5}>5 records</option>
                <option value={10}>10 records</option>
                <option value={15}>15 records</option>
            </select>
            <span className="text-sm font-semibold">Per Page - Total {Total} Records</span>
        </div>
    );
}

export default RecordsPerPage