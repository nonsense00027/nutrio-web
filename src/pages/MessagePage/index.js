import React from "react";
import PatientSidebar from "../../components/PatientSidebar";
import {
  EditFilled,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

function MessagePage() {
  return (
    <div className="h-screen overflow-scroll flex" style={{ paddingLeft: 256 }}>
      <PatientSidebar />
      <div className="relative flex-1 h-full">
        <h1>Message</h1>
        <div className="absolute bottom-0 left-0 w-full p-5">
          <div className="bg-gray-50 py-2 px-4 rounded-md flex space-x-4 items-center">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              //   onClick={() => setEditing((prevEditing) => !prevEditing)}
            ></Button>
            <div className="flex-1 bg-gray-50">
              <input
                className="w-full h-full py-2 bg-gray-50 outline-none"
                type="text"
              />
            </div>
            <SendOutlined className="text-xl text-primary" color="#73DB7F" />
          </div>
        </div>
      </div>
      <div className="w-80 h-full bg-gray-100"></div>
    </div>
  );
}

export default MessagePage;
