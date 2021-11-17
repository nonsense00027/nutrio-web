import React from "react";
import { Table, Tag, Space, Input, Button, Tooltip } from "antd";
import Sidebar from "../../components/Sidebar";
import { AudioOutlined, ExportOutlined } from "@ant-design/icons";
import { usePatientsContext } from "../../contexts/PatientsContext";
import { getMessaging, getToken } from "../../shared/configs/firebase";
import axios from "axios";
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
      console.log("text ", text.id);
      console.log("record ", record.id);
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

function PatientsPage() {
  const { patients, loading } = usePatientsContext();

  const { user } = useAuthContext();

  const getPatients = () => {
    return patients.filter(
      (patient) => patient.pending === false && patient.dietician === user.uid
    );
  };

  const sendMessage = () => {
    console.log("CLICKED");
    const messaging = getMessaging();
    const url =
      "https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1";

    // Content-Type: application/json
    // Authorization: Bearer ya29.ElqKBGN2Ri_Uz...HnS_uNreA

    // {
    //    "message":{
    //       "token":"bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
    //       "notification":{
    //         "body":"This is an FCM notification message!",
    //         "title":"FCM Message"
    //       }
    //    }
    // }

    const config = {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    };

    const bodyParameters = {
      key: "value",
    };

    axios
      .post(
        url,
        {
          message: {
            token:
              "eZ8zLWVvRcWHFAIXeXwdOo:APA91bGU6HiYbwyo9yaFelSlJvvo5m3tL2KrH1kIhiEZqqoGKkK9QwHmOfg2oieAzDOms4DOFsXaCzTL5LXU7R4nowWITQ6ugZUBsg1PA0NHC_0qTt1gUdmyK_K-TFJG074cE0z8Tr_3",
            notification: {
              body: "This is an FCM notification message!",
              title: "FCM Message",
            },
          },
        },
        config
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // getToken(messaging, {
    //   vapidKey:
    //     "BKDn6hOV8RE_qtPYrxbYwHxNAlMkamJjTUbsjPg2V5IvSXXE94x5v83lTx9P4YEyjmoUPP71iypuhS1WThG9wgY",
    // })
    //   .then((currentToken) => {
    //     if (currentToken) {
    //       console.log("CURRENT TOKEN IS ", currentToken);
    //       // Send the token to your server and update the UI if necessary
    //       // ...
    //     } else {
    //       // Show permission request UI
    //       console.log(
    //         "No registration token available. Request permission to generate one."
    //       );
    //       // ...
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("An error occurred while retrieving token. ", err);
    //     // ...
    //   });
  };
  return (
    <div className="py-10" style={{ paddingLeft: 276, paddingRight: 20 }}>
      <Sidebar />
      <div>
        <div className="w-96 mb-4 float-right">
          {/* <Button onClick={sendMessage}>Send message</Button> */}
          <Search
            size="large"
            placeholder="Search patient"
            onSearch={onSearch}
            enterButton
          />
        </div>

        <Table columns={columns} dataSource={getPatients()} loading={loading} />
      </div>
    </div>
  );
}

export default PatientsPage;
