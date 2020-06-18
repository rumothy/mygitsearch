import axios from "axios";

export default {
  search: function (key) {
    return axios.get("/api/search/" + key);
  },
};
