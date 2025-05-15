import errorsHandling from "./errorsHandling.js";
import swal from "sweetalert2";

const confirmColor = "#367CFF";
const cancelColor = "#E84747";
// const saveColor = "#01A263";

export default {
  swalMessage,
  swalTitle,
  swalConfirm,
  swalConfirmThree,
  swalNotification,
  swalButton,
  swalLoading,
  swalAutoClose,
  swalSuccess,
  swalError,
  swalErrorResponse,
  swalSelect,
  swalInputFile,
};

// Alerta sem título
async function swalMessage({
  text = "",
  icon = "warning",
  buttonText = "OK",
} = {}) {
  return await swal.fire({
    html: text,
    icon: icon,
    confirmButtonText: buttonText,
    confirmButtonColor: confirmColor,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false,
    customClass: "swal2-custom",
  });
}

// Alerta sem texto
async function swalTitle({
  title = "",
  icon = "",
  confirm = "Sim",
  cancel = "Cancelar",
  leftColor = cancelColor,
  rightColor = confirmColor,
  reverse = true,
  spacedBtn = false,
} = {}) {
  return await swal.fire({
    title: title,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: rightColor,
    cancelButtonColor: leftColor,
    confirmButtonText: confirm,
    cancelButtonText: cancel,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false,
    reverseButtons: reverse,
    customClass: spacedBtn ? "swal2-custom-spaced-btn" : "swal2-custom",
  });
}

// Alerta de Confirmação com 2 opções
async function swalConfirm(
  title = "",
  text = "",
  icon = "warning",
  confirm = "Sim",
  cancel = "Cancelar",
  reverse = true,
  spacedBtn = false
) {
  return await swal.fire({
    title: title,
    html: text,
    icon: icon,
    showCancelButton: true,
    showCloseButton: true,

    confirmButtonColor: confirmColor,
    cancelButtonColor: cancelColor,
    confirmButtonText: confirm,
    cancelButtonText: cancel,

    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false,
    reverseButtons: reverse,
    customClass: spacedBtn ? "swal2-custom-spaced-btn" : "swal2-custom",
  });
}

// Alerta de Confirmação com 3 opções
async function swalConfirmThree(
  title = "",
  text = "",
  icon = "warning",
  confirm = "Sim",
  cancel = "Cancelar",
  denyButtonText = "",
  reverse = true,
  spacedBtn = false
) {
  return await swal.fire({
    title: title,
    html: text,
    icon: icon,
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonColor: confirmColor,
    cancelButtonColor: cancelColor,
    confirmButtonText: confirm,
    cancelButtonText: cancel,
    denyButtonText: denyButtonText,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false,
    reverseButtons: reverse,
    customClass: spacedBtn
      ? "swal2-custom-spaced-btn"
      : ".swal2-custom-spaced-btn-denied .swal2-actions",
  });
}

// Alerta de Confirmação com 3 opções
async function swalNotification(
  title = "",
  text = "",
  icon = "warning",
  confirm = "Sim",
  denyButtonText = "não",
  reverse = true
  // spacedBtn = false
) {
  return await swal.fire({
    title: title,
    html: text,
    icon: icon,
    width: 400,

    showDenyButton: true,
    showCloseButton: true,

    confirmButtonColor: confirmColor,

    confirmButtonText: confirm,

    denyButtonText: denyButtonText,

    denyButtonColor: "#ffffff00",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false,
    reverseButtons: reverse,
    customClass: {
      popup: "swal2-custom-spaced-btn-close-modal",
      actions: "actions-center",
      confirmButton: "print-button-confirm",
      denyButton: "print-button-cancel",
    },
  });
}

// Alerta de aviso ou resposta com 1 botão de confirmação
async function swalButton(
  title = "",
  text = "",
  icon = "warning",
  buttonText = "OK"
) {
  return await swal.fire({
    title: title,
    html: text,
    icon: icon,
    confirmButtonText: buttonText,
    confirmButtonColor: confirmColor,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false,
    customClass: "swal2-custom",
  });
}

// Alerta com loading (timer)
async function swalLoading({
  title = "",
  text = "",
  icon = "warning",
  timer = 2000,
} = {}) {
  return await swal.fire({
    title: title,
    html: text,
    icon: icon,
    timer: timer,
    willOpen: () => {
      swal.showLoading();
    },
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    customClass: "swal2-custom",
  });
}

// Alerta com timer (autoclose)
async function swalAutoClose({
  title = "",
  text = "",
  icon = "warning",
  timer = 2000,
} = {}) {
  return await swal.fire({
    title: title,
    html: text,
    icon: icon,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    timer: timer,
    customClass: "swal2-custom",
  });
}

// Alerta de Sucesso sem botão com timer (autoclose)
async function swalSuccess({ text = "", timer = 2000 } = {}) {
  return await swal.fire({
    title: "Sucesso!",
    html: text,
    icon: "success",
    showConfirmButton: false,
    timer: timer,
    customClass: "swal2-custom",
  });
}

// Alerta de Erro com botão de confirmação
async function swalError({ text = "", buttonText = "OK" } = {}) {
  return await swal.fire({
    title: "Oops",
    html: text,
    icon: "error",
    confirmButtonText: buttonText,
    confirmButtonColor: confirmColor,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false,
    customClass: "swal2-custom",
  });
}

// Alerta de Erro de Requisição
async function swalErrorResponse({ error = {}, confirm = "OK" } = {}) {
  let message = "";
  if (typeof error === "string") {
    return await swal.fire({
      title: "Oops!",
      html: error,
      icon: "error",
      confirmButtonText: confirm,
      confirmButtonColor: confirmColor,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      focusConfirm: false,
      customClass: "swal2-custom",
    });
  }
  const erro = errorsHandling.handlingErrorResponse(error?.response || error);
  if (erro.statusCode)
    message += `<span class="swal2-error-code">Cód. ${erro.statusCode}</span><br>`;

  if (erro.statusText) message += erro.statusText;

  if (erro?.messages?.length) {
    message += `<br>`;
    for (const msg of erro.messages) {
      message += `<br><span class="swal2-errors-list">${msg}</span>`;
    }
  }
  if (error?.data?.error) {
    message += `<br><span class="swal2-errors-list">${error?.data?.error}</span>`;
  }
  if (
    erro.statusCode == 403 &&
    erro?.messages?.length &&
    erro.messages[0].includes(
      "Existe outra versão mais atualizada do protocolo"
    )
  ) {
    return await swal
      .fire({
        title: "Versão Desatualizada!",
        html: message,
        icon: "warning",
        confirmButtonText: confirm,
        confirmButtonColor: confirmColor,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        focusConfirm: false,
        timer: 4000,
        customClass: "swal2-custom",
      })
      .then(() => {
        window.location.reload();
      });
  }

  return await swal.fire({
    title: "Oops!",
    html: message,
    icon: "error",
    confirmButtonText: confirm,
    confirmButtonColor: confirmColor,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false,
    customClass: "swal2-custom",
  });
}

// Alerta com Select
async function swalSelect({
  title = "",
  options = {},
  inputPlaceholder = "Selecione",
  validatorFunction = () => {},
  confirm = "Sim",
  cancel = "Cancelar",
  reverse = true,
} = {}) {
  return await swal.fire({
    title: title,
    input: "select",
    inputOptions: options,
    inputPlaceholder: inputPlaceholder,
    showCancelButton: true,
    confirmButtonColor: confirmColor,
    cancelButtonColor: cancelColor,
    confirmButtonText: confirm,
    cancelButtonText: cancel,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false,
    reverseButtons: reverse,
    customClass: "swal2-custom",
    inputValidator: validatorFunction,
  });
}

// Alerta com Input de Arquivos
async function swalInputFile({
  title = "",
  text = "",
  inputAttributes = {},
} = {}) {
  return await swal.fire({
    title: title,
    html: text,
    input: "file",
    inputAttributes: inputAttributes,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false,
    customClass: "swal2-custom swal2-input-file",
  });
}
