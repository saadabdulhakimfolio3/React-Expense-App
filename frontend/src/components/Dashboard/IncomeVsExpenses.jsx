import React, { useEffect, useState } from "react";

// MUI
import {
  Typography,
  Input,
  Button,
  Select,
  Table,
  Space,
  Row,
  Col,
  Spin,
} from "antd";
import { LineChart } from "@mui/x-charts";

// Redux Toolkit
import { useSelector, useDispatch } from "react-redux";
import { getincomes } from "../../features/incomeSlice";

export default function IncomeVsExpenses() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // States
  const [incomesState, setIncomesState] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [expensesMonth, setExpensesMonth] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  // React-Redux
  const expenses = useSelector((state) => state.expenses.unfilteredList);
  const getExpensesStatus = useSelector((state) => state.expenses.getStatus);
  const addExpensesStatus = useSelector((state) => state.expenses.addStatus);

  const getStatus = useSelector((state) => state.income.getStatus);
  const addStatus = useSelector((state) => state.income.updateStatus);
  const incomes = useSelector((state) => state.income.incomes);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const getTotalByMonth = () => {
    const monthTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Iterate through the expenses
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseYear = expenseDate.getFullYear();
      const expenseMonth = expenseDate.getMonth(); // Months are 0-based

      if (expenseYear === currentYear) {
        monthTotal[expenseMonth] += Number(expense.amount);
      }
    });

    // Now, monthTotal is an array where each element represents the total expenses for that month.
    // It will look like: [totalJan, totalFeb, ..., totalDec]

    // Set the state or return the monthTotal array as needed
    setExpensesMonth(monthTotal);
  };

  const updateIncomes = () => {
    const list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const index in incomes) {
      const income = incomes[index];

      list[income.month] = Number(income.income);
    }
    setIncomesState(list);
  };

  // Use Effect
  useEffect(() => {
    dispatch(getincomes(currentUser.uid));
  }, [addStatus]);

  useEffect(() => {
    if (getStatus == "succeded") {
      console.log(incomes);
      updateIncomes();
    }
  }, [getStatus]);
  useEffect(() => {
    if (getStatus == "succeded") {
      console.log(incomes);
      getTotalByMonth();
      console.log(expensesMonth);
    }
  }, [getExpensesStatus]);

  return (
    <>
      {getStatus === "loading" ? (
        <Spin size="large" />
      ) : (
        <>
          <Typography.Title level={2}>
            {new Date().getFullYear()} Income vs Expenses
          </Typography.Title>
          <Row gutter={16}>
            <Col span={12} style={{ marginTop: 20 }}>
              <LineChart
                xAxis={[
                  {
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    label: "Month", // Add this line for the x-axis label
                  },
                ]}
                series={[
                  {
                    data: incomesState,
                    label: "Income", // Add this line for the y-axis label
                  },
                  {
                    data: expensesMonth,
                    label: "Total Expenses", // Add this line for the y-axis label
                  },
                ]}
                width={500}
                height={300}
              />
            </Col>
            <Col span={12}>
              <Table
                pagination={{ pageSize: 6 }}
                dataSource={months.map((month, index) => ({
                  key: index,
                  month,
                  income: incomesState[index],
                  totalExpense: expensesMonth[index],
                }))}
              >
                <Table.Column title="Month" dataIndex="month" key="month" />
                <Table.Column title="Income" dataIndex="income" key="income" />
                <Table.Column
                  title="Total Expense"
                  dataIndex="totalExpense"
                  key="totalExpense"
                />
              </Table>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
