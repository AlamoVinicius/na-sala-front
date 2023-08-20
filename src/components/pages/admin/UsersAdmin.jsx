import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, blockUser } from "../../../services/api";

import { Table, Button, Spinner, Stack } from "react-bootstrap";
import ModalCustom from "../../modal/ModalCustom";
import Alert from "../../layout/Alert";

import { HiUserRemove, HiOutlineXCircle, HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-toastify";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [showModalBlockUser, setModalBlockUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectUser, setSelectUser] = useState("");
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
  }, [selectUser]);

  const handleDelete = async (user) => {
    try {
      const id = user._id;
      await deleteUser(id);
      document.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setShowModalDeleteUser(false);
    }
  };

  const handleBlockUser = async ({ user, blocked }) => {
    try {
      const response = await blockUser({ userId: user._id, blocked });

      toast.success(response?.data?.message ?? "Usuário bloqueado com sucesso!");
      setSelectUser("");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao bloquear usuário");
    } finally {
      setModalBlockUser(false);
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
            <Table striped bordered size="sm" responsive hover style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>Tatuador</th>
                  <th>Nivel Acesso</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const { blocked } = user;

                  return (
                    <tr key={user._id}>
                      <td>
                        {user.username} {blocked && <span style={{ color: "red" }}>(bloqueado)</span>}
                      </td>
                      <td>{user.nivelUser === 1 ? "Admin" : "User"}</td>
                      <td>
                        <Stack className="d-flex flex-column gap-2 p-2" style={{ width: 150 }}>
                          <Button
                            size="sm"
                            variant={blocked ? "primary" : "outline-dark"}
                            className="d-flex align-items-center justify-content-center"
                            onClick={() => {
                              setSelectUser(user);
                              setModalBlockUser(true);
                            }}
                          >
                            {blocked ? " DESBLOQUEAR" : "BLOQUEAR"}
                            {blocked ? (
                              <HiOutlineCheckCircle size={18} style={{ marginLeft: 10 }} />
                            ) : (
                              <HiOutlineXCircle size={18} style={{ marginLeft: 10 }} />
                            )}
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            className="d-flex align-items-center justify-content-center"
                            onClick={() => {
                              setSelectUser(user);
                              setShowModalDeleteUser(true);
                            }}
                          >
                            EXCLUIR
                            <HiUserRemove size={16} style={{ marginLeft: 10 }} />
                          </Button>
                        </Stack>
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

      <ModalCustom
        showModal={showModalDeleteUser}
        setShowModal={setShowModalDeleteUser}
        title={`Excluir o usuário ${selectUser.username}`}
        textBody={`Tem certeza que deseja excluir o usuário 
          Após a exclusão o usuário será removido totalmente do sistema e para voltar a ser acessado será necessário criar um novo usuário.`}
        handleConfirmClick={() => {
          handleDelete(selectUser);
        }}
      />
      <ModalCustom
        showModal={showModalBlockUser}
        setShowModal={setModalBlockUser}
        title={`${selectUser.blocked ? "Desbloquear" : "Bloquear"} o usuário ${selectUser.username}`}
        textBody={
          selectUser.blocked
            ? "Ao desbloquear o usuário ele terá acesso ao sistema"
            : "Ao bloquear o usuário ele não terá mais acesso ao sistema até ser desbloqueado"
        }
        handleConfirmClick={() => {
          handleBlockUser({ user: selectUser, blocked: selectUser.blocked ? false : true });
        }}
      />
    </>
  );
};

export default UsersAdmin;
