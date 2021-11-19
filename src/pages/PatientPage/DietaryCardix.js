import React, { useState } from "react";
import {
  Input,
  Row,
  Col,
  Button,
  Checkbox,
  Divider,
  Menu,
  Dropdown,
  Select,
  Table,
} from "antd";
import { EditFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const options = [
  { label: "Vegetable A", value: "Vegetable A" },
  { label: "Vegetable B", value: "Vegetable B" },
  { label: "Fruits", value: "Fruits" },
  { label: "Milk", value: "Milk" },
  { label: "Rice", value: "Rice" },
  { label: "Low Meat", value: "Low Meat" },
  { label: "Medium Meat", value: "Medium Meat" },
  { label: "High Meat", value: "High Meat" },
  { label: "Fat", value: "Fat" },
  { label: "Sugar", value: "Sugar" },
];

function DietaryCardix({
  patient,
  patientId,
  isModal,
  handleNext,
  handlePrev,
}) {
  const columns = [
    {
      title: "Food Item",
      dataIndex: "foodItem",
      key: "foodItem",
    },
    {
      title: "No. of Exchanges",
      dataIndex: "exchanges",
      key: "exchanges",
      editable: true,
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "exchanges")}
        />
      ),
    },
    {
      title: "HHM",
      dataIndex: "hhm",
      key: "hhm",
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "hhm")}
        />
      ),
    },
    {
      title: "CHO",
      dataIndex: "cho",
      key: "cho",
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "cho")}
        />
      ),
    },
    {
      title: "CHON",
      dataIndex: "chon",
      key: "chon",
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "chon")}
        />
      ),
    },
    {
      title: "FAT",
      dataIndex: "fat",
      key: "fat",
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "fat")}
        />
      ),
    },
    {
      title: "CAL",
      dataIndex: "cal",
      key: "cal",
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "cal")}
        />
      ),
    },
    {
      title: "Breakfast",
      dataIndex: "breakfast",
      key: "breakfast",
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "breakfast")}
        />
      ),
    },
    {
      title: "Lunch",
      dataIndex: "lunch",
      key: "lunch",
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "lunch")}
        />
      ),
    },
    {
      title: "Supper",
      dataIndex: "supper",
      key: "supper",
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "supper")}
        />
      ),
    },
    {
      title: "AM Snacks",
      dataIndex: "snacksAm",
      key: "snacksAm",
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "snacksAm")}
        />
      ),
    },
    {
      title: "PM Snacks",
      dataIndex: "snacksPm",
      key: "snacksPm",
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "snacksPm")}
        />
      ),
    },
    {
      title: "MN Snacks",
      dataIndex: "snacksMn",
      key: "snacksMn",
      render: (text, record, index) => (
        <input
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "snacksMn")}
        />
      ),
    },
  ];
  const [data, setData] = useState([
    { foodItem: "Veg. A" },
    { foodItem: "Veg. B" },
    { foodItem: "Fruits" },
    { foodItem: "Milk" },
    { foodItem: "Rice" },
    { foodItem: "Meat (L)" },
    { foodItem: "Meat (M)" },
    { foodItem: "Meat (H)" },
    { foodItem: "Fat" },
    { foodItem: "Sugar" },
  ]);
  const [editing, setEditing] = useState(false);

  const handleChange = (value, index, key) => {
    console.log("key: ", key);
    console.log("index: ", index);
    console.log("value: ", value);
    console.log("editing");
    const newData = [...data];
    newData[index][key] = value;
    setData(newData);
  };

  const next = () => {
    handleNext({
      data,
    });
  };

  console.log("dietary data is: ", data);

  return (
    <section>
      <div className="flex items-center justify-between">
        {/* <h1 className="font-bold text-lg mb-2">Subjective Data</h1> */}
        <div></div>
        {isModal === false && (
          <div>
            {editing ? (
              <div className="space-x-1">
                <Button
                  type="ghost"
                  icon={<CloseOutlined />}
                  onClick={() => setEditing((prevEditing) => !prevEditing)}
                ></Button>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => setEditing((prevEditing) => !prevEditing)}
                ></Button>
              </div>
            ) : (
              <div>
                <Button
                  type="primary"
                  icon={<EditFilled />}
                  onClick={() => setEditing((prevEditing) => !prevEditing)}
                ></Button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="space-y-2">
        {/* <div className="w-80">
          <Select defaultValue="" style={{ width: "100%" }}>
            <Option value="">Select category</Option>

            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div> */}

        <Table
          columns={columns}
          dataSource={data}
          size="small"
          bordered
          pagination={false}
        />
        {isModal && (
          <div className="py-4 float-right space-x-2">
            <Button onClick={handlePrev}>Previous</Button>
            <Button type="primary" onClick={() => next()}>
              Save
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default DietaryCardix;
