import React, { useState } from "react";
import { createUser } from "../../../services/api";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import { InputEffect } from "../../inputs/Inputs";
import { FormButton } from "../../buttons/Buttons";
import Alert from "../../layout/Alert";
import ModalCustom from "../../modal/ModalCustom";

const NewUserForm = () => {
  const [userName, seUsername] = useState();
  const [pass, setPass] = useState();
  const [confirmedPass, setConfirmedPass] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [nivelUser, setNivelUser] = useState(null);
  const [textNivelUser, setTextNivelUser] = useState("Nivel de usuário");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pass !== confirmedPass) {
      return setErrorMsg("Senhas não conferem");
    }
    if (nivelUser === null) {
      return setErrorMsg("selecione o nível de usuário");
    }
    const newUser = {
      username: userName,
      password: pass,
      nivelUser: nivelUser,
    };
    try {
      await createUser(newUser);
      setShowModal(true);
    } catch (err) {
      setErrorMsg("falha ao tentar cadastrar novo usuário, verifique os dados ou conexão");
    }
  };

  const handleConfirm = () => {
    setShowModal(false)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col>
            <InputEffect
              type="text"
              textLabel="Username"
              name="username"
              handleOnChange={(e) => seUsername(e.target.value)}
            />
            <DropdownButton id="dropdown-basic-button" title={textNivelUser} variant="secondary">
              <Dropdown.Item
                onClick={(e) => {
                  setNivelUser(1);
                  setTextNivelUser("Administrador");
                }}
              >
                Administrador
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  setNivelUser(0);
                  setTextNivelUser("Usuário");
                }}
              >
                Usuario
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <InputEffect
              type="password"
              textLabel="Senha"
              name="password"
              handleOnChange={(e) => setPass(e.target.value)}
            />
            <InputEffect
              type="password"
              textLabel="Confirma senha"
              name="Confirmpassword"
              handleOnChange={(e) => setConfirmedPass(e.target.value)}
            />
            {errorMsg && <Alert msg={errorMsg} severity="error" />}
          </Col>
        </Row>
        <Col sm={12} style={{ textAlign: "center" }}>
          <FormButton text="Cadastrar usuário" />
        </Col>
        <ModalCustom
          title="usuário criado com sucesso"
          setShowModal={setShowModal}
          showModal={showModal}
          handleConfirmClick={() => handleConfirm()}
        />
      </Container>
    </form>
  );
};

export default NewUserForm;
