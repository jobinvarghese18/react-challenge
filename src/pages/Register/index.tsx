import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../helpers/axios";
import { Form, Input, Button, Select, Typography, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Organization } from "../../model";
const { Title } = Typography;
const { Option } = Select;

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  organization: Yup.string().required("Organization is required"),
});

const Register = () => {
  const [organization, setOrganization] = useState<Array<Organization> | []>(
    []
  );
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get("/organization/list");
        setOrganization(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      organization: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.post("/user/sign-up", values);
        navigate("/");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err, "Error");
        messageApi.open({
          type: "error",
          content: err.response.data.message,
        });
      }
      setSubmitting(false);
    },
  });

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="header">
        {contextHolder}
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
            {organization.map((item: Organization) => {
              return (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
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
        <div>
          <Button
            type="primary"
            htmlType="submit"
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
          <Button type="link" htmlType="button" onClick={handleRedirect}>
            Already have account ?
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
