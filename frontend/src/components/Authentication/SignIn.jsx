// MUI
import * as React from "react";
import { Avatar, Button, Checkbox, Input, Form, Row, Col } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

//React-Router-Dom
import { useNavigate } from "react-router-dom";

// ReduxToolkit
import { registerUser, loginUser, reset } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";

// React
import { useRef, useState, useEffect } from "react";

export default function SignIn() {
  useEffect(() => {}, []);

  // Refs
  const emailRef = useRef("");
  const passwordRef = useRef("");

  // Redux
  const dispatch = useDispatch();

  // Router
  const navigate = useNavigate();

  // SUbmitting form
  const handleSubmit = (event) => {
    dispatch(
      loginUser({
        email: emailRef.current.input.value,
        password: passwordRef.current.input.value,
      })
    );
  };

  // Performing validation checks on fields

  return (
    <>
      <Avatar style={{ backgroundColor: "#e0e0e0" }}>
        <LockOutlined />
      </Avatar>
      <h1>Sign in</h1>
      <Form onFinish={handleSubmit} style={{ alignItems: "center" }}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email Address"
            ref={emailRef}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            ref={passwordRef}
            maxLength={20}
          />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ marginLeft: "22%" }}
        >
          <Checkbox
            onChange={(e) => {
              console.log(e.target.checked);
              localStorage.setItem("remember-me", e.target.checked);
            }}
          >
            Remember me
          </Checkbox>
        </Form.Item>
        <Form.Item style={{ marginLeft: "33%" }}>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <Row>
        <Col>
          <a href="/signup">Don't have an account? Sign Up</a>
        </Col>
      </Row>
    </>
  );
}
