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
function SubjectiveData({
  patient,
  patientId,
  isModal,
  handleNext,
  handlePrev,
}) {
  const [bmiNotNormal, setBmiNotNormal] = useState(
    patient.bmiNotNormal || false
  );
  const [reducedWeight, setReducedWeight] = useState(
    patient.reducedWeight || false
  );
  const [reducedDietary, setReducedDietary] = useState(
    patient.reducedDietary || false
  );
  const [severlyIll, setSeverlyIll] = useState(patient.severlyIll || false);
  const [weightLoss, setWeightLoss] = useState(patient.weightLoss || "");
  const [foodIntake, setFoodIntake] = useState(patient.foodIntake || "");
  const [gastroSymptom, setGastroSymptom] = useState(
    patient.gastroSymptom || ""
  );
  const [functionalCapacity, setFunctionalCapacity] = useState(
    patient.functionalCapacity || ""
  );
  const [metabolicRequirement, setMetabolicRequirement] = useState(
    patient.metabolicRequirement || ""
  );
  const [edema, setEdema] = useState(patient.edema || "");
  const [sgaGrade, setSgaGrade] = useState(patient.sgaGrade || "");
  const [bodyMass, setBodyMass] = useState(patient.bodyMass || "");
  const [albumin, setAlbumin] = useState(patient.albumin || "");
  const [tlc, setTlc] = useState(patient.tlc || "");
  const [editing, setEditing] = useState(isModal);

  const cancelEditing = () => {};

  const next = () => {
    handleNext({
      bmiNotNormal,
      reducedWeight,
      reducedDietary,
      severlyIll,
      weightLoss,
      foodIntake,
      gastroSymptom,
      functionalCapacity,
      metabolicRequirement,
      edema,
      sgaGrade,
      bodyMass,
      albumin,
      tlc,
    });
  };
  console.log("weight loss is: ", weightLoss);
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
        )}
      </div>
      <div className="space-y-2">
        <Row gutter={10}>
          <Col span={1}>
            <Checkbox
              checked={bmiNotNormal}
              onChange={(e) => setBmiNotNormal(e.target.checked)}
            />
          </Col>
          <Col>
            <p>{`Is BMI <18.5 or >23; >25; >30?`}</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={1}>
            <Checkbox
              checked={reducedWeight}
              onChange={(e) => setReducedWeight(e.target.checked)}
            />
          </Col>
          <Col>
            <p>Has the patient reduced weight within last three (3) months?</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={1}>
            <Checkbox
              checked={reducedDietary}
              onChange={(e) => setReducedDietary(e.target.checked)}
            />
          </Col>
          <Col>
            <p>Did the patient reduced dietary intake in the last week?</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={1}>
            <Checkbox
              checked={severlyIll}
              onChange={(e) => setSeverlyIll(e.target.checked)}
            />
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
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              value={weightLoss}
              onChange={(value) => setWeightLoss(value)}
            >
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
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              value={foodIntake}
              onChange={(value) => setFoodIntake(value)}
            >
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
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              value={gastroSymptom}
              onChange={(value) => setGastroSymptom(value)}
            >
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
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              value={functionalCapacity}
              onChange={(value) => setFunctionalCapacity(value)}
            >
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
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              value={metabolicRequirement}
              onChange={(value) => setMetabolicRequirement(value)}
            >
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
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              value={edema}
              onChange={(value) => setEdema(value)}
            >
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
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              value={sgaGrade}
              onChange={(value) => setSgaGrade(value)}
            >
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
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              value={bodyMass}
              onChange={(value) => setBodyMass(value)}
            >
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
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              value={albumin}
              onChange={(value) => setAlbumin(value)}
            >
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
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              value={tlc}
              onChange={(value) => setTlc(value)}
            >
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
        {isModal && (
          <div className="py-4 float-right space-x-2">
            <Button onClick={handlePrev}>Previous</Button>
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default SubjectiveData;
