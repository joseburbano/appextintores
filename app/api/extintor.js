import { basePath, version } from "./config";
//consultar a la api

export function getExtintorApi(limit, page) {
  const url = `${basePath}/${version}/get-extintores?limit=${limit}&page=${page}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function deleteExtintorApi(token, id) {
  const url = `${basePath}/${version}/delete-extintor/${id}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//peticion para agregar extintor al backend
export function addExtintorApi(token, extintor, id) {
  const url = `${basePath}/${version}/add-extintor/${id}`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(extintor),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//peticion para actuslizar
export function updateExtintorApi(token, id, data) {
  const url = `${basePath}/${version}/update-extintor/${id}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
//peticion para ver el contendio de un url
export function getExtinApi(urlExtintor) {
  const url = `${basePath}/${version}/get-Extintor/${urlExtintor}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//peticion para ver el contendio de un id
export function getExtinIdApi(idExtintor) {

  const url = `${basePath}/${version}/get-Extintorid/${idExtintor}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//Extraer datos por sede
export function getSedeApi(token, limit, page, sede) {
  const url = `${basePath}/${version}/sede/${sede}?limit=${limit}&page=${page}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//Extraer datos por bloque
export function getSedeBloqueApi(token, limit, page, sede, bloque) {
  const url = `${basePath}/${version}/sede-bloque/${sede}/${bloque}?limit=${limit}&page=${page}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//Extraer datos por sede, bloque , piso
export function getSedeBloquePisoApi(token, limit, page, sede, bloque, piso) {
  const url = `${basePath}/${version}/sede-bloquepiso/${sede}/${bloque}/${piso}?limit=${limit}&page=${page}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//consultar todos los registros de Extintores
export function getRegistroExtintoresApi(token) {
  const url = `${basePath}/${version}/informe`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//traer foto user
export function getAvatarExtintorApi(avatarName) {
  const url = `${basePath}/${version}/get-foto/${avatarName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

//para subir imagnes del frontend al servidor
export function uploadImagenApi(token, avatar, userId) {
  const url = `${basePath}/${version}/upload-foto/${userId}`;

  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);
  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
