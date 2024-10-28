import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../api/user';

const Registration = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {

        try {
            const response = await RegisterUser(values);
            if (response?.success) {
                message.success(response?.message);
                navigate("/login")
            } else {
                message.success(response?.message);
            }
        } catch (error) {
            message.error(error)
            console.log(error)
        }
    }

    return (
        <header className="App-header">
            <main className="main-area mw-500 text-center px-3">
                <section>
                    <h1>Register to BookMyShow</h1>
                </section>
                <section>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Name"
                            htmlFor="name"
                            name="name"
                            className="d-block"
                            rules={[{ required: true, message: "Name is Required" }]}
                        >
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            htmlFor="email"
                            name="email"
                            className="d-block"
                            rules={[{ required: true, message: "Email is Required" }]}
                        >
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your Email"
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            htmlFor="password"
                            name="password"
                            className="d-block"
                            rules={[{ required: true, message: "Password is Required" }]}
                        >
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your Password"
                            ></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                style={{ fontSize: "1rem", fontWeight: "600" }}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
                <section>
                    <p>
                        Already a user ? <Link to="/login">Login Now</Link>
                    </p>
                </section>
            </main>
        </header>
    )
}

export default Registration