import { Table } from "antd";
import { AnyObject } from "yup";

interface TableColumn {
  key: string;
  title: string;
  dataIndex: string | Array<string>;
}
interface Props {
  data: AnyObject[];
  columns: Array<TableColumn>;
}
const { Column } = Table;

const App = (props: Props) => (
  <Table dataSource={props.data} key="_id">
    {props.columns.map((column) => {
      return (
        <Column
          key={column.key}
          title={column.title}
          dataIndex={column.dataIndex}
        />
      );
    })}
  </Table>
);

export default App;
