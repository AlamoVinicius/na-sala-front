import imageCompression from "browser-image-compression";

import { Container, ListGroup, Stack, Form, Button, Spinner } from "react-bootstrap";
import { FormButton } from "../../buttons/Buttons";
import { useQuery, useQueryClient } from "react-query";
import { createStation, deleteStation, getAllStations } from "../../../services/api";
import { toast } from "react-toastify";
import { BackdropLoading } from "../../feedbacks/LoadingBackDrop";
import { NoImage } from "../../feedbacks/NoImage";
import { AiOutlineDelete } from "react-icons/ai";
import ModalCustom, { ModalComp } from "../../modal/ModalCustom";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

export default function ItemsManagent() {
  const [nameItem, setNameitem] = useState("");
  const [selectImg, setSelectImg] = useState(null);
  const [newItemImgUrl, setNewItemImgUrl] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showModalRegisterNewItem, setModalRegisterNewItem] = useState(false);
  const [showModalDeleteItem, setShowModalDeleteItem] = useState(false);
  const [itemToDeleteSelected, setItemToDeleteSelected] = useState("");
  const [loadingApi, setLoadingApi] = useState(false);

  const queryclient = useQueryClient();

  const handleNameChange = (event) => {
    setNameitem(event.target.value);
  };

  const handleImageSelected = (file) => {
    setSelectImg(file);

    const imgUrl = URL.createObjectURL(file);
    setNewItemImgUrl(imgUrl);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["@itemsToReservation"],
    queryFn: async () => {
      const { data } = await getAllStations();

      return data;
    },
    onError: () => toast.error("Ocorreu um erro ao tentar carregar os itens"),
    staleTime: 1000 * 60 * 30,
  });

  const resetQueryStations = () => queryclient.resetQueries("@itemsToReservation");

  const compressImg = async (imageFile) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedImgBlob = await imageCompression(imageFile, options);

      const compressedImg = new File([compressedImgBlob], imageFile.name, {
        type: imageFile.type,
      });

      console.log("compressed img==>", compressImg);
      return compressedImg;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const imageResize = await compressImg(selectImg);
      const formData = new FormData();
      formData.append("name", nameItem);
      formData.append("image", imageResize);
      // TODO obter studioId dinâmicamente
      formData.append("studioId", "64f4c2f5a8103d07303c52a4");
      try {
        setLoadingApi(true);
        // TODO migrar para mutation do react query
        await createStation(formData);
        toggleModal();
        toast.success("Item cadastrado com sucesso");
        resetQueryStations();
      } catch (error) {
        toast.error(error?.response?.data?.message ?? "Houve um erro ao cadastrar o novo item");
      } finally {
        setLoadingApi(false);
        setValidated(false);
      }
    }
  };

  const handleDeleteItem = async (idItem) => {
    setLoadingApi(true);
    try {
      await deleteStation(idItem);
      toast.success("Item deletado com sucesso ");
      resetQueryStations();
    } catch (error) {
      console.log(error);
      toast.error("Houve um erro ao deletar o item");
    } finally {
      setLoadingApi(false);
      setShowModalDeleteItem();
    }
  };

  const toggleModal = () => setModalRegisterNewItem((prev) => !prev);

  return (
    <Container>
      <Stack direction="horizontal" className="mb-5">
        <FormButton text="Cadastrar novo item" handleClick={toggleModal} />
      </Stack>
      {isLoading && <BackdropLoading />}
      <ListGroup as="ul">
        {data &&
          data.map((item) => (
            <ListGroup.Item key={item._id} as="li" className="d-flex justify-content-between align-items-start p-3">
              <div>
                <p className="fw-bold ">{item.name}</p>
                <FormButton
                  handleClick={() => {
                    setShowModalDeleteItem(true);
                    setItemToDeleteSelected(item._id);
                  }}
                  text={
                    <Stack direction="horizontal" gap={3}>
                      Deletar <AiOutlineDelete color="red" />
                    </Stack>
                  }
                />
              </div>
              {item.imageURL ? <img src={item.imageURL} alt="" width={150} height={150} /> : <NoImage />}
            </ListGroup.Item>
          ))}
      </ListGroup>
      <ModalComp title="Cadastrar novo item" showModal={showModalRegisterNewItem} setShowModal={toggleModal}>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do novo recurso"
              required
              autoFocus
              value={nameItem}
              onChange={handleNameChange}
            />
            <Form.Control.Feedback type="invalid">Nome obrigatório</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagem do item</Form.Label>
            <FileUploader
              multiple={false}
              handleChange={handleImageSelected}
              name="file"
              types={["JPG", "PNG", "JPEG"]}
              Label="{Adicione uma imagem para o item}"
              hoverTitle="Adicione uma imagem para o item"
              hoverHelper="Adicione uma imagem para o item"
            />
          </Form.Group>
          {newItemImgUrl && (
            <div className="d-flex justify-content-center mb-3">
              <img
                src={newItemImgUrl}
                alt="imagem do novo item"
                style={{ width: "100%", height: "100%", maxHeight: "300px", objectFit: "contain" }}
              />
            </div>
          )}

          <Button variant="primary" type="submit" disabled={loadingApi}>
            {loadingApi && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
            {loadingApi ? "Carregando..." : "Cadastrar"}
          </Button>
        </Form>
      </ModalComp>
      <ModalCustom
        isLoading={loadingApi}
        showModal={showModalDeleteItem}
        setShowModal={setShowModalDeleteItem}
        title={`Tem certeza que deseja deletar este item?`}
        textBody={`As reservas atreladas a este item serão excluídas`}
        handleConfirmClick={() => {
          handleDeleteItem(itemToDeleteSelected);
        }}
      />
    </Container>
  );
}
