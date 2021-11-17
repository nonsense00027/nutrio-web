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
} from "antd";
import { EditFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const options = [
  { label: "Normal/Mild", value: "Normal/Mild" },
  { label: "Moderate", value: "Moderate" },
  { label: "Severe", value: "Severe" },
];
function SubjectiveData() {
  const [editing, setEditing] = useState(false);
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <section>
      <div className="flex items-center justify-between">
        {/* <h1 className="font-bold text-lg mb-2">Subjective Data</h1> */}
        <div></div>
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
      <div className="space-y-2">
        <Row gutter={10}>
          <Col span={1}>
            <Checkbox />
          </Col>
          <Col>
            <p>{`Is BMI <18.5 or >23; >25; >30?`}</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={1}>
            <Checkbox />
          </Col>
          <Col>
            <p>Has the patient reduced weight within last three (3) months?</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={1}>
            <Checkbox />
          </Col>
          <Col>
            <p>Did the patient reduced dietary intake in the last week?</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={1}>
            <Checkbox />
          </Col>
          <Col>
            <p>Is the patient severly ill? (e.g. ICU)</p>
          </Col>
        </Row>
      </div>
      <Divider />

      {/* ASSESSMENT */}
      <div className="space-y-3">
        <Row gutter={10}>
          <Col span={4}>
            <Select defaultValue="" style={{ width: "100%" }}>
              <Option value="">Select category</Option>

              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <p>Weight Loss</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={4}>
            <Select defaultValue="" style={{ width: "100%" }}>
              <Option value="">Select category</Option>

              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <p>Food Intake (last 1-2 mos)</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={4}>
            <Select defaultValue="" style={{ width: "100%" }}>
              <Option value="">Select category</Option>

              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <p>{`Gastro Sympt (>2 weeks)`}</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={4}>
            <Select defaultValue="" style={{ width: "100%" }}>
              <Option value="">Select category</Option>

              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <p>Functional Capacity</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={4}>
            <Select defaultValue="" style={{ width: "100%" }}>
              <Option value="">Select category</Option>

              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <p>Disease & relation to metabolic requirements</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={4}>
            <Select defaultValue="" style={{ width: "100%" }}>
              <Option value="">Select category</Option>

              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <p>Edema / Ascites</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={4}>
            <Select defaultValue="" style={{ width: "100%" }}>
              <Option value="">Select category</Option>

              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <p>SGA Grade</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={4}>
            <Select defaultValue="" style={{ width: "100%" }}>
              <Option value="">Select category</Option>

              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <p>Body Mass Index</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={4}>
            <Select defaultValue="" style={{ width: "100%" }}>
              <Option value="">Select category</Option>

              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <p>Albumin (g/dl)</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={4}>
            <Select defaultValue="" style={{ width: "100%" }}>
              <Option value="">Select category</Option>

              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <p>TLC</p>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default SubjectiveData;
