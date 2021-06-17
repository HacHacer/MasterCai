import myAxios from "./axios";

export function getListAPI(paramsList: any) {
  return myAxios({
    url: "/api/list",
    method: "get",
  });
}
