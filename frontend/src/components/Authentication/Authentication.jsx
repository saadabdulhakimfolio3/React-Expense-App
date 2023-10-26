import React from "react";

// Ant Design
import { Form, Input, Checkbox, Button, Row, Col, Alert, Spin } from "antd";
import {
  UserOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

// Redux
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

// Components
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Authentication() {
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col
          xs={0}
          sm={14}
          style={{
            backgroundImage:
              "url(https://www.wellybox.com/wp-content/uploads/2021/01/9-expense-manager-app-1536x1024.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <h1
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              padding: "16px",
              color: "#fff",
              background: "rgba(0, 0, 0, 0.5)",
              width: "50%",
              textAlign: "center",
            }}
          >
            Expense Tracker
          </h1>
        </Col>

        <Col xs={24} sm={10}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              backgroundColor: "white",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {status === "failed" ? (
              <Alert
                message={error}
                type="error"
                showIcon
                closable
                icon={<CloseCircleOutlined />}
              />
            ) : status === "succeded" ? (
              <Alert message="Successful!" type="success" showIcon />
            ) : (
              <></>
            )}
            {status === "loading" ? (
              <Spin size="large" />
            ) : (
              <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="*" element={<SignIn />} />
              </Routes>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
