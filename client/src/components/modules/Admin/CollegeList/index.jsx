import { Box } from "@mui/material";
import UserDataGrid from "../../../Common/CustomDataGrid/index";
import { CollegeColumn } from "./CollegeColumn";
import { useState } from "react";
import TopSearchFilters from '../../../Common/CustomDataGrid/TopSearchFilters';
import { useGetAllCollege } from '@services/api/Auth/college.service';
import { useUpdateStatusCollege } from '@services/api/Auth/college.service';

const filters = [
    {
        label: "Verified",
        name: "verified",
        options: ["true", "false"],
    },
    {
        label: "Accredited",
        name: "accredited",
        options: ["true", "false"],
    },
    {
        label: "Is Active",
        name: "isActive",
        options: ["true", "false"],
    },
];

const CollegeList = () => {
    const { mutateAsync: updateCollege } = useUpdateStatusCollege();

    const [collegePagination, setCollegePagination] = useState({
        page: 1,
        pageSize: 20,
    });

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedFilters, setSelectedFilters] = useState(
        filters.reduce((acc, filter) => ({ ...acc, [filter.name]: "" }), {})
    );

    const {
        data: collegeData = { data: [], totalCount: 0 },
        refetch: refetchColleges,
    } = useGetAllCollege(
        {
            page: collegePagination.page,
            limit: collegePagination.pageSize,
            search: searchTerm,
            ...selectedFilters,
        },
        { data: [], totalCount: 0 }
    );

    const handleFilterChange = (filterName, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterName]: value,
        }));
        setCollegePagination((prev) => ({ ...prev, page: 1 }));
        refetchColleges();
    };

    const handlePageChange = (newPage) => {
        setCollegePagination((prev) => ({ ...prev, page: newPage }));
    };

    const handleToggleAccredited = async (_id) => {
        const body = {
            field: "accredited"
        };
        await updateCollege({ body, _id });
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
                searchPlaceholder="Search Colleges"
                filters={filters}
                setSelectedFilters={setSelectedFilters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
            />
            <UserDataGrid
                rows={collegeData.data}
                columns={CollegeColumn(handleToggleAccredited)}
                totalRows={collegeData.totalCount || 0}
                rowsPerPage={collegePagination.pageSize}
                currentPage={collegePagination.page}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export default CollegeList;
