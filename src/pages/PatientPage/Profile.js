import React, { useEffect, useState } from "react";
import { Row, Col, Input, Button, DatePicker } from "antd";
import { EditFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { db, doc, setDoc } from "../../shared/configs/firebase";

function Profile({ patient, patientId }) {
  const [name, setName] = useState(patient.name || "");
  const [address, setAddress] = useState(patient.address || "");
  const [age, setAge] = useState(patient.age || "");
  const [occupation, setOccupation] = useState(patient.occupation || "");
  const [religion, setReligion] = useState(patient.religion || "");
  const [birthdate, setBirthdate] = useState(null);
  const [admissionDate, setAdmissionDate] = useState(null);
  const [physician, setPhysician] = useState(patient.physician || "");
  const [medicalDiagnosis, setMedicalDiagnosis] = useState(
    patient.medicalDiagnosis || ""
  );
  const [dietOrder, setDietOrder] = useState(patient.dietOrder || "");
  const [editing, setEditing] = useState(false);

  const updateInfo = () => {
    setDoc(
      doc(db, "profile", patientId),
      {
        name,
        address,
        age,
        occupation,
        religion,
        birthdate,
        admissionDate,
        physician,
        medicalDiagnosis,
        dietOrder,
      },
      { merge: true }
    ).then((res) => {
      console.log("success editing");
      setEditing(false);
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg mb-2">Patient Profile</h1>
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
      <Row gutter={10}>
        <Col span={12}>
          <h3>Full name:</h3>
          <Input
            disabled={!editing}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col span={12}>
          <h3>Address:</h3>
          <Input
            disabled={!editing}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={6}>
          <h3>Birthdate:</h3>
          <DatePicker
            disabled={!editing}
            style={{ width: "100%" }}
            value={birthdate}
            onChange={(date, dateString) => setBirthdate(date)}
          />
        </Col>
        <Col span={2}>
          <h3>Age:</h3>
          <Input
            disabled={!editing}
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <h3>Occupation:</h3>
          <Input
            disabled={!editing}
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <h3>Religion:</h3>
          <Input
            disabled={!editing}
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
          />
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={6}>
          <h3>Date of Admission:</h3>
          <DatePicker
            disabled={!editing}
            style={{ width: "100%" }}
            defaultValue={new Date()}
            value={admissionDate}
            onChange={(date, dateString) => setAdmissionDate(date)}
          />
        </Col>
        <Col span={6}>
          <h3>Physician:</h3>
          <Input
            disabled={!editing}
            value={physician}
            onChange={(e) => setPhysician(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <h3>Medical Diagnosis:</h3>
          <Input
            disabled={!editing}
            value={medicalDiagnosis}
            onChange={(e) => setMedicalDiagnosis(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <h3>Diet Order:</h3>
          <Input
            disabled={!editing}
            value={dietOrder}
            onChange={(e) => setDietOrder(e.target.value)}
          />
        </Col>
      </Row>
    </section>
  );
}

export default Profile;
