import sendRequest from "../utils/request";

export function getAllUsers() {
  return sendRequest({
    url: `/getAllUsers`,
    method: "get",
  });
}

export function getRoomMessages(params) {
  return sendRequest({
    url: `/getMessages`,
    method: "post",
    data: params,
  });
}

export function sendMessage(params) {
  return sendRequest({
    url: `/createMessage`,
    method: "post",
    data: params,
  });
}

export function getUserById(params) {
  return sendRequest({
    url: `/getUserId`,
    method: "post",
    data: params,
  });
}
