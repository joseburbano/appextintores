import React, { useEffect, useState } from "react";
import { StyleSheet, View} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { map } from "lodash";
import moment from "moment";
import Colores from "../../styles/Colors";
import ChangeDisplayPlacaForm from "./FormExtintoresChangeDisplay/ChangeDisplayPlacaForm";
import ChangeDisplayTipoForm from "./FormExtintoresChangeDisplay/ChangeDisplayTipoForm";
import ChangeDisplayTamanoForm from "./FormExtintoresChangeDisplay/ChangeDisplayTamanoForm";
import ChangeDisplaySedeForm from "./FormExtintoresChangeDisplay/ChangeDisplaySedeForm";
import ChangeDisplayBloqueForm from "./FormExtintoresChangeDisplay/ChangeDisplayBloqueForm";
import ChangeDisplayPisoForm from "./FormExtintoresChangeDisplay/ChangeDisplayPisoForm";
import ChangeDisplayEstadoSelloForm from "./FormExtintoresChangeDisplay/ChangeDisplayEstadoSelloForm";
import ChangeDisplayEstadoPlacaForm from "./FormExtintoresChangeDisplay/ChangeDisplayEstadoPlacaForm";
import ChangeDisplayEstadoGeneralForm from "./FormExtintoresChangeDisplay/ChangeDisplayEstadoGeneralForm";
import ChangeDisplayDanoFisicoForm from "./FormExtintoresChangeDisplay/ChangeDisplayDanoFisicoForm";
import ChangeDisplayObservationForm from "./FormExtintoresChangeDisplay/ChangeDisplayObservationForm";
import ChangeDisplayFechaVenciForm from "./FormExtintoresChangeDisplay/ChangeDisplayFechaVenciForm";
import ChangeDisplayFechaRecargaForm from "./FormExtintoresChangeDisplay/ChangeDisplayFechaRecargaForm";

import Modal from "../Modal";

export default function ExtintorForm(props) {
  const { extintor, toastRef, setRealoadExtintorInfo } = props;
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [tokenUpdate, setTokenUpdate] = useState(null);
  const {
    _id,
    placa,
    tipoExt,
    tamanio,
    sede,
    ubicacionBloque,
    ubicacionPiso,
    danoFisico,
    observaciones,
    fechaCreate,
    fechaUpdate,
    fechaRecarga,
    estadoSello,
    estadoPlaca,
    fechaVencimiento,
    estado,
  } = extintor;
  var fechaActual = new Date();

  useEffect(() => {
    (async () => {
      const idToken = await AsyncStorage.getItem("@accessToken");
      setTokenUpdate(idToken);
    })();
  }, []);

  const selectComponentExti = (key) => {
    switch (key) {
      case "Placa":
        setRenderComponent(
          <ChangeDisplayPlacaForm
            displayName={placa}
            setShowModal={setShowModal}
            toastRef={toastRef}
            idEx={_id}
            fechaActual={fechaActual}
            tokenUpdate={tokenUpdate}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
          />
        );
        setShowModal(true);
        break;
      case "Tipo":
        setRenderComponent(
          <ChangeDisplayTipoForm
            displayName={tipoExt}
            setShowModal={setShowModal}
            toastRef={toastRef}
            idEx={_id}
            fechaActual={fechaActual}
            tokenUpdate={tokenUpdate}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
          />
        );
        setShowModal(true);
        break;
      case "Tamano":
        setRenderComponent(
          <ChangeDisplayTamanoForm
            displayName={tamanio}
            setShowModal={setShowModal}
            toastRef={toastRef}
            idEx={_id}
            fechaActual={fechaActual}
            tokenUpdate={tokenUpdate}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
          />
        );
        setShowModal(true);
        break;
      case "Sede":
        setRenderComponent(
          <ChangeDisplaySedeForm
            displayName={sede}
            setShowModal={setShowModal}
            toastRef={toastRef}
            idEx={_id}
            fechaActual={fechaActual}
            tokenUpdate={tokenUpdate}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
          />
        );
        setShowModal(true);
        break;
      case "Bloque":
        setRenderComponent(
          <ChangeDisplayBloqueForm
            displayName={ubicacionBloque}
            setShowModal={setShowModal}
            toastRef={toastRef}
            idEx={_id}
            fechaActual={fechaActual}
            tokenUpdate={tokenUpdate}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
          />
        );
        setShowModal(true);
        break;
      case "Piso":
        setRenderComponent(
          <ChangeDisplayPisoForm
            displayName={ubicacionPiso}
            setShowModal={setShowModal}
            toastRef={toastRef}
            idEx={_id}
            fechaActual={fechaActual}
            tokenUpdate={tokenUpdate}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
          />
        );
        setShowModal(true);
        break;
      case "danooFisico":
        setRenderComponent(
          <ChangeDisplayDanoFisicoForm
            displayName={danoFisico}
            setShowModal={setShowModal}
            toastRef={toastRef}
            idEx={_id}
            fechaActual={fechaActual}
            tokenUpdate={tokenUpdate}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
          />
        );
        setShowModal(true);
        break;
      case "Observaciones":
        setRenderComponent(
          <ChangeDisplayObservationForm
            displayName={observaciones}
            setShowModal={setShowModal}
            toastRef={toastRef}
            idEx={_id}
            fechaActual={fechaActual}
            tokenUpdate={tokenUpdate}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
          />
        );
        setShowModal(true);
        break;
      case "fechaRecarga":
        setRenderComponent(
          <ChangeDisplayFechaRecargaForm
            displayName={fechaVencimiento}
            idEx={_id}
            tokenUpdate={tokenUpdate}
            fechaActual={fechaActual}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
            setShowModal={setShowModal}
          />
        );
        setShowModal(true);
        break;
      case "esstadoSello":
        setRenderComponent(
          <ChangeDisplayEstadoSelloForm
            displayName={estadoSello}
            setShowModal={setShowModal}
            toastRef={toastRef}
            idEx={_id}
            fechaActual={fechaActual}
            tokenUpdate={tokenUpdate}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
          />
        );
        setShowModal(true);
        break;
      case "EstadoPlaaca":
        setRenderComponent(
          <ChangeDisplayEstadoPlacaForm
            displayName={estadoPlaca}
            setShowModal={setShowModal}
            toastRef={toastRef}
            idEx={_id}
            fechaActual={fechaActual}
            tokenUpdate={tokenUpdate}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
          />
        );
        setShowModal(true);
        break;
      case "FechaVencimiento":
        setRenderComponent(
          <ChangeDisplayFechaVenciForm
            displayName={fechaVencimiento}
            idEx={_id}
            tokenUpdate={tokenUpdate}
            fechaActual={fechaActual}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
            setShowModal={setShowModal}
          />
           );
          setShowModal(true);
        break;
      case "EstadEngeneral":
        setRenderComponent(
          <ChangeDisplayEstadoGeneralForm
            displayName={estado}
            setShowModal={setShowModal}
            toastRef={toastRef}
            idEx={_id}
            fechaActual={fechaActual}
            tokenUpdate={tokenUpdate}
            setRealoadExtintorInfo={setRealoadExtintorInfo}
          />
        );
         setShowModal(true);
        break;
      default:
        setRenderComponent(false);
        setShowModal(false);
        break;
    }
  };

  const fechaFechaCreate = moment(fechaCreate).format("DD/MM/YYYY HH:mm");
  const fechaFechaUpdate = moment(fechaUpdate).format("DD/MM/YYYY HH:mm");
  const fechaFechaRecarga = moment(fechaRecarga).format("DD/MM/YYYY HH:mm");
  const fechaFechaVencimiento = moment(fechaVencimiento).format("DD/MM/YYYY HH:mm");

  const menuOptionsExtin = generateOptionsDatosExtinto(selectComponentExti);
  return (
    <View>
      {menuOptionsExtin.map((lista, index) => (
        <ListItem key={index} onPress={lista.onPress} bottomDivider>
          <Icon
            type={lista.iconType}
            name={lista.iconNameLeft}
            color={lista.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{lista.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={lista.iconColorLeft} />
        </ListItem>
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );

  function generateOptionsDatosExtinto(selectComponentExti) {
    return [
      {
        title: `Placa: ${placa}`,
        iconType: "material-community",
        iconNameLeft: "barcode",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("Placa"),
      },
      {
        title: `Tipo: ${tipoExt}`,
        iconType: "material-community",
        iconNameLeft: "fire-extinguisher",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("Tipo"),
      },
      {
        title: `Tamaño: ${tamanio}`,
        iconType: "material-community",
        iconNameLeft: "vector-curve",
        iconColorLeft: Colores.GREEN,
        iconNameRight: "chevron-right",
        onPress: () => selectComponentExti("Tamano"),
      },
      {
        title: `Sede: ${sede}`,
        iconType: "material-community",
        iconNameLeft: "map-search-outline",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("Sede"),
      },
      {
        title: `Bloque: ${ubicacionBloque}`,
        iconType: "material-community",
        iconNameLeft: "map-search-outline",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("Bloque"),
      },
      {
        title: `Piso: ${ubicacionPiso}`,
        iconType: "material-community",
        iconNameLeft: "map-search-outline",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("Piso"),
      },
      {
        title: `Daño Fisico: ${danoFisico}`,
        iconType: "material-community",
        iconNameLeft: "alert",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("danooFisico"),
      },
      {
        title: `Observaciones: ${observaciones}`,
        iconType: "material-community",
        iconNameLeft: "book-search-outline",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("Observaciones"),
      },
      {
        title: `Fecha de creación: ${fechaFechaCreate}`,
        iconType: "material-community",
        iconNameLeft: "calendar-multiple-check",
        iconColorLeft: Colores.GREEN,
      },
      {
        title: `Fecha de última actualización: ${fechaFechaUpdate}`,
        iconType: "material-community",
        iconNameLeft: "calendar-today",
        iconColorLeft: Colores.GREEN,
      },
      {
        title: `Fecha de última recarga: ${fechaFechaRecarga}`,
        iconType: "material-community",
        iconNameLeft: "calendar-multiple-check",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("fechaRecarga"),
      },
      {
        title: `Estado del sello: ${estadoSello}`,
        iconType: "material-community",
        iconNameLeft: "barcode-scan",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("esstadoSello"),
      },
      {
        title: `Estado de la placa: ${estadoPlaca}`,
        iconType: "material-community",
        iconNameLeft: "barcode-scan",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("EstadoPlaaca"),
      },
      {
        title: `Fecha de vencimiento: ${fechaFechaVencimiento}`,
        iconType: "material-community",
        iconNameLeft: "calendar-clock",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("FechaVencimiento"),
      },
      {
        title: `Estado en general: ${estado}`,
        iconType: "material-community",
        iconNameLeft: "playlist-check",
        iconColorLeft: Colores.GREEN,
        onPress: () => selectComponentExti("EstadEngeneral"),
      },
    ];
  }
}

const styles = StyleSheet.create({
  btnContainerr: {
    width: "100%",
    padding: "3%",
  },
  btnLogin: {
    backgroundColor: Colores.GREEN,
  },
});
