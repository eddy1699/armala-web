<template>
  <card-component title="Iniciar Sesión" icon="lock">
    <router-link slot="button" to="/" class="button is-small">
      Dashboard
    </router-link>
    <img
      src="../../assets/Armala.png"
      alt=""
      height="250"
      width="250"
      class="center"
    />
    <form method="POST" @submit.prevent="login">
      <b-field label="Usuario">
        <b-input v-model="form.email" name="user" type="text" required />
      </b-field>

      <b-field label="Contraseña">
        <b-input
          v-model="form.password"
          type="password"
          name="password"
          required
        />
      </b-field>
      <div
        class="g-recaptcha"
        data-sitekey="6Lfm3FYoAAAAAOTGDrnZcGShmF3oodUREPrAyA9r"
      />
      <b-field>
        <b-checkbox v-model="form.remember" type="is-black" class="is-thin">
          Recordarme
        </b-checkbox>
      </b-field>

      <hr />

      <b-field>
        <div class="control">
          <b-button
            native-type="submit"
            type=""
            class="btn"
            :loading="isLoading"
            :disabled="formCompleted == false"
            @click="login"
          >
            Ingresar
          </b-button>
          <b-button
            type="is-ghost"
            tag="router-link"
            to="register "
            :disabled="false"
          >
            Registrarse
          </b-button>

          <!-- </div>
        <div class="control">
          <router-link
            to="dashboard"
            class="button is-outlined is-black"
          >
            Dashboard
          </router-link>
        </div> -->
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { defineComponent } from "vue";
import CardComponent from "@/components/CardComponent.vue";
import "@/scss/test.scss";
import backendURL from "@/url";
import axios from "axios";

import isAuthenticatedGuard from "../../router/auth-guard";
export default defineComponent({
  name: "LoginView",
  components: { CardComponent },
  data() {
    return {
      isLoading: false,
      formCompleted: false,
      form: {
        email: "",
        password: "",
        remember: false,
      },
    };
  },
  watch: {
    "form.email": function () {
      this.inputsFilled(this.form.email, this.form.password);
    },
    "form.password": function () {
      this.inputsFilled(this.form.email, this.form.password);
    },
  },
  created() {
    this.validateToken();
    this.loadAccess();
  },
  methods: {
    // submit () {
    //   this.isLoading = true

    //   setTimeout(() => {
    //     this.isLoading = false

    //     this.$router.push('/')
    //   }, 750)
    // },
    async onloadCallback() {
      alert("grecaptcha is ready!");
    },
    inputsFilled(username, password) {
      if (username.length > 1 && password.length > 1) {
        this.formCompleted = true;
      } else {
        this.formCompleted = false;
      }
    },
    async login() {
      this.isLoading = true;
      const response = await axios.post(`${backendURL}/api/User/login`, {
        userName: this.form.email,
        password: this.form.password,
      });
      if (response.data.isSuccess && response.data.result.token !== "") {
        console.log("No hay token");
        await localStorage.setItem(
          "userData",
          JSON.stringify(response.data.result)
        );
        const userCompleteName = JSON.parse(
          localStorage.getItem("userData")
        ).user;
        console.log("userloging", userCompleteName.name);
        this.saveAccess();
        this.$router.push("/home");
        this.$buefy.toast.open({
          duration: 5000,
          message: `Bienvenido ${userCompleteName.name}`,
          position: "is-top",
          type: "is-success",
        });
      } else {
        this.isLoading = false;
        this.$buefy.toast.open({
          duration: 5000,
          message: "Usuario o contraseña incorrectos",
          position: "is-bottom",
          type: "is-danger",
        });
      }
      this.info = response.data.result;
      return this.info;
    },
    validateToken() {
      try {
        const tokenLocalStorage = JSON.parse(
          localStorage.getItem("userData")
        ).token;
        if (tokenLocalStorage != null) {
          this.$router.push("/clientes");
        }
      } catch (error) {
        // console.warn(error)
      }
    },
    saveAccess() {
      console.log("Guardado!", this.form.remember);
      if (this.form.remember) {
        const userAccess = {
          userName: this.form.email,
          password: this.form.password,
        };
        localStorage.setItem("userAccess", JSON.stringify(userAccess));
        console.log("Guardado!");
      }
    },
    loadAccess() {
      if (localStorage.getItem("userAccess")) {
        this.form.email = JSON.parse(
          localStorage.getItem("userAccess")
        ).userName;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../scss/theme-default";

.btn {
  background-color: $base-color;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
