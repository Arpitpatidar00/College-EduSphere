import { Box } from "@mui/material";
import TopSearchFilters from "../../../Common/CustomDataGrid/TopSearchFilters";
import UserDataGrid from "../../../Common/CustomDataGrid/index";
import { StudentColumn } from "./StudentColumn";
import { useGetAllStudents, useUpdateStatusStudent } from "@services/api/Auth/student.service";
import { useState } from "react";

const filters = [
    {
        label: "Verified",
        name: "verified",
        options: ["true", "false"],
    },
    {
        label: "College Verified",
        name: "collegeVerified",
        options: ["true", "false"],
    },
    {
        label: "Is Active",
        name: "isActive",
        options: ["true", "false"],
    },
];


const AdminStudentList = () => {
    const { mutateAsync: updateStudent } = useUpdateStatusStudent();

    const [studentPagination, setStudentPagination] = useState({
        page: 1,
        pageSize: 20,
    });

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedFilters, setSelectedFilters] = useState(
        filters.reduce((acc, filter) => ({ ...acc, [filter.name]: "" }), {})
    );


    const {
        data: studentData = { data: [], totalCount: 0 },
        refetch: refetchStudents,
    } = useGetAllStudents(
        {
            page: studentPagination.page,
            limit: studentPagination.pageSize,
            search: searchTerm,
            ...selectedFilters, // Spread filter values (verified, collegeVerified, isActive)
        },
        { data: [], totalCount: 0 }
    );



    const handleFilterChange = (filterName, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterName]: value,
        }));
        setStudentPagination((prev) => ({ ...prev, page: 1 })); // Reset to page 1 on filter change
        refetchStudents();
    };



    const handlePageChange = (newPage) => {
        setStudentPagination((prev) => ({ ...prev, page: newPage }));
    };
    const handleToggleCollegeVerified = async (_id) => {

        const body = {
            field: "collegeVerified"
        }
        await updateStudent({ body, _id });

    };

    return (
        <Box
            sx={{
                ml: 4,
                mt: 2,
                height: "calc(100vh - 104px)",
                width: "94%",
            }}
        >
            <TopSearchFilters
                searchPlaceholder="Search Students"
                filters={filters}
                setSelectedFilters={setSelectedFilters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
            />
            <UserDataGrid
                rows={studentData.data}
                columns={StudentColumn(handleToggleCollegeVerified)} // Pass function correctly

                totalRows={studentData.totalCount || 0}
                rowsPerPage={studentPagination.pageSize}
                currentPage={studentPagination.page}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export default AdminStudentList;