// src/components/AddPostForm/styles.js
import { APP_COLORS } from "../../../../enums/Colors";

export const uploadStageStyles = {
  container: {
    maxWidth: "md",
  },
  paper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.primary[600],
    color: APP_COLORS.common.white,
    borderRadius: 2,
  },
  iconBox: {
    display: "flex",
    marginBottom: 2,
  },
  iconDivider: {
    fontSize: 35,
    lineHeight: 1,
    marginX: 1,
  },
  svgIcon: {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
  },
  button: {
    borderRadius: 8,
    paddingX: 3,
    paddingY: 1,
  },
};

export const editStageStyles = {
  root: {
    display: "flex",
    flexDirection: "column",
  },
  appBar: {
    position: "static",
    color: "transparent",
    elevation: 0,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  imageContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.common.black, // Updated
  },
  selectedImage: {
    maxWidth: "100%",
    objectFit: "contain",
  },
  tagOverlay: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: APP_COLORS.common.white, // Updated
    paddingY: 1,
    paddingX: 2,
    borderRadius: 5,
  },
  sidebar: {
    width: 320,
    padding: 2,
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 3,
  },
  textField: {
    marginBottom: 2,
  },
  iconTextContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 1,
  },
  iconText: {
    marginLeft: 1,
  },
  optionsContainer: {
    marginTop: 4,
  },
  optionItem: {
    display: "flex",
    justifyContent: "space-between",
    paddingY: 2,
    borderTop: 1,
    borderBottom: 1,
    borderColor: "divider",
  },
};

export const cropStageStyles = {
  root: {
    display: "flex",
    flexDirection: "column",
  },
  appBar: {
    position: "static",
    color: "transparent",
    elevation: 0,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  imageContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.common.black, // Updated
    position: "relative",
  },
  selectedImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  controlButtons: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 2,
  },
  iconButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: APP_COLORS.common.white, // Updated
  },
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  cropContainer: {
    position: "relative",
    flexGrow: 1,
    background: APP_COLORS.grey[800], // Updated
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 0",
    background: APP_COLORS.common.white, // Updated
  },
  slider: {
    width: "200px",
    margin: "0 10px",
  },
};
