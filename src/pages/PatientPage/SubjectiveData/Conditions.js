import React from "react";
import { Row, Col, Checkbox } from "antd";
    
function Conditions({ conditionsToNote, handleChange, editing }) {
  return (
    <>
      <Row>
        <Col span={8}>
          <Row gutter={10}>
            <Col>
              <Checkbox onChange={handleChange} />
            </Col>
            <Col>
              <p>Pre-dialysis</p>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col>
              <Checkbox onChange={handleChange} />
            </Col>
            <Col>
              <p>Hemodialysis</p>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col>
              <Checkbox onChange={handleChange} />
            </Col>
            <Col>
              <p>Peritoneal Dialysis</p>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col>
              <Checkbox onChange={handleChange} />
            </Col>
            <Col>
              <p>Kidney Transplant</p>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col>
              <Checkbox onChange={handleChange} />
            </Col>
            <Col>
              <p>Hypertension</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Conditions;
