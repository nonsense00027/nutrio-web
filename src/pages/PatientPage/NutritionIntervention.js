import React, { useState } from "react";
import { Row, Col, Button, Checkbox, Select } from "antd";
import { EditFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  nutritionDiagnosisCategory,
  nutritionInterventionCategory,
} from "../../shared/data/constants";

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
  const [nutritionIntervention, setNutritionIntervention] = useState(
    patient.nutritionIntervention || ""
  );
  const [editing, setEditing] = useState(isModal);

  const updateInfo = () => {};
  const cancelEditing = () => {};
  const next = () => {
    handleNext({
      nutritionDiagnosis,
      nutritionIntervention,
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
      <Row>
        <Col>
          <h1>Nutrition Diagnosis</h1>
          {nutritionDiagnosisCategory.map((category) => (
            <Row gutter={10} key={category.value}>
              <Col>
                <Checkbox
                  disabled={!editing}
                  checked={nutritionDiagnosis === category.value}
                  onChange={() => setNutritionDiagnosis(category.value)}
                />
              </Col>
              <Col>
                <p>{category.label}</p>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Nutrition Intervention Plan</h1>
          {nutritionInterventionCategory.map((category) => (
            <Row gutter={10} key={category.value}>
              <Col>
                <Checkbox
                  disabled={!editing}
                  checked={nutritionIntervention === category.value}
                  onChange={() => setNutritionIntervention(category.value)}
                />
              </Col>
              <Col>
                <p>{category.label}</p>
              </Col>
            </Row>
          ))}
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
