import React from "react";
import { Table, Tag, Space, Input, Button, Tooltip } from "antd";
import Sidebar from "../../components/Sidebar";
import {
  AudioOutlined,
  ExportOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { usePatientsContext } from "../../contexts/PatientsContext";
import { getMessaging, getToken } from "../../shared/configs/firebase";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";
import { db, doc, setDoc } from "../../shared/configs/firebase";

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
      console.log("text ", text.id);
      console.log("record ", record.id);
      return (
        <Space size="middle">
          <Tooltip title="Accept" overlayInnerStyle={{ fontSize: 12 }}>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => {
                const docRef = doc(db, "profile", record.id);
                setDoc(docRef, { pending: false }, { merge: true });
              }}
            />
          </Tooltip>
          <Tooltip title="Remove" overlayInnerStyle={{ fontSize: 12 }}>
            <Button
              type="primary"
              danger
              icon={<DeleteFilled />}
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

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const onSearch = (value) => console.log(value);

function PendingPage() {
  const { patients, loading } = usePatientsContext();

  const { user } = useAuthContext();

  const getPending = () => {
    return patients.filter(
      (patient) => patient.pending === true && patient.dietician === user.uid
    );
  };

  const acceptPatient = () => {};

  return (
    <div className="py-10" style={{ paddingLeft: 276, paddingRight: 20 }}>
      <Sidebar />
      <div>
        <Table columns={columns} dataSource={getPending()} loading={loading} />
      </div>
    </div>
  );
}

export default PendingPage;
