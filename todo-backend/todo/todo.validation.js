import * as Yup from "yup";
import dayjs from "dayjs";

const currentDate = dayjs();
export const todoValidationSchema = Yup.object({
  title: Yup.string().max(20).trim().required(),
  description: Yup.string().required().trim().max(55),
  date: Yup.date().min(currentDate).required(),
});

// skip-limit data validation

export const getTodoListValidationSchema = Yup.object({
  page: Yup.number("Page must be a number")
    .min(1, "Page must be at least 1")
    .integer("Page must be an integer")
    .default(1),
  limit: Yup.number()
    .min(1, "Limit must be at least 1")
    .integer("Limit must be an integer")
    .default(1),
});
