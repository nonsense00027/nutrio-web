import React, { useEffect, useState } from "react";
import PatientSidebar from "../../components/PatientSidebar";
import Profile from "./Profile";
import { Divider, Spin } from "antd";
import ObjectiveData from "./ObjectiveData";
import SubjectiveData from "./SubjectiveData";
import { useParams } from "react-router-dom";
import { onSnapshot, doc, db } from "../../shared/configs/firebase";
import { collectIdsAndDocs } from "../../shared/utilities";
import { Collapse } from "antd";
import NutritionIntervention from "./NutritionIntervention";
import DietaryCardix from "./DietaryCardix";

const { Panel } = Collapse;

function PatientPage() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  console.log("patient ", patient);
  useEffect(
    () =>
      onSnapshot(doc(db, "profile", patientId), (doc) => {
        setPatient(collectIdsAndDocs(doc));
      }),

    []
  );

  const onCollapse = () => {
    console.log("change");
  };
  return (
    <div
      className="py-10 min-h-screen pb-10"
      style={{ paddingLeft: 276, paddingRight: 20 }}
    >
      <PatientSidebar />
      {patient ? (
        <div>
          <Profile patient={patient} patientId={patientId} />
          <Divider />
          <Collapse onChange={onCollapse}>
            <Panel header="Objective Data" key="1">
              <ObjectiveData patient={patient} patientId={patientId} />
            </Panel>
            <Panel header="Subjective Data" key="2">
              <SubjectiveData />
            </Panel>
            <Panel header="Nutrition Intervention" key="3">
              <NutritionIntervention />
            </Panel>
            <Panel header="Dietary Cardix" key="4">
              <DietaryCardix />
            </Panel>
          </Collapse>
        </div>
      ) : (
        <div className="w-full h-full grid place-items-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}

export default PatientPage;
