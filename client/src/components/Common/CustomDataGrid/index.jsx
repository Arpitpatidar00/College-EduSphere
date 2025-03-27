// src/components/UserDataGrid.js
import CustomDataGrid from './CustomDataGrid';
import Pagination from './Pagination';

const UserDataGrid = ({ rows, columns, totalRows, rowsPerPage, currentPage, onPageChange }) => {
    return (
        <div>
            <CustomDataGrid columns={columns} currentRows={rows} />
            <Pagination
                totalRows={totalRows}
                rowsPerPage={rowsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default UserDataGrid;