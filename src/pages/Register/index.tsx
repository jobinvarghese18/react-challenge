import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Typography } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
const { Title } = Typography;
const { Option } = Select;

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  organization: Yup.string().required("Organization is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      organization: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
      navigate("/");
    },
  });

  return (
    <div className="login-container">
      <div className="header">
        <Title level={2}>Register</Title>
      </div>
      <Form layout="vertical" autoComplete="off" onFinish={formik.handleSubmit}>
        <Form.Item
          className="input-container"
          label="Username"
          validateStatus={
            formik.errors.username && formik.touched.username ? "error" : ""
          }
          help={
            formik.errors.username && formik.touched.username
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
          className="input-container"
          label="Password"
          validateStatus={
            formik.errors.password && formik.touched.password ? "error" : ""
          }
          help={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ""
          }
        >
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          className="input-container"
          label="Organization"
          validateStatus={
            formik.errors.organization && formik.touched.organization
              ? "error"
              : ""
          }
          help={
            formik.errors.organization && formik.touched.organization
              ? formik.errors.organization
              : ""
          }
        >
          <Select
            value={formik.values.organization}
            onChange={(value) => formik.setFieldValue("organization", value)}
            onBlur={() => formik.setFieldTouched("organization", true)}
          >
            <Option value="lucy">Lucy</Option>
          </Select>
        </Form.Item>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
