import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../../services/api";

import { Table, Button, Spinner } from "react-bootstrap";
import ModalCustom from "../../modal/ModalCustom";
import Alert from "../../layout/Alert";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [userdelete, setDeleteUser] = useState("");
  const [isloading, setIsloading] = useState();

  useEffect(() => {
    setIsloading(true);
    const FetchMyapi = async () => {
      try {
        const users = await getUsers();
        setUsers(users.data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
        setErrorMsg("erro ao carregar os usuários");
        setIsloading(false);
      }
    };
    FetchMyapi();
  }, []);

  const handleDelete = async (user) => {
    try {
      const id = user._id;
      await deleteUser(id);
      setShowModal(false);
      document.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isloading ? (
        <div style={{ justifyContent: "center", textAlign: "center" }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {users.length !== 0 ? (
            <Table striped bordered hover style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>Tatuador</th>
                  <th>Nivel Acesso</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.nivelUser === 1 ? "Administrador" : "Usuário"}</td>
                      <td>
                        <Button
                          variant="dark"
                          onClick={() => {
                            setDeleteUser(user);
                            setShowModal(true);
                            console.log(user);
                          }}
                        >
                          deletar
                        </Button>
                        <ModalCustom
                          showModal={showModal}
                          setShowModal={setShowModal}
                          title="Excluir um usuário"
                          textBody={`Tem certeza que deseja excluir o usuário ${userdelete.username}`}
                          handleConfirmClick={() => {
                            handleDelete(userdelete);
                            console.log(userdelete);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Alert msg={errorMsg} severity="error" />
          )}
        </div>
      )}
    </>
  );
};

export default UsersAdmin;
