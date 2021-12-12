import React, { useEffect } from "react";
import PatientSidebar from "../../components/PatientSidebar";
import {
  EditFilled,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Input, Popover } from "antd";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  db,
  query,
  collection,
  orderBy,
  onSnapshot,
} from "../../shared/configs/firebase";
import { collectIdsAndDocs } from "../../shared/utilities";
import { useAuthContext } from "../../contexts/AuthContext";
import { useUserContext } from "../../contexts/UserContext";

const { TextArea } = Input;
function MessagePage() {
  const { patientId } = useParams();
  const { user } = useAuthContext();
  const { sendMessage } = useUserContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  console.log("messages: ", messages);
  useEffect(() => {
    console.log("patient id: ", patientId);
    const q = query(
      collection(
        db,
        "dieticians",
        user.id,
        "chats",
        patientId,
        "conversations"
      ),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("snapshot", snapshot);
      setMessages(snapshot.docs.map((doc) => collectIdsAndDocs(doc)));
    });

    setLoading(false);

    return () => {
      unsubscribe();
    };
  }, [patientId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(patientId, message);
    setMessage("");
  };

  const handleSendMeet = () => {
    sendMessage(
      patientId,
      "You can download Google Meet through this link: https://play.google.com/store/apps/details?id=com.google.android.apps.meetings"
    );
    setVisible(false);
  };
  return (
    <div className="h-screen overflow-scroll flex" style={{ paddingLeft: 256 }}>
      <PatientSidebar />
      <div className="relative flex flex-col flex-1 h-full justify-end pb-20 px-6 space-y-2">
        {/* <h1>Message</h1> */}
        {/* MESSAGES HERE */}
        {messages.map((message) => (
          <div
            className={`items-center px-4 py-2 rounded-md shadow-sm text-white max-w-lg ${
              message.user === user.id
                ? "self-end bg-gray-400"
                : "self-start bg-secondary"
            }`}
          >
            {message.message}
          </div>
        ))}
        <div className="absolute bottom-0 left-0 w-full p-5">
          <form
            onSubmit={handleSendMessage}
            className="bg-gray-100 rounded-md flex items-center"
          >
            <Popover
              content={
                <div>
                  <div
                    className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100"
                    onClick={handleSendMeet}
                  >
                    <span class="iconify" data-icon="logos:google-meet"></span>
                    <p>Google meet</p>
                  </div>
                </div>
              }
              title="Attachment"
              trigger="click"
              visible={visible}
              onVisibleChange={(visible) => setVisible(visible)}
            >
              <Button
                type="primary"
                shape="circle"
                style={{ marginLeft: 10 }}
                icon={<PlusOutlined />}
                //   onClick={() => setEditing((prevEditing) => !prevEditing)}
              ></Button>
            </Popover>

            <div className="flex-1 bg-gray-100 px-4">
              <TextArea
                autoSize={{ minRows: 1, maxRows: 5 }}
                bordered={false}
                className="w-full h-full py-2 outline-none focus:ring-0 focus:outline-none"
                type="text"
                value={message}
                style={{ backgroundColor: "transparent" }}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="h-full bg-secondary py-3 px-3">
              <SendOutlined
                className="text-xl text-white"
                color="#fff"
                twoToneColor="#fff"
                style={{
                  color: "#fff",
                }}
              />
            </button>
          </form>
        </div>
      </div>
      <div className="w-80 h-full bg-gray-100"></div>
    </div>
  );
}

export default MessagePage;
