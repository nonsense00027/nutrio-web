import React, { useEffect, useState } from "react";
import PatientSidebar from "../../components/PatientSidebar";
import { Tabs } from "antd";
import Gallery from "./Gallery";
import { useAuthContext } from "../../contexts/AuthContext";
import { db, onSnapshot, doc } from "../../shared/configs/firebase";
import { useParams } from "react-router-dom";
import { collectIdsAndDocs } from "../../shared/utilities";
const { TabPane } = Tabs;

function MediaPage() {
  const { user } = useAuthContext();
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(
    () =>
      onSnapshot(doc(db, "profile", patientId), (doc) => {
        setPatient(collectIdsAndDocs(doc));
      }),

    [patientId]
  );

  function callback(key) {
    console.log(key);
  }

  const getLabResults = () => {
    if (!patient.labResult) return [];
    return patient.labResult.sort((a, b) => b.timestamp - a.timestamp);
  };

  const getMeals = () => {
    if (!patient.meals) return [];
  };

  return (
    <div className="h-screen overflow-scroll flex" style={{ paddingLeft: 256 }}>
      <PatientSidebar />
      <Tabs defaultActiveKey="1" onChange={callback} type="card">
        <TabPane tab="Lab Results" key="1">
          {patient && <Gallery images={getLabResults()} />}
        </TabPane>
        <TabPane tab="Meals" key="2">
          {patient && <Gallery images={getMeals()} />}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default MediaPage;
