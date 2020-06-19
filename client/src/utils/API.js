import axios from "axios";

export default {
  search: function (key) {
    return axios.get("/api/search/" + key);
  },
  search2: function (searchParams) {
    return axios.post("/api/search2", searchParams);
  },
};
