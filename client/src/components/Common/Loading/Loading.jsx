import { Backdrop, CircularProgress } from "@mui/material";

function Loading({ isOpen, customStyles = {} }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 11110, ...customStyles }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
