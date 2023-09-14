import React from "react";
import { Form, Input, DatePicker, Button } from "antd";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();

    const onFinish = (values) => {
        const year = values.date.$y
        const month = values.date.$d.getMonth() + 1
        const emp1 = values.emp1
        const emp2 = values.emp2
        const emp3 = values.emp3

        navigate("/sheet", {
            state: {
              year,
              month,
              emp1,
              emp2,
              emp3,
            },
          });
      };
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };


  return (
    <div className="page">
      <div className="input-for-sheet">
        <Form
          className="form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item 
          hasFeedback
          name="date"
          rules={[
            {
              required: true,
            },
          ]}
          >
            <DatePicker className="Form-item" picker="month" />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="emp1"
            rules={[
              {
                required: true,
                message: "Please input your employee name!",
              },
            ]}
          >
            <Input placeholder="employee name" />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="emp2"
            rules={[
              {
                required: true,
                message: "Please input your employee name!",
              },
            ]}
          >
            <Input placeholder="employee name" />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="emp3"
            rules={[
              {
                required: true,
                message: "Please input your employee name!",
              },
            ]}
          >
            <Input placeholder="employee name" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Home;
