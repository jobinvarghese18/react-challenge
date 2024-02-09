import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});
const Login = () => {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/sign-up");
  };
  return (
    <div className="login-container">
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
