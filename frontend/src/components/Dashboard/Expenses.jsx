import React from "react";
import AddExpenseForm from "./AddExpenseForm";
import EnhancedTable from "./Table";
import ExpensesSummary from "./ExpensesSummary";
import IncomeVsExpenses from "./IncomeVsExpenses";
import SetMonthlyForm from "./SetMonthlyForm";
import { Typography, Row, Col } from "antd";

export default function Expenses() {
  return (
    <div>
      <Typography.Title
        level={4}
        style={{ marginTop: "10vh", marginLeft: "1vw" }}
      >
        Expenses Dashboard
      </Typography.Title>
      <Row gutter={16} style={{ padding: 16 }}>
        <Col xs={24}>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "16px",
              padding: 16,
              marginTop: "1vh",
            }}
          >
            <ExpensesSummary />
          </div>
        </Col>
        <Col xs={24}>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "16px",
              padding: 16,
              marginTop: "1vh",
            }}
          >
            <IncomeVsExpenses />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "16px",
              padding: 16,
              marginTop: "2vh",
            }}
          >
            <AddExpenseForm />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "16px",
              padding: 16,
              marginTop: "2vh",
            }}
          >
            <SetMonthlyForm />
          </div>
        </Col>
        <Col xs={24}>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "16px",
              padding: 16,
              marginTop: "2vh",
              marginBottom: "2vh",
            }}
          >
            <EnhancedTable />
          </div>
        </Col>
      </Row>
    </div>
  );
}
