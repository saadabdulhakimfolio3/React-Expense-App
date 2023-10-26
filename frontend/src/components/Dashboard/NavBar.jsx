import React, { useState } from "react";
import { Button, Layout, Menu, Typography, Space, Avatar } from "antd";
import {
  MenuOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;

import Profile from "../Authentication/Profile";
import Expenses from "./Expenses";

// React-Router-Dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

// Reduxtoolkit
import { logout } from "../../features/authSlice";
import { reset } from "../../features/authSlice";
import { reset as resetExpenses } from "../../features/expensesSlice";
import { reset as resetIncome } from "../../features/incomeSlice";
import { reset as resetBudget } from "../../features/budgetSlice";
import { useSelector, useDispatch } from "react-redux";

export default function NavBar() {
  // States
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Router
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  function handleSignOut() {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetBudget());
    dispatch(resetExpenses());
    dispatch(resetIncome());
    navigate("/");
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={open}
        onCollapse={() => setOpen(!open)}
        style={{
          position: "fixed",
          height: "100vh", // Set the sidebar to full viewport height
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/home">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{ marginLeft: open ? 80 : 200, overflow: "hidden" }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Space align="center">
            <Typography.Title level={4} style={{ margin: 0, color: "white" }}>
              Expense Tracker
            </Typography.Title>
          </Space>

          <Space>
            <UserOutlined style={{ fontSize: 24, color: "white" }} />
            <Typography.Text strong style={{ margin: 0, color: "white" }}>
              {currentUser.displayName}
            </Typography.Text>
            <Button
              type="primary"
              onClick={handleSignOut}
              style={{ margin: 0, color: "white" }}
            >
              Sign Out
            </Button>
          </Space>
        </Header>
        <Content>
          <Routes>
            <Route path="/home" element={<Expenses />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Expenses />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
