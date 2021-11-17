import React, { useState } from "react";
import { Input } from "antd";
import { Row, Col, Button } from "antd";
import { EditFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";

function ObjectiveData({ patient, patientId }) {
  const [height, setHeight] = useState(patient.height || "");
  const [weight, setWeight] = useState(patient.weight || "");
  const [dbw, setDbw] = useState(patient.dbw || "");
  const [bmi, setBmi] = useState(patient.bmi || "");
  const [bmiCategory, setBmiCategory] = useState(patient.bmiCategory || "");
  const [others, setOthers] = useState(patient.others || "");
  const [medication, setMedication] = useState(patient.medication || "");
  const [editing, setEditing] = useState(false);

  const cancelEditing = () => {
    setHeight(patient.height || "");
    setWeight(patient.weight || "");
    setDbw(patient.dbw || "");
    setBmi(patient.bmi || "");
    setBmiCategory(patient.bmiCategory || "");
    setOthers(patient.others || "");
    setMedication(patient.medication || "");
    setEditing(false);
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        {/* <h1 className="font-bold text-lg mb-2">Objective Data</h1> */}
        <div></div>
        {editing ? (
          <div className="space-x-1">
            <Button
              type="ghost"
              icon={<CloseOutlined />}
              onClick={() => cancelEditing()}
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

      <div className="space-y-4">
        <Row gutter={10}>
          <Col span={4}>
            <h3>Height (cm):</h3>
            <Input
              disabled={!editing}
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <h3>Weight (kg):</h3>
            <Input
              disabled={!editing}
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <h3>DBW:</h3>
            <Input
              disabled={!editing}
              type="number"
              value={dbw}
              onChange={(e) => setDbw(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <h3>BMI:</h3>
            <Input
              disabled={!editing}
              type="number"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
            />
          </Col>
          <Col span={8}>
            <h3>BMI Category:</h3>
            <Input
              disabled={!editing}
              value={bmiCategory}
              onChange={(e) => setBmiCategory(e.target.value)}
            />
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <h3>Others:</h3>
            <Input.TextArea
              disabled={!editing}
              value={others}
              onChange={(e) => setOthers(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <h3>Therapeutics / Medication:</h3>
            <Input.TextArea
              disabled={!editing}
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default ObjectiveData;
