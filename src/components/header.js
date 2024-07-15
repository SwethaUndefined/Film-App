import React from "react";
import { Row, Col, Typography } from "antd";
import "./header.css";

const Header = ({ pageTitle }) => {


  return (
    <section>
      <Row>
        <Col span={24} className="Header">
          <img
            className="logo"
            src="https://cdn.upgrad.com/uploads/production/286e1f11-1897-4d0c-ab0f-6b2bfc1ce642/logo.svg"
            alt="Image not available"
          />
        </Col>
        <Col span={24}>
          <Typography className="heading">{pageTitle}</Typography>
        </Col>
      </Row>
    </section>
  );
};

export default Header;
