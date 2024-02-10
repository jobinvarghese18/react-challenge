import { Menu } from "antd";
import Table from "../../components/table";
import { Organization, User } from "../../model";
import { useEffect, useState } from "react";
import axios from "../../helpers/axios";

const Home = () => {
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

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get("/organization");
        const userResult = await axios.get("/user");
        const users = userResult.data.data.map((item: User) => {
          return { ...item, key: item._id };
        });

        setUsers(users);
        const data = result.data.data?.map(
          (item: Organization, index: number) => {
            return { key: index, ...item };
          }
        );
        setOrganization(data);
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
        defaultSelectedKeys={["2"]}
        items={[
          { key: 1, label: "Home" },
          { key: 2, label: "Login" },
        ]}
        style={{ flex: 1, minWidth: 0 }}
      />

      <div className="layout">
        <div className="layout-content">
          <h2>Organization</h2>
          <Table data={organization} columns={columns} />

          <h2>Employees</h2>
          <Table data={users} columns={userColumns} />
        </div>
      </div>
    </div>
  );
};

export default Home;
