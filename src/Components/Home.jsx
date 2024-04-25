// import React from "react";
// import { Form, Input, DatePicker, Button } from "antd";
// import { useNavigate } from "react-router-dom";


// const Home = () => {

//     const navigate = useNavigate();

//     const onFinish = (values) => {
//         const year = values.date.$y
//         const month = values.date.$d.getMonth() + 1
//         const emp1 = values.emp1
//         const emp2 = values.emp2
//         const emp3 = values.emp3

//         navigate("/sheet", {
//             state: {
//               year,
//               month,
//               emp1,
//               emp2,
//               emp3,
//             },
//           });
//       };
//       const onFinishFailed = (errorInfo) => {
//         console.log("Failed:", errorInfo);
//       };


//   return (
//     <div className="page">
//       <div className="input-for-sheet">
//         <Form
//           className="form"
//           name="basic"
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//           <Form.Item 
//           hasFeedback
//           name="date"
//           rules={[
//             {
//               required: true,
//             },
//           ]}
//           >
//             <DatePicker className="Form-item" picker="month" />
//           </Form.Item>

//           <Form.Item
//             hasFeedback
//             name="emp1"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your employee name!",
//               },
//             ]}
//           >
//             <Input placeholder="employee name" />
//           </Form.Item>

//           <Form.Item
//             hasFeedback
//             name="emp2"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your employee name!",
//               },
//             ]}
//           >
//             <Input placeholder="employee name" />
//           </Form.Item>

//           <Form.Item
//             hasFeedback
//             name="emp3"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your employee name!",
//               },
//             ]}
//           >
//             <Input placeholder="employee name" />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useEffect } from "react";
import { Form, Select, DatePicker, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Home = () => {
  const navigate = useNavigate();

 

  const onFinish = (values) => {
    const year = values.date.$y;
    const month = values.date.$d.getMonth() + 1;
    const { emp1, emp2, emp3 } = values;

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
    <div className="home" >
       <nav>
       <h4>SHIFT SCHEDULER</h4>
      </nav>
   
      <div className="input-for-sheet">
      <div>

        <p>
          Please select a month and select three employees to generate their shift schedule.
        </p>
      </div>
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
                message: "Please select a month!",
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
                message: "Please select employee 1!",
              },
            ]}
          >
            <Select placeholder="Select Employee 1">
              <Option value="ANIL">ANIL</Option>
              <Option value="JOHNSON">JOHNSON</Option>
              <Option value="BIJU">BIJU</Option>
            </Select>
          </Form.Item>

          <Form.Item
            hasFeedback
            name="emp2"
            rules={[
              {
                required: true,
                message: "Please select employee 2!",
              },
            ]}
          >
            <Select placeholder="Select Employee 2">
              <Option value="ANIL">ANIL</Option>
              <Option value="JOHNSON">JOHNSON</Option>
              <Option value="BIJU">BIJU</Option>
            </Select>
          </Form.Item>

          <Form.Item
            hasFeedback
            name="emp3"
            rules={[
              {
                required: true,
                message: "Please select employee 3!",
              },
            ]}
          >
            <Select placeholder="Select Employee 3">
              <Option value="ANIL">ANIL</Option>
              <Option value="JOHNSON">JOHNSON</Option>
              <Option value="BIJU">BIJU</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Generate
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Home;
