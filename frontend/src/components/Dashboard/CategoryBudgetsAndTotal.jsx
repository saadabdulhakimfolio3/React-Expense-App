import React, { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { getBudgets } from "../../features/budgetSlice";

export default function CategoryBudgetsAndTotal() {
  // React-Redux
  const budgets = useSelector((state) => state.budget.budgets);
  const expenses = useSelector((state) => state.expenses.unfilteredList);
  const getExpensesStatus = useSelector((state) => state.expenses.getStatus);
  const addExpensesStatus = useSelector((state) => state.expenses.addStatus);
  const addBudgetStatus = useSelector((state) => state.budget.updateStatus);
  const getBudgetStatus = useSelector((state) => state.budget.getBudgetStatus);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  // States
  const [categoryTotals, setCategoryTotals] = useState({});

  // Use Effects
  useEffect(() => {
    dispatch(getBudgets(currentUser.uid));
  }, [addBudgetStatus]);

  useEffect(() => {
    getTotalByCategory();
  }, [getExpensesStatus, addExpensesStatus]);

  const getTotalByCategory = () => {
    const categoryTotals = {};

    // Get the current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so we add 1 to get the current month as a number

    // Iterate through the expenses
    expenses.forEach((expense) => {
      const { amount, category, date } = expense;

      // Parse the date string to get the month
      const expenseDate = new Date(date);
      const expenseMonth = expenseDate.getMonth() + 1;

      // Check if the expense is from the current month
      if (expenseMonth === currentMonth) {
        // If the category is not in the categoryTotals object, initialize it with the amount
        if (!categoryTotals[category]) {
          categoryTotals[category] = Number(amount);
        } else {
          // If the category is already in categoryTotals, add the amount to the existing total
          categoryTotals[category] += Number(amount);
        }
      }
    });

    setCategoryTotals(categoryTotals);
  };

  const getStatus = (amount, budget) => {
    if (amount > budget) {
      return "error";
    }
    if (amount > budget - budget / 10) {
      return "warning";
    }
    return "success";
  };

  return (
    <Table
      pagination={false}
      dataSource={budgets}
      loading={getExpensesStatus === "loading"}
      columns={[
        {
          title: "Category",
          dataIndex: "category",
          key: "category",
        },
        {
          title: "Month's Budget",
          dataIndex: "budget",
          key: "budget",
        },
        {
          title: "Month's Expense",
          dataIndex: "category",
          key: "category",
          render: (category) => categoryTotals[category] || 0,
        },
        {
          title: "Month's Status",
          dataIndex: "category",
          key: "category",
          render: (category) => {
            const budget = budgets.find((b) => b.category === category);
            const status = getStatus(
              categoryTotals[category] || 0,
              budget.budget
            );
            return (
              <Alert
                type={
                  status === "success"
                    ? "success"
                    : status === "warning"
                    ? "warning"
                    : "error"
                }
                message={
                  status === "success"
                    ? "Budget is Safe!"
                    : status === "warning"
                    ? "Budget is close to being exceeded!"
                    : "Budget Exceeded!"
                }
              ></Alert>
            );
          },
        },
      ]}
    />
  );
}
