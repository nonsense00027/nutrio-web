import React, { useEffect, useState } from "react";
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
const vegtableVal = {
  cho: 3,
  chon: 1,
  fat: null,
  cal: 16,
};
const fruitVal = {
  cho: 10,
  chon: null,
  fat: null,
  cal: 40,
};
const milkVal = {
  cho: 12,
  chon: 8,
  fat: 10,
  cal: 170,
};
const riceAVal = {
  cho: 23,
  chon: null,
  fat: null,
  cal: 92,
};
const riceBVal = {
  cho: 23,
  chon: 2,
  fat: null,
  cal: 100,
};
const riceCVal = {
  cho: 23,
  chon: 4,
  fat: null,
  cal: 108,
};
const meatLVal = {
  cho: null,
  chon: 8,
  fat: 1,
  cal: 41,
};
const meatMVal = {
  cho: null,
  chon: 8,
  fat: 6,
  cal: 86,
};
const meatHVal = {
  cho: null,
  chon: 8,
  fat: 10,
  cal: 122,
};
const fatVal = {
  cho: null,
  chon: null,
  fat: 5,
  cal: 45,
};
const sugarVal = {
  cho: 5,
  chon: null,
  fat: null,
  cal: 20,
};

function DietaryCardix({
  currentData,
  patient,
  patientId,
  isModal = false,
  handleNext,
  handlePrev,
  saveData,
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
          // onChange={(e) => handleChange(e.target.value, index, "hhm")}
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
          // onChange={(e) => handleChange(e.target.value, index, "cho")}
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
          // onChange={(e) => handleChange(e.target.value, index, "chon")}
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
          // onChange={(e) => handleChange(e.target.value, index, "fat")}
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
          // onChange={(e) => handleChange(e.target.value, index, "cal")}
        />
      ),
    },
    {
      title: "Breakfast",
      dataIndex: "breakfast",
      key: "breakfast",
      render: (text, record, index) => (
        <input
          disabled={!editing}
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
          disabled={!editing}
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
          disabled={!editing}
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
          disabled={!editing}
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
          disabled={!editing}
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
          disabled={!editing}
          type="text"
          className="outline-none bg-transparent w-12"
          value={text}
          onChange={(e) => handleChange(e.target.value, index, "snacksMn")}
        />
      ),
    },
  ];
  const [data, setData] = useState(
    patient.cardix || [
      { foodItem: "Vegetable" },
      { foodItem: "Fruits" },
      { foodItem: "Milk" },
      { foodItem: "Rice (L)" },
      { foodItem: "Rice (M)" },
      { foodItem: "Rice (H)" },
      { foodItem: "Meat (L)" },
      { foodItem: "Meat (M)" },
      { foodItem: "Meat (H)" },
      { foodItem: "Fat" },
      { foodItem: "Sugar" },
    ]
  );
  const [ter, setTer] = useState(currentData?.ter || patient?.ter || 0);
  const [editing, setEditing] = useState(isModal);

  useEffect(() => {
    if (patient && isModal === false) {
      setTer(patient.ter);
      setData(patient.cardix);
    }
  }, [patient]);
  const getFormula = (foodItem) => {
    switch (foodItem) {
      case "Vegetable":
        return vegtableVal;
      case "Fruits":
        return fruitVal;
      case "Milk":
        return milkVal;
      case "Rice (L)":
        return riceAVal;
      case "Rice (M)":
        return riceBVal;
      case "Rice (H)":
        return riceCVal;
      case "Meat (L)":
        return meatLVal;
      case "Meat (M)":
        return meatMVal;
      case "Meat (H)":
        return meatHVal;
      case "Fat":
        return fatVal;
      case "Sugar":
        return sugarVal;
      default:
        return null;
    }
  };
  const calculate = (type, foodItem, value) => {
    var formula = getFormula(foodItem);
    if (formula[type]) {
      return formula[type] * value;
    }
    return "";
  };

  const calculateHhm = (foodItem, exchanges) => {
    var result = foodItem.split(" ")[0].toLowerCase();

    switch (result) {
      case "vegetable":
        return `${exchanges * 0.5} cup/s`;
      case "fruits":
        return `${exchanges * 1} slice/s`;
      case "milk":
        return `${exchanges * 3} tbsp`;
      case "rice":
        return `${exchanges * 0.5} cup/s`;
      case "meat":
        return `${exchanges * 1} mbs`;
      case "fat":
        return `${exchanges * 1} tsp`;
      case "sugar":
        return `${exchanges * 1} tsp`;
      default:
        return;
    }
  };

  const handleChange = (value, index, key) => {
    const newData = [...data];
    newData[index][key] = value;
    if (key === "exchanges") {
      newData[index].cho = calculate("cho", newData[index].foodItem, value);
      newData[index].chon = calculate("chon", newData[index].foodItem, value);
      newData[index].fat = calculate("fat", newData[index].foodItem, value);
      newData[index].cal = calculate("cal", newData[index].foodItem, value);
      newData[index].hhm = calculateHhm(newData[index].foodItem, value);
    }
    setData(newData);
  };

  const next = () => {
    saveData({ cardix: data });
  };

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
      <Row gutter={10}>
        <Col>
          <h2>Total Energy Requirement</h2>
          <Input type="text" value={`${ter} kcal`} />
        </Col>
        <Col>
          <h2>Cho</h2>
          <Input type="text" value={`${parseInt((ter * 0.4) / 4)} gm`} />
        </Col>
        <Col>
          <h2>Chon</h2>
          <Input type="text" value={`${parseInt((ter * 0.4) / 3)} gm`} />
        </Col>
        <Col>
          <h2>Fat</h2>
          <Input type="text" value={`${parseInt((ter * 0.3) / 9)} gm`} />
        </Col>
      </Row>
      <div className="space-y-2 mt-4">
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
