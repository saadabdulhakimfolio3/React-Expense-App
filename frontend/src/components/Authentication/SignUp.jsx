// TODO remove, this demo shouldn't need to reset the theme.
import { Avatar, Button, Input, Form, Row, Col, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

// Redux toolkit
import { registerUser, loginUser, reset } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";

// React
import { useRef, useState, useEffect } from "react";

export default function SignUp() {
  // Refs
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  // Redux
  const dispatch = useDispatch();

  // Submitting form
  const handleSubmit = (event) => {
    dispatch(
      registerUser({
        email: emailRef.current.input.value,
        password: passwordRef.current.input.value,
        displayName: nameRef.current.input.value,
      })
    );
  };

  return (
    <>
      <Avatar style={{ backgroundColor: "#e0e0e0" }}>
        <UserOutlined />
      </Avatar>
      <h1>Sign Up</h1>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your Full Name!",
            },
            {
              min: 2,
              message: "Name must be at least 2 characters!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Full Name"
            ref={nameRef}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
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
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
            maxLength={20}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "31%" }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <Row>
        <Col>
          <a href="/login">Already have an account? Sign In</a>
        </Col>
      </Row>
    </>
  );
}
