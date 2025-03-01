import * as Yup from "yup";
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .max(2200, "Maximum 2200 characters allowed")
    .required("Description is required"),
  postType: Yup.string()
    .oneOf(
      ["hackathons", "achievement", "project", "other"],
      "Invalid post type"
    )
    .required("Post type is required"),
  location: Yup.string(),
  category: Yup.string()
    .oneOf(
      ["education", "career", "technology", "personal", "other"],
      "Invalid category"
    )
    .required("Category is required"),
  accessibility: Yup.string()
    .oneOf(["public", "private"], "Invalid accessibility")
    .required("Accessibility is required"),
  hideComments: Yup.boolean(),
  hideLikes: Yup.boolean(),
});
export default validationSchema;
