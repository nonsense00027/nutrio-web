import React from "react";
import { Table, Space, Button, Tooltip, Popconfirm } from "antd";
import Sidebar from "../../components/Sidebar";
import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import { usePatientsContext } from "../../contexts/PatientsContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { db, doc, setDoc } from "../../shared/configs/firebase";
import Notification from "../../components/Notification";
import { SearchIcon, UserCircleIcon } from "@heroicons/react/solid";

function PendingPage() {
  const { patients, loading } = usePatientsContext();

  const { user } = useAuthContext();

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
            <Popconfirm
              title="Are you sure to accept this patient?"
              onConfirm={() => {
                const docRef = doc(db, "profile", record.id);
                setDoc(docRef, { pending: false }, { merge: true });
              }}
              onCancel={() => console.log("cancel")}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Accept" overlayInnerStyle={{ fontSize: 12 }}>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  // onClick={() => {
                  //   const docRef = doc(db, "profile", record.id);
                  //   setDoc(docRef, { pending: false }, { merge: true });
                  // }}
                />
              </Tooltip>
            </Popconfirm>
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

  const getPending = () => {
    return patients.filter(
      (patient) => patient.pending === true && patient.dietician === user.id
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
              👱‍♀️ Pending patients
            </h1>
          </div>
          <Table
            size="small"
            columns={columns}
            dataSource={getPending()}
            loading={loading}
            rowKey={"id"}
          />
        </div>
      </div>
    </div>
  );
}

export default PendingPage;
