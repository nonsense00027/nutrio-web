import React, { useState } from "react";
import { Input, Select } from "antd";
import { Row, Col, Button } from "antd";
import { EditFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { db, doc, setDoc } from "../../shared/configs/firebase";
import { lifestyleCategory } from "../../shared/data/constants";

const { Option } = Select;

function ObjectiveData({ patient, patientId, isModal, handleNext }) {
  const [height, setHeight] = useState(patient.height || "");
  const [weight, setWeight] = useState(patient.weight || "");
  const [dbw, setDbw] = useState(patient.dbw || "");
  const [bmi, setBmi] = useState(patient.bmi || "");
  const [bmiCategory, setBmiCategory] = useState(patient.bmiCategory || "");
  const [lifestyle, setLifestyle] = useState(patient.lifestyle || "");
  const [others, setOthers] = useState(patient.others || "");
  const [medication, setMedication] = useState(patient.medication || "");
  const [editing, setEditing] = useState(isModal);

  const getDbw = () => {
    if (height.length > 0) {
      let ibw = height - 100;
      ibw = ibw * 0.9;
      return ibw.toFixed(2);
    }
    return;
  };

  const getBmi = () => {
    const heightF = height / 100;
    const bmi = weight / (heightF * heightF);
    return bmi.toFixed(2);
  };

  const getCategory = () => {
    const bmi = getBmi();
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi < 22.9) {
      return "Normal";
    } else if (bmi < 24.9) {
      return "Overweight";
    } else if (bmi >= 25) {
      return "Obese";
    }
  };

  const getTER = () => {
    if (!height || !weight || !lifestyle) return;
    return parseInt(getDbw() * lifestyle);
  };

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

  const updateInfo = () => {
    setDoc(
      doc(db, "profile", patientId),
      {
        height,
        weight,
        dbw: getDbw(),
        bmi: getBmi(),
        bmiCategory: getCategory(),
        ter: getTER(),
        lifestyle,
        others,
        medication,
      },
      { merge: true }
    ).then((res) => {
      console.log("success editing");
      setEditing(false);
    });
  };

  const next = () => {
    handleNext({
      height,
      weight,
      dbw: getDbw(),
      bmi: getBmi(),
      bmiCategory: getCategory(),
      ter: getTER(),
      lifestyle,
      others,
      medication,
    });
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        {/* <h1 className="font-bold text-lg mb-2">Objective Data</h1> */}
        <div></div>
        {!isModal && (
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
        )}
      </div>

      <div className="space-y-4">
        <Row gutter={10}>
          <Col span={3}>
            <h3>Height (cm):</h3>
            <Input
              disabled={!editing}
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Col>
          <Col span={3}>
            <h3>Weight (kg):</h3>
            <Input
              disabled={!editing}
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Col>
          <Col span={3}>
            <h3>DBW:</h3>
            <Input
              disabled={!editing}
              type="number"
              value={getDbw()}
              // onChange={(e) => setDbw(e.target.value)}
            />
          </Col>
          <Col span={3}>
            <h3>BMI:</h3>
            <Input
              disabled={!editing}
              type="number"
              value={getBmi()}
              // onChange={(e) => setBmi(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <h3>BMI Category:</h3>
            <Input
              disabled={!editing}
              value={getCategory()}
              // onChange={(e) => setBmiCategory(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <h3>Lifestyle</h3>
            <Select
              defaultValue=""
              disabled={!editing}
              style={{ width: "100%" }}
              value={lifestyle}
              onChange={(value) => setLifestyle(value)}
            >
              <Option value="">Select category</Option>

              {lifestyleCategory.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
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
        {isModal && (
          <div className="py-4 float-right">
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ObjectiveData;
