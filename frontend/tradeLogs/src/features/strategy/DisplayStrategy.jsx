import React from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { useFetchUpdateStrategies } from "../../shared/hooks/useFetchUpdateStrategies";

const DisplayStrategy = () => {
  const { categories, categoriesLoading, categoriesError } = useFetchUpdateStrategies();
  return (
    <Container>
      <h4 className="mt-5">STARTEGIES</h4>
      {
        <div>
          {categoriesError?.message ? (
            <div className="d-flex justify-content-center align-items-center">
              <h3>{categoriesError.message}</h3>
            </div>
          ) : categoriesLoading ? (
            <div className="d-flex justify-content-center align-items-center">
              <h3>...Loading</h3>
            </div>
          ) : (
            <Row className="mt-3 mb-5 g-4 gx-4 gy-4">
              {categories.map((value) => (
                <Col key={value._id} xs={12} sm={6} md={4}>
                  <div className="d-flex flex-column align-items-center justify-content-center border-0 shadow-sm rounded-4 p-4 bg-white g-2 ">
                    <h4>{value.strategyName}</h4>
                    <div className="w-100 d-flex align-items-center justify-content-end gap-2">
                      <Dropdown align="end">
                        <Dropdown.Toggle variant="light" size="sm">
                          ⋮
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Open</Dropdown.Item>
                          <Dropdown.Item className="text-danger">
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </div>
      }
    </Container>
  );
};

export default DisplayStrategy;
