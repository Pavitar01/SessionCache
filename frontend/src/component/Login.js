import { Button, Form, Input } from "antd";
import { AddUser } from "../Redux/userSlice";
import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Login = ({ isLoggin }) => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8001/api/user/login-user",
        {
          username: values.username,
          password: values.password,
        }
      );
      if (data.success) {
        messageApi.open({
          type: "success",
          content: data.message,
        });
      } else {
        messageApi.open({
          type: "info",
          content: data.message,
        });
      }
      dispatch(AddUser(data.user));
      localStorage.setItem("IsloggedIn", true);
    } catch (err) {
      console.log(err);
    }
  };
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div className="form">
      {contextHolder}
      <h1
        style={{ textAlign: "center", marginBottom: "50px", fontSize: "40px" }}
      >
        LOGIN
      </h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className="btn">
            Log In
          </Button>
        </Form.Item>

        <p
          style={{
            color: "purple",
            width: "100%",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            isLoggin(false);
          }}
        >
          {isLoggin ? "Signup?" : "Already have an Account ?"}
        </p>
      </Form>
    </div>
  );
};

export default Login;
