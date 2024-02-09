import { useNavigate } from "react-router-dom";
import axios from "../../helpers/axios";
import Constants from "../../helpers/constants";
import { Form, Input, Button, Typography, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

const { Title } = Typography;

const validationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await axios.post("/user/sign-in", values);
        localStorage.setItem(Constants.ACCESS_TOKEN, result.data.token);
      } catch (err: any) {
        console.log(err, "Error");
        messageApi.open({
          type: "error",
          content: err.response.data,
        });
      }
    },
  });
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/sign-up");
  };
  return (
    <div className="login-container">
      {contextHolder}
      <div className="header">
        <Title level={2}>Login</Title>
      </div>
      <Form layout="vertical" autoComplete="off" onFinish={formik.handleSubmit}>
        <Form.Item
          name="username"
          label="Username"
          className="input-container"
          validateStatus={
            formik.touched && formik.errors.username ? "error" : ""
          }
          help={
            formik.touched && formik.errors.username
              ? formik.errors.username
              : ""
          }
        >
          <Input
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          className="input-container"
          validateStatus={
            formik.touched && formik.errors.password ? "error" : ""
          }
          help={
            formik.touched && formik.errors.password
              ? formik.errors.password
              : ""
          }
        >
          <Input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <div>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="link" htmlType="button" onClick={handleRedirect}>
            Create an account ?
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
