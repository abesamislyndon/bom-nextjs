import React, { useState } from "react";
import AuthService from '../services/auth.service';
import { useForm , Controller} from "react-hook-form";
//import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import {
    Button, Col, Container, Form, InputGroup, Row, 
  } from 'react-bootstrap'
  import Link from 'next/link'

export default function login(){
  
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    isLoading: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const { username, password, error } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ shouldFocusError: false });

  const navigate = useRouter();
  const handleLogin = async () => {
    setValues({ ...values, error: false, isLoading: true });
    try {
      await AuthService.login(username, password).then(
        () => {
          navigate.push("/dashboard");
          //window.location.reload();
        },
        (error) => {
          setValues({ ...values, error: "Invalid Username/password" });
        }
      );
    } catch (error) {
      setValues({ ...values, isLoading: false });
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

    return(
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
        <Container>
          <Row className="justify-content-center align-items-center px-3">
            <Col lg={8}>
              <Row>
                <Col md={7} className="bg-white border p-5">
                  <div className="">
                    <h1>Login</h1>
                    <p className="text-black-50">Sign In to your account</p>
  
                    <form onSubmit={handleSubmit(handleLogin)}>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          <FontAwesomeIcon
                            icon={faUser}
                            fixedWidth
                          />
                        </InputGroup.Text>
               


                        <Form.Control
                           placeholder="username"
                           {...register("username", { required: "username required" })}
                           onChange={handleChange("username")}
                        />
                      </InputGroup>
  
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          <FontAwesomeIcon
                            icon={faLock}
                            fixedWidth
                          />
                        </InputGroup.Text>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            {...register("password", { required: "password required" })}
                            onChange={handleChange("password")}
                        />
                      </InputGroup>
  
                      <Row>
                        <Col xs={6}>
                          <Button className="px-4" variant="primary" type="submit" >Login</Button>
                        </Col>
                        <Col xs={6} className="text-end">
                        </Col>
                      </Row>
                    </form>
                  </div>
                </Col>
                <Col
                  md={5}
                  className="bg-primary text-white d-flex align-items-center justify-content-center p-5"
                >
                  <div className="text-center">
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link href="/register">
                      <button className="btn btn-lg btn-outline-light mt-3" type="button">
                        Register Now!
                      </button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
}