import React, { useEffect } from "react";
import { useState, useRef } from "react";

// MUI3
import {
  Alert,
  Typography,
  Input,
  Button,
  Form,
  Select,
  notification,
} from "antd";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;

// ReduxToolkit
import { useSelector, useDispatch } from "react-redux";
import { updateBudget } from "../../features/budgetSlice";
import { updateincome } from "../../features/incomeSlice";

export default function SetMonthlyForm() {
  // States
  const [incomeValue, setIncomeValue] = useState("");
  const [incomeMonthValue, setIncomeMonthValue] = useState("");
  const [budgetValue, setBudgetValue] = useState("");
  const [budgetCategoryValue, setBudgetCategoryValue] = useState("");

  // States  const [amountError, setAmountError] = useState(false);
  const [incomeError, setIncomeError] = useState(false);
  const [incomeMonthError, setIncomeMonthError] = useState(false);
  const [budgetError, setBudgetError] = useState(false);
  const [budgetCategoryError, setBudgetCategoryError] = useState(false);

  // React-Redux
  const budgetStatus = useSelector((state) => state.budget.updateStatus);
  const incomeStatus = useSelector((state) => state.income.updateStatus);
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const handleUpdateIncome = () => {
    if (validationCheckIncome()) {
      dispatch(
        updateincome({
          income: incomeValue,
          month: incomeMonthValue - 1,
          year: new Date().getFullYear(),
          uid: user.uid,
        })
      );
    }
  };

  const handleUpdateBudget = () => {
    if (validationCheckBudget()) {
      dispatch(
        updateBudget({
          budget: budgetValue,
          category: budgetCategoryValue,
          uid: user.uid,
        })
      );
    }
  };

  const validationCheckBudget = () => {
    setBudgetCategoryError(false);
    setBudgetError(false);

    var check = true;
    if (budgetValue === "") {
      setBudgetError(true);
      check = false;
    }
    if (
      budgetCategoryValue !== "Transportation" &&
      budgetCategoryValue !== "Entertainment" &&
      budgetCategoryValue !== "Utilities" &&
      budgetCategoryValue !== "Other" &&
      budgetCategoryValue !== "Food"
    ) {
      setBudgetCategoryError(true);
      check = false;
    }
    return check;
  };

  const validationCheckIncome = () => {
    setIncomeError(false);
    setIncomeMonthError(false);

    var check = true;
    if (incomeValue === "") {
      setIncomeError(true);
      check = false;
    }

    if (
      incomeMonthValue === "" ||
      isNaN(incomeMonthValue) ||
      incomeMonthValue < 1 ||
      incomeMonthValue > 12
    ) {
      setIncomeMonthError(true);
      check = false;
    }
    return check;
  };

  return (
    <>
      <Typography.Title level={5}>Expenses Tracking</Typography.Title>
      <Form>
        <Form.Item
          name="income"
          label="Month's Income"
          required
          validateStatus={incomeError ? "error" : ""}
          help={incomeError ? "Please specify income." : ""}
        >
          <Input
            type="number"
            disabled={incomeStatus === "loading"}
            value={incomeValue}
            onChange={(e) => setIncomeValue(e.target.value)}
            prefix="$"
          />
        </Form.Item>
        <Form.Item
          name="incomeMonth"
          label="Month"
          required
          validateStatus={incomeMonthError ? "error" : ""}
          help={incomeMonthError ? "Please specify income month." : ""}
        >
          <Select
            style={{ width: 200 }}
            disabled={incomeStatus === "loading"}
            value={incomeMonthValue}
            onChange={(value) => setIncomeMonthValue(value)}
          >
            <Option value="1">January</Option>
            <Option value="2">February</Option>
            <Option value="3">March</Option>
            <Option value="4">April</Option>
            <Option value="5">May</Option>
            <Option value="6">June</Option>
            <Option value="7">July</Option>
            <Option value="8">August</Option>
            <Option value="9">September</Option>
            <Option value="10">October</Option>
            <Option value="11">November</Option>
            <Option value="12">December</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleUpdateIncome}
            loading={incomeStatus === "loading"}
          >
            Update
          </Button>
        </Form.Item>
        <Form.Item
          name="budget"
          label="Month's Budget"
          required
          validateStatus={budgetError ? "error" : ""}
          help={budgetError ? "Please specify budget." : ""}
        >
          <Input
            type="number"
            disabled={budgetStatus === "loading"}
            value={budgetValue}
            onChange={(e) => setBudgetValue(e.target.value)}
            prefix="$"
          />
        </Form.Item>
        <Form.Item
          name="budgetCategory"
          label="Budget Category"
          required
          validateStatus={budgetCategoryError ? "error" : ""}
          help={budgetCategoryError ? "Please specify budget category." : ""}
        >
          <Select
            style={{ width: 200 }}
            disabled={budgetStatus === "loading"}
            value={budgetCategoryValue}
            onChange={(value) => setBudgetCategoryValue(value)}
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
            onClick={handleUpdateBudget}
            loading={budgetStatus === "loading"}
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
