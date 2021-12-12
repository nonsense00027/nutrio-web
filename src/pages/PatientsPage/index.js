import React from "react";
import { Table, Space, Input, Button, Tooltip } from "antd";
import Sidebar from "../../components/Sidebar";
import { ExportOutlined } from "@ant-design/icons";
import { usePatientsContext } from "../../contexts/PatientsContext";
import { useAuthContext } from "../../contexts/AuthContext";

const { Search } = Input;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => {
      return (
        <Space size="middle">
          <Tooltip title="Open" overlayInnerStyle={{ fontSize: 12 }}>
            <Button
              type="primary"
              icon={<ExportOutlined />}
              onClick={() =>
                window.open(
                  // `${window.location.href}/${row.id}`,
                  `/patients/${text.id}`,
                  "_blank"
                )
              }
            />
          </Tooltip>
        </Space>
      );
    },
  },
];

const onSearch = (value) => console.log(value);

function PatientsPage() {
  const { patients, loading } = usePatientsContext();

  const { user } = useAuthContext();

  const getPatients = () => {
    return patients.filter(
      (patient) => patient.pending === false && patient.dietician === user.id
    );
  };

  return (
    <div
      className="py-10 min-h-screen"
      style={{ paddingLeft: 276, paddingRight: 20 }}
    >
      <Sidebar />
      <div>
        <div className="w-96 mb-4 float-right">
          {/* <Button onClick={sendMessage}>Send message</Button> */}
          <Search
            placeholder="Search patient"
            onSearch={onSearch}
            // enterButton
          />
        </div>

        <Table
          size="small"
          columns={columns}
          dataSource={getPatients()}
          loading={loading}
          rowKey={"id"}
        />
      </div>
    </div>
  );
}

export default PatientsPage;
