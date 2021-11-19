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

function NutritionIntervention({
  patient,
  patientId,
  isModal,
  handleNext,
  handlePrev,
}) {
  const [nutritionDiagnosis, setNutritionDiagnosis] = useState(
    patient.nutritionDiagnosis || ""
  );
  const [shiftDiet, setShiftDiet] = useState(patient.shiftDiet || false);
  const [nutritionEducation, setNutritionEducation] = useState(
    patient.nutritionEducation || false
  );
  const [requestLab, setRequestLab] = useState(patient.requestLab || false);
  const [supplementFeeding, setSupplementFeeding] = useState(
    patient.supplementFeeding || false
  );
  const [other, setOther] = useState(patient.other || false);
  const [monitorCalory, setMonitorCalory] = useState(
    patient.monitorCalory || false
  );
  const [nutritionRequirement, setNutritionRequirement] = useState(
    patient.nutritionRequirement || false
  );
  const [calories, setCalories] = useState(patient.calories || "");
  const [cho, setCho] = useState(patient.cho || "");
  const [chon, setChon] = useState(patient.calories || "");
  const [fat, setFat] = useState(patient.fat || "");
  const [editing, setEditing] = useState(isModal);
  const [adding, setAdding] = useState(false);
  const [dates, setDates] = useState([]);

  const updateInfo = () => {};
  const cancelEditing = () => {};
  const next = () => {
    handleNext({
      nutritionDiagnosis,
      shiftDiet,
      nutritionEducation,
      requestLab,
      supplementFeeding,
      other,
      monitorCalory,
      nutritionRequirement,
      calories,
      cho,
      chon,
      fat,
    });
  };
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        {/* <div className="w-96">
          <Select defaultValue="" style={{ width: "100%" }}>
            <Option value="">Select date</Option>

            {dates.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div> */}
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
      {/* {dates.length > 0 || adding ? ( */}
      <Row gutter={30}>
        <Col span={10}>
          <h3>Nutrition Diagnosis:</h3>
          <Input.TextArea
            disabled={editing === false}
            autoSize={{ minRows: 6, maxRows: 10 }}
            value={nutritionDiagnosis}
            onChange={(e) => setNutritionDiagnosis(e.target.value)}
          />
        </Col>
        <Col span={14}>
          <h3>Nutrition Plan</h3>
          <Row gutter={20}>
            {/* CHECKBOX */}
            <Col span={10}>
              <Row gutter={10}>
                <Col>
                  <Checkbox
                    checked={shiftDiet}
                    onChange={(e) => setShiftDiet(e.target.checked)}
                  />
                </Col>
                <Col>
                  <p>Shift diet</p>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col>
                  <Checkbox
                    checked={nutritionEducation}
                    onChange={(e) => setNutritionEducation(e.target.checked)}
                  />
                </Col>
                <Col>
                  <p>Nutrition Education</p>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col>
                  <Checkbox
                    checked={requestLab}
                    onChange={(e) => setRequestLab(e.target.checked)}
                  />
                </Col>
                <Col>
                  <p>Request of Laboratory Data</p>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col>
                  <Checkbox
                    checked={supplementFeeding}
                    onChange={(e) => setSupplementFeeding(e.target.checked)}
                  />
                </Col>
                <Col>
                  <p>Supplementary Feeding</p>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col>
                  <Checkbox
                    checked={other}
                    onChange={(e) => setOther(e.target.checked)}
                  />
                </Col>
                <Col>
                  <p>Other</p>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col>
                  <Checkbox
                    checked={monitorCalory}
                    onChange={(e) => setMonitorCalory(e.target.checked)}
                  />
                </Col>
                <Col>
                  <p>Monitor Caloric Intake</p>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col>
                  <Checkbox
                    checked={nutritionRequirement}
                    onChange={(e) => setNutritionRequirement(e.target.checked)}
                  />
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
                  disabled={editing === false}
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </Row>
              <Row>
                <p>CHO(g):</p>
                <Input
                  disabled={editing === false}
                  value={cho}
                  onChange={(e) => setCho(e.target.value)}
                />
              </Row>
              <Row>
                <p>CHON(g):</p>
                <Input
                  disabled={editing === false}
                  value={chon}
                  onChange={(e) => setChon(e.target.value)}
                />
              </Row>
              <Row>
                <p>Fat(g):</p>
                <Input
                  disabled={editing === false}
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* ) : (
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
        </div> */}
      {/* )} */}
      {isModal && (
        <div className="py-4 float-right space-x-2">
          <Button onClick={handlePrev}>Previous</Button>
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        </div>
      )}
    </section>
  );
}

export default NutritionIntervention;
