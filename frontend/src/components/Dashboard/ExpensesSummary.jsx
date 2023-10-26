import React, { useRef } from "react";
import { Typography, Row, Col, Input, Button, Spin, Select } from "antd";
import { useSelector } from "react-redux";
import {
  PieChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
} from "@ant-design/icons";
import ExpensesBreakdown from "./ExpensesBreakdown";
import CategoryBudgetsAndTotal from "./CategoryBudgetsAndTotal";

const { Text } = Typography;
const { Option } = Select;

export default function ExpensesSummary() {
  // States
  const amountRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  // Redux
  const getStatus = useSelector((state) => state.expenses.getStatus);

  return (
    <>
      {getStatus === "loading" ? (
        <Spin size="large" />
      ) : (
        <div style={{ padding: "20px" }}>
          <Typography.Title type="primary" level={2}>
            Month's Summary
          </Typography.Title>
          <Row gutter={[16, 16]} style={{ marginTop: "10px" }}>
            <Col xs={24} sm={12}>
              <ExpensesBreakdown />
            </Col>
            <Col xs={24} sm={12}>
              <CategoryBudgetsAndTotal />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
