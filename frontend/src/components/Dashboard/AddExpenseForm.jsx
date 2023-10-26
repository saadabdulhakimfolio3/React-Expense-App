import React, { useEffect } from "react";
import { useState, useRef } from "react";

// Components
import CategoryBudgets from "./CategoryBudgetsAndTotal";

// MUI3
import {
  Alert,
  Typography,
  Input,
  Button,
  Form,
  Select,
  DatePicker,
  notification,
} from "antd";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;

// ReduxToolkit
import { useSelector, useDispatch } from "react-redux";
import { addExpense, reset } from "../../features/expensesSlice";

export default function AddExpenseForm() {
  // States
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Redux
  const status = useSelector((state) => state.expenses.addStatus);
  const error = useSelector((state) => state.expenses.error);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  // States
  const [amountError, setAmountError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  // Submit
  const handleSubmit = () => {
    // console.log(date);
    // console.log(category);
    // console.log(description);
    // console.log(amount);
    if (validationCheck()) {
      dispatch(
        addExpense({
          uid: currentUser.uid,
          amount: amount,
          date: date,
          description: description,
          category: category,
        })
      );
    }
  };

  useEffect(() => {
    console.log(status);
    if (status == "succeded") {
      // setAmount("");
      // // dateRef.target.value = null;
      // setDescription("");
      setTimeout(() => {
        dispatch(reset());
      }, 5000);
    }
  }, [status]);

  const validationCheck = () => {
    setAmountError(false);
    setDateError(false);
    setDescriptionError(false);
    setCategoryError(false);
    var check = true;

    if (amount == "") {
      setAmountError(true);
      check = false;
    }
    if (date == "") {
      setDateError(true);
      check = false;
    }
    if (description == "") {
      setDescriptionError(true);
      check = false;
    }
    if (
      category != "Transportation" &&
      category != "Entertainment" &&
      category != "Utilities" &&
      category != "Other" &&
      category != "Food"
    ) {
      setCategoryError(true);
      check = false;
    }

    return check;
  };
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const disabledDate = (target) => {
    // The target parameter represents the date you are checking.
    // If it's a valid date and it's greater than today, disable it.
    return target && target > new Date();
  };

  return (
    <>
      <Typography.Title level={5}>Add An Expense</Typography.Title>
      {status === "failed" ? (
        <Alert message={error} type="error" />
      ) : status === "succeded" ? (
        <Alert message="Expense Added!" type="success" />
      ) : null}
      <Form>
        <Form.Item
          name="description"
          label="Description"
          required
          validateStatus={descriptionError ? "error" : ""}
          help={descriptionError ? "Please describe expense." : ""}
        >
          <Input
            disabled={status === "loading"}
            maxLength={30}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          required
          validateStatus={amountError ? "error" : ""}
          help={amountError ? "Please specify amount." : ""}
        >
          <Input
            type="number"
            disabled={status === "loading"}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            prefix="$"
          />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          required
          validateStatus={dateError ? "error" : ""}
          help={dateError ? "Please specify date." : ""}
        >
          <DatePicker
            disabled={status === "loading"}
            format="YYYY-MM-DD"
            disabledDate={disabledDate}
            value={date}
            onChange={(e) => {
              setDate(moment(e).format("YYYY-MM-DD"));
            }}
          />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          required
          validateStatus={categoryError ? "error" : ""}
          help={categoryError ? "Please specify category." : ""}
        >
          <Select
            disabled={status === "loading"}
            style={{ width: 200 }}
            value={category}
            onChange={(e) => {
              console.log(e);
              setCategory(e);
            }}
          >
            <Option value="Food">Food</Option>
            <Option value="Transportation">Transportation</Option>
            <Option value="Utilities">Utilities</Option>
            <Option value="Entertainment">Entertainment</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={status === "loading"}
          >
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
