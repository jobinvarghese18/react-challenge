import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import Table from "../../components/table";
import { Organization, User } from "../../model";
import axios from "../../helpers/axios";

const Home = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState<Array<Organization> | []>(
    []
  );
  const [users, setUsers] = useState<Array<User> | []>([]);
  const columns = [
    { key: "name", title: "Name", dataIndex: "name" },
    { key: "address", title: "Address", dataIndex: "address" },
  ];
  const userColumns = [
    { key: "username", title: "Name", dataIndex: "username" },
    {
      key: "organization",
      title: "Organization",
      dataIndex: ["organization", "name"],
    },
    { key: "role", title: "Role", dataIndex: "role" },
  ];

  const menuItems = [
    {
      key: 1,
      label: "Home",
      onClick: () => {
        navigate("/home");
      },
    },
    {
      key: 2,
      label: "Login",
      onClick: () => {
        localStorage.clear();
        navigate("/");
      },
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get("/organization");
        const data = result.data.data?.map(
          (item: Organization, index: number) => {
            return { key: index, ...item };
          }
        );
        setOrganization(data);
      } catch (err) {
        setOrganization([]);
        console.log(err);
      }
      try {
        const userResult = await axios.get("/user");
        const users = userResult.data.data.map((item: User) => {
          return { ...item, key: item._id };
        });

        setUsers(users);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={menuItems}
        style={{ flex: 1, minWidth: 0 }}
      />

      <div className="layout">
        <div className="layout-content">
          {!!organization?.length && (
            <>
              <h2>Organization</h2>
              <Table data={organization} columns={columns} />
            </>
          )}

          <h2>Employees</h2>
          <Table data={users} columns={userColumns} />
        </div>
      </div>
    </div>
  );
};

export default Home;
