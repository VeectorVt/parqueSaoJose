export default {
  handlingErrorResponse
};

const errorMessage =
  "Ocorreu um erro no servidor, tente novamente em instantes ou contate o suporte";
const errorMessageNetwork = "Tente novamente em instantes ou contate o suporte";

// Tratamento de erros devolvidos nas requisições
function handlingErrorResponse(error) {
  let statusCode = null;
  let statusText = null;
  let messages = [];
  const networkError = error?.message?.toLowerCase().includes("network error");

  if (!networkError) {
    // Status Code
    if (error?.statusCode) statusCode = error.statusCode;
    else if (error?.status) statusCode = error.status;
    else if (error?.response?.status) statusCode = error.response.status;

    // Response Data Error
    if (error?.response?.data) error = error.response.data;
    else if (error?.response) error = error.response;
    console.error("Oops!", error);

    // Status Message
    if (error?.data?.error?.message || error?.data?.message) statusText = error?.data?.error?.message || error?.data?.message
    else if (error?.data?.error) statusText = error?.data?.error
    else if (error?._message || error?.message) statusText = adjustStatusText(error?._message || error?.message);
    else if (error?.statusText)
      statusText = adjustStatusText(error?.statusText);
    else statusText = errorMessage;

    // Errors Messages
    if (error.errors) {
      Object.values(error?.errors).forEach(erro => {
        messages.push(erro?.message);
      })
    } else if (error?.error) {
      messages.push(error?.error?.message || error?.error || error);
    } else if (error?.message) {
      messages.push(error?.message);
    }
  } else {
    statusCode = 401;
    statusText = adjustStatusText(error?.message);
    messages.push(errorMessageNetwork);
  }

  return {
    statusCode: statusCode,
    statusText: statusText,
    messages: messages
  };
}

// Status Text Adjust
function adjustStatusText(msg) {
  console.log('msg: ', msg)
  if (msg?.toLowerCase().includes("validation failed")) {
    return "Campos obrigatórios necessários!";
  } else if (msg?.toLowerCase().includes("internal server error")) {
    return "Erro interno do servidor!";
  } else if (msg?.toLowerCase().includes("network error")) {
    return "Erro ao tentar conexão com o servidor!";
  }
  return "Erro desconhecido";
}
