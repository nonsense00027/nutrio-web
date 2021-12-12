import React, { useState } from "react";
import { Row, Col, Button, Checkbox } from "antd";
import { EditFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  ageCategory,
  conditionsCategory,
  nutritionHistoryCategory,
} from "../../shared/data/constants";

function SubjectiveData({
  patient,
  patientId,
  isModal,
  handleNext,
  handlePrev,
}) {
  const [ageGroup, setAgeGroup] = useState(patient.ageGroup || "");
  const [conditionsToNote, setConditionsToNote] = useState(
    patient.conditionsToNote || []
  );
  const [nutritionHistory, setNutritionHistory] = useState(
    patient.nutritionHistory || []
  );
  const [editing, setEditing] = useState(isModal);

  const handleConditionsChange = (value) => {
    var newNote;
    if (conditionsToNote.includes(value)) {
      newNote = conditionsToNote.filter((condition) => condition !== value);
    } else {
      newNote = [...conditionsToNote, value];
    }
    setConditionsToNote(newNote);
  };

  const handleNutritionChange = (value) => {
    var newNote;
    if (nutritionHistory.includes(value)) {
      newNote = nutritionHistory.filter((condition) => condition !== value);
    } else {
      newNote = [...nutritionHistory, value];
    }
    setNutritionHistory(newNote);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const next = () => {
    handleNext({
      ageGroup,
      conditionsToNote,
      nutritionHistory,
    });
  };
  return (
    <section>
      <div className="flex items-center justify-between">
        {/* <h1 className="font-bold text-lg mb-2">Subjective Data</h1> */}
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
      <div className="flex gap-20">
        <div>
          <Row>
            <Col>
              <h1>Age group</h1>
              {ageCategory.map((category) => (
                <Row gutter={10} key={category.value}>
                  <Col>
                    <Checkbox
                      disabled={!editing}
                      checked={ageGroup === category.value}
                      onChange={() => setAgeGroup(category.value)}
                    />
                  </Col>
                  <Col>
                    <p>{category.label}</p>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>

          <h1 className="mt-2">Conditions to note</h1>
          <Row>
            <Col>
              {conditionsCategory.map((condition) => (
                <Row gutter={10} key={condition.value}>
                  <Col>
                    <Checkbox
                      disabled={!editing}
                      checked={conditionsToNote.includes(condition.value)}
                      onChange={() => handleConditionsChange(condition.value)}
                    />
                  </Col>
                  <Col>
                    <p>{condition.label}</p>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </div>

        {/* ASSESSMENT */}
        <div>
          <h1>Nutrition History</h1>
          {nutritionHistoryCategory.map((history) => (
            <Row gutter={10} key={history.value}>
              <Col>
                <Checkbox
                  disabled={!editing}
                  checked={nutritionHistory.includes(history.value)}
                  onChange={() => handleNutritionChange(history.value)}
                />
              </Col>
              <Col>
                <p>{history.label}</p>
              </Col>
            </Row>
          ))}
        </div>
      </div>

      {/* <div className="space-y-3">
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
      </div> */}
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

export default SubjectiveData;
