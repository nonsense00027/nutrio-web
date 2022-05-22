import React, { useEffect, useState } from "react";
import PatientSidebar from "../../components/PatientSidebar";
import Profile from "./Profile";
import { Divider, Spin, Tooltip, Modal, Steps, Select } from "antd";
import ObjectiveData from "./ObjectiveData";
import SubjectiveData from "./SubjectiveData";
import { useParams } from "react-router-dom";
import {
  onSnapshot,
  doc,
  db,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "../../shared/configs/firebase";
import { collectIdsAndDocs } from "../../shared/utilities";
import { Collapse } from "antd";
import NutritionIntervention from "./NutritionIntervention";
import DietaryCardix from "./DietaryCardix";
import { StopOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import Notification from "../../components/Notification";

const { Panel } = Collapse;
const { Step } = Steps;
const { Option } = Select;

const getContent = (
  currentData,
  current,
  patient,
  patientId,
  isModal,
  handleNext,
  handlePrev,
  saveData
) => {
  switch (current) {
    case 0:
      return (
        <ObjectiveData
          patient={patient}
          patientId={patientId}
          isModal={isModal}
          handleNext={handleNext}
        />
      );
    case 1:
      return (
        <SubjectiveData
          patient={patient}
          patientId={patientId}
          isModal={isModal}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      );
    case 2:
      return (
        <NutritionIntervention
          patient={patient}
          patientId={patientId}
          isModal={isModal}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      );
    case 3:
      return (
        <DietaryCardix
          currentData={currentData}
          patient={patient}
          patientId={patientId}
          isModal={isModal}
          handleNext={handleNext}
          handlePrev={handlePrev}
          saveData={saveData}
        />
      );
    default:
      return;
  }
};
function PatientPage() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [newData, setNewData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(
    () =>
      onSnapshot(doc(db, "profile", patientId), (doc) => {
        setPatient(collectIdsAndDocs(doc));
      }),

    [patientId]
  );
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "profile", patientId, "records"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          const result = snapshot.docs.map((doc) => collectIdsAndDocs(doc));
          setRecords(result);
          if (result.length > 0) setSelectedDate(result[0].id);
        }
      ),

    [patientId]
  );

  const getPatientData = () => {
    if (selectedDate.length === 0) return;
    return records.filter((record) => record.id === selectedDate)[0];
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onCollapse = () => {};

  const handleNext = (data) => {
    setNewData({ ...newData, ...data });
    setCurrent((prevCurrent) => prevCurrent + 1);
  };

  const handlePrev = () => {
    setCurrent((prevCurrent) => prevCurrent - 1);
  };

  const saveData = (data) => {
    addDoc(collection(db, "profile", patientId, "records"), {
      ...newData,
      ...data,
      timestamp: serverTimestamp(),
    }).then((res) => {
      console.log("success saving new data");
      setVisible(false);
      setNewData({});
      setCurrent(0);
    });
  };

  // console.log("SELECTED DATE: ", getPatientData());

  return (
    <div className="pl-32 py-10 pr-96 bg-gray-50 min-h-screen">
      <div className="pr-9">
        <PatientSidebar />
        <Notification />
        {patient ? (
          <div>
            <Profile patient={patient} patientId={patientId} />
            <Divider />
            {records.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h1 className="font-bold text-lg mb-2 font-primary">
                    Patient Assessments
                  </h1>

                  <div className="w-96">
                    <Select
                      defaultValue=""
                      value={selectedDate}
                      style={{ width: "100%" }}
                      onChange={(value) => setSelectedDate(value)}
                    >
                      {/* <Option value="">Select date</Option> */}

                      {records.map((record) => (
                        <Option key={record.id} value={record.id}>
                          {moment(new Date(record?.timestamp?.toDate())).format(
                            "MMMM D, YYYY"
                          )}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
                {getPatientData() && (
                  <Collapse onChange={onCollapse} defaultActiveKey={1}>
                    <Panel header="Objective Data" key="1">
                      <ObjectiveData
                        patient={getPatientData()}
                        patientId={patientId}
                      />
                    </Panel>
                    <Panel header="Subjective Data" key="2">
                      <SubjectiveData
                        patient={getPatientData()}
                        patientId={patientId}
                      />
                    </Panel>
                    <Panel header="Assessment and Plan" key="3">
                      <NutritionIntervention
                        patient={getPatientData()}
                        patientId={patientId}
                      />
                    </Panel>
                    <Panel header="Nutrition Intervention" key="4">
                      <DietaryCardix
                        patient={getPatientData()}
                        patientId={patientId}
                      />
                    </Panel>
                  </Collapse>
                )}
              </div>
            ) : (
              <div className="mt-20 opacity-50 flex items-center justify-center">
                <StopOutlined className="mr-2" />
                <p>No record for this patient yet.</p>
              </div>
            )}

            <Tooltip title="Add record">
              <div className="w-16 h-16 fixed bottom-10 right-10 ">
                <div className="bg-primary w-full h-full absolute top-0 left-0 rounded-full animate-ping bg-opacity-30"></div>
                <button
                  className="bg-primary rounded-full flex items-center justify-center text-white w-full h-full text-2xl shadow-md hover:opacity-90 transform transition-all duration-200 active:scale-90"
                  onClick={() => setVisible(true)}
                >
                  <PlusOutlined />
                </button>
              </div>
            </Tooltip>
          </div>
        ) : (
          <div className="w-full h-full grid place-items-center">
            <Spin size="large" />
          </div>
        )}

        <Modal
          title="Patient Assessment"
          visible={visible}
          onOk={saveData}
          onCancel={handleCancel}
          okText="Save"
          width={"80vw"}
          footer={null}
          bodyStyle={{ height: 500, overflow: "scroll" }}
        >
          {/* <Collapse onChange={onCollapse} defaultActiveKey={["1"]}>
          <Panel header="Objective Data" key="1">
            <ObjectiveData
              patient={patient}
              patientId={patientId}
              isModal={true}
            />
          </Panel>
          <Panel header="Subjective Data" key="2" isModal={true}>
            <SubjectiveData />
          </Panel>
          <Panel header="Nutrition Intervention" key="3" isModal={true}>
            <NutritionIntervention />
          </Panel>
          <Panel header="Dietary Cardix" key="4" isModal={true}>
            <DietaryCardix />
          </Panel>
        </Collapse> */}
          <div style={{ width: "80%", margin: "auto auto" }}>
            <Steps size="small" current={current}>
              <Step title="Objective Data" />
              <Step title="Subjective Data" />
              <Step title="Assessment and Plan" />
              <Step title="Nutrition Intervention" />
            </Steps>
          </div>

          <div className="mt-12">
            {getContent(
              newData,
              current,
              patient,
              patientId,
              true,
              handleNext,
              handlePrev,
              saveData
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default PatientPage;
