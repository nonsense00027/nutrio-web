import React, { useEffect, useState } from "react";
import { Row, Col, Input, Button, DatePicker, Checkbox, Select } from "antd";
import {
  EditFilled,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { db, doc, setDoc } from "../../shared/configs/firebase";

const { Option } = Select;

function NutritionIntervention() {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [dates, setDates] = useState([]);

  const updateInfo = () => {};
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-96">
          <Select defaultValue="" style={{ width: "100%" }}>
            <Option value="">Select date</Option>

            {dates.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
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
              onClick={() => updateInfo()}
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
      {dates.length > 0 || adding ? (
        <Row gutter={30}>
          <Col span={10}>
            <h3>Nutrition Diagnosis:</h3>
            <Input.TextArea
              disabled={!editing && !adding}
              autoSize={{ minRows: 6, maxRows: 10 }}
              //   value={medication}
              //   onChange={(e) => setMedication(e.target.value)}
            />
          </Col>
          <Col span={14}>
            <h3>Nutrition Plan</h3>
            <Row gutter={20}>
              {/* CHECKBOX */}
              <Col span={10}>
                <Row gutter={10}>
                  <Col>
                    <Checkbox />
                  </Col>
                  <Col>
                    <p>Shift diet</p>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col>
                    <Checkbox />
                  </Col>
                  <Col>
                    <p>Nutrition Education</p>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col>
                    <Checkbox />
                  </Col>
                  <Col>
                    <p>Request of Laboratory Data</p>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col>
                    <Checkbox />
                  </Col>
                  <Col>
                    <p>Supplementary Feeding</p>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col>
                    <Checkbox />
                  </Col>
                  <Col>
                    <p>Other</p>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col>
                    <Checkbox />
                  </Col>
                  <Col>
                    <p>Monitor Caloric Intake</p>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col>
                    <Checkbox />
                  </Col>
                  <Col>
                    <p>Nutritional Requirements</p>
                  </Col>
                </Row>
              </Col>
              {/* CALORIES, CHO, CHON, FAT */}
              <Col>
                <Row>
                  <p>Calories:</p>
                  <Input
                    disabled={!editing}
                    // value={address}
                    // onChange={(e) => setAddress(e.target.value)}
                  />
                </Row>
                <Row>
                  <p>CHO(g):</p>
                  <Input
                    disabled={!editing}
                    // value={address}
                    // onChange={(e) => setAddress(e.target.value)}
                  />
                </Row>
                <Row>
                  <p>CHON(g):</p>
                  <Input
                    disabled={!editing}
                    // value={address}
                    // onChange={(e) => setAddress(e.target.value)}
                  />
                </Row>
                <Row>
                  <p>Fat(g):</p>
                  <Input
                    disabled={!editing}
                    // value={address}
                    // onChange={(e) => setAddress(e.target.value)}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <div className="h-32 grid place-items-center">
          <div className="opacity-50 flex items-center justify-center">
            <StopOutlined className="mr-2" />
            <p>No record for this patient yet.</p>
          </div>
          <button
            className="bg-primary rounded-sm flex items-center px-4 py-2 text-white transform transition-all duration-200 active:scale-90"
            onClick={() => setAdding(true)}
          >
            <PlusOutlined className="mr-2" />
            <p>Add record</p>
          </button>
        </div>
      )}
    </section>
  );
}

export default NutritionIntervention;
