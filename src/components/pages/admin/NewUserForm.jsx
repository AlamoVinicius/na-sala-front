import React, { useState } from "react";
import { createUser } from "../../../services/api";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import { InputEffect } from "../../inputs/Inputs";
import { FormButton } from "../../buttons/Buttons";
import Alert from "../../layout/Alert";
import ModalCustom from "../../modal/ModalCustom";
import { BackdropLoading } from "../../feedbacks/LoadingBackDrop";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../contexts/auth";

const NewUserForm = ({ handleFinishREgisterUser }) => {
  const [userName, seUsername] = useState();
  const [pass, setPass] = useState();
  const [confirmedPass, setConfirmedPass] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [nivelUser, setNivelUser] = useState(null);
  const [textNivelUser, setTextNivelUser] = useState("Nivel de usuário");
  const [showModal, setShowModal] = useState(false);
  const [loadingRegisterUser, setLoadingRegisterUser] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pass !== confirmedPass) {
      return setErrorMsg("Senhas não conferem");
    }
    if (nivelUser === null) {
      return setErrorMsg("selecione o nível de usuário");
    }
    if (email === "") {
      return setErrorMsg("Preencha o email");
    }
    if (!email.includes("@")) {
      return setErrorMsg("Email inválido");
    }
    const newUser = {
      username: userName,
      password: pass,
      nivelUser: nivelUser,
      studioId: user.studioId,
      email: email,
    };

    try {
      setLoadingRegisterUser(true);
      await createUser(newUser, user.studioId);
      toast.success("Usuário cadastrado com sucesso!");
      handleFinishREgisterUser();
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Erro ao tentar cadastrar novo usuário");
    } finally {
      setLoadingRegisterUser(false);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col>
            <InputEffect
              type="text"
              textLabel="Nome de usuário"
              name="username"
              handleOnChange={(e) => seUsername(e.target.value)}
            />
            <InputEffect type="email" textLabel="Email" name="email" handleOnChange={(e) => setEmail(e.target.value)} />
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
      {loadingRegisterUser && <BackdropLoading />}
    </form>
  );
};

export default NewUserForm;
