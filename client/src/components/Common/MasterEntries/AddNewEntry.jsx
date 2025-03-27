
import { Button } from '@mui/material';
export const AddNewEntry = ({ entityType }) => {
    return (
        <Button variant="contained" color="primary">
            Add New {entityType}
        </Button>
    );
};