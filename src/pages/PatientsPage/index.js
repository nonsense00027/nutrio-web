import React from "react";
import { Table, Space, Input, Button, Tooltip } from "antd";
import Sidebar from "../../components/Sidebar";
import { ExportOutlined } from "@ant-design/icons";
import { usePatientsContext } from "../../contexts/PatientsContext";
import { useAuthContext } from "../../contexts/AuthContext";
import Notification from "../../components/Notification";
import {
  SearchCircleIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

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
    <div className="pl-32 pt-10 pr-96 bg-gray-50 min-h-screen">
      <div className="pr-9">
        <Sidebar />
        <Notification />
        <div>
          <div className="flex items-center justify-between mb-14">
            <h1 className="font-primary font-bold text-3xl">
              👱‍♀️ List of Patients
            </h1>
            <div className="w-96 bg-white flex shadow-sm rounded-sm overflow-hidden">
              <input
                type="text"
                className="py-2 flex-1 focus:ring-0 outline-none px-2"
              />
              <div className="bg-green-500 flex items-center justify-center px-2">
                <SearchIcon className="h-6 w-6 text-white" />
              </div>
            </div>
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
    </div>
  );
}

export default PatientsPage;
