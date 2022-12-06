import axios from "axios";
import { loginInfoStore } from "./stores/loginInfo";
import { mapState, mapActions } from "pinia";
export default {
  data() {
    return {
      apiUrl: "http://127.0.0.1:8000",
    };
  },
  computed: {
    ...mapState(loginInfoStore, ["getLoginInfo"]),
  },
  methods: {
    ...mapActions(loginInfoStore, ["setAuthenticate"]),

    post(urlText, formData) {
      let url = this.apiUrl + "/api/" + urlText;
      let postResponse = axios.post(url, formData).then((response) => {
        return response;
      });

      return postResponse;
    },
    async get(urlText, id = 0, allowPagination = false) {
      let url =
        id == 0
          ? this.apiUrl +
            "/api/" +
            urlText +
            "?allowPagination=" +
            allowPagination
          : this.apiUrl + "/api/" + urlText + "/" + id;
      let getResponse = await axios.get(url).then((response) => {
        return response;
      });

      return getResponse;
    },
    put(urlText, formData) {
      let url = this.apiUrl + "/api/" + urlText;
      let putResponse = axios.put(url, formData).then((response) => {
        return response;
      });

      return putResponse;
    },
    patch(urlText, id) {
      let url = this.apiUrl + "/api/" + urlText + id;
      let patchResponse = axios.patch(url).then((response) => {
        return response;
      });

      return patchResponse;
    },
    delete(urlText, id) {
      let url = this.apiUrl + "/api/" + urlText + id;
      let deleteResponse = axios.delete(url).then((response) => {
        return response;
      });

      return deleteResponse;
    },
    logOut(e) {
      e.preventDefault();

      let url = this.apiUrl + "/api/auth/logout";
      axios.post(url).then(() => {
        this.setAuthenticate(false);
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    fakeClick() {
      return false;
    },
    setTokenToHeader() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.getLoginInfo.access_token;
    },
    changeRoute(route) {
      this.$router.push(route);
    },
    checkValidation(callBack) {
      var needsValidation = document.querySelectorAll(".needs-validation");
      Array.prototype.slice.call(needsValidation).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
            if (form.checkValidity()) {
              event.preventDefault();
              callBack();
            }
          },
          false
        );
      });
    },
  },
  mounted() {
    this.setTokenToHeader();
  },
};
