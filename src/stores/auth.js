// stores/auth.js
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isLogged = ref(false);
    const user = ref(null);
    const loading = ref(false);
    const accessToken = ref(null);
    const refreshToken = ref(null);
    const err = ref(null);

    const router = useRouter();

    const login = async (username, password) => {
      if (!username || !password) {
        alert("Vui lòng nhập username hoặc password !");
        return;
      }

      loading.value = true;
      try {
        const res = await axios.post(
          "https://dummyjson.com/user/login",
          {
            username: username.trim(),
            password: password.trim(),
            expiresInMins: 30,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        user.value = {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          gender: res.data.gender,
          image: res.data.image,
        };

        accessToken.value = res.data.accessToken;
        refreshToken.value = res.data.refreshToken;
        isLogged.value = true;

        router.push("/");
      } catch (error) {
        err.value = error.message;
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    const register = async (email, username, password) => {
      if (!email || !username || !password) {
        alert("Vui lòng nhập email, username hoặc password !");
        return;
      }

      loading.value = true;

      try {
        await axios.post(
          "https://dummyjson.com/users/add",
          {
            email: email.trim(),
            username: username.trim(),
            password: password.trim(),
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        alert("Đăng ký thành công !");
        router.push("/login");
      } catch (error) {
        err.value = error.message;
        console.log(error);
      } finally {
        loading.value = false;
      }
    };

    const logout = () => {
      accessToken.value = null;
      refreshToken.value = null;
      isLogged.value = false;
      user.value = null;
      router.push("/login");
    };

    const refresh = async () => {
      try {
        const res = await axios.post("https://dummyjson.com/auth/refresh", {
          refreshToken: refreshToken.value,
          expiresInMins: 30,
        });

        accessToken.value = res.data.accessToken;
        refreshToken.value = res.data.refreshToken;

        return accessToken.value;
      } catch (error) {
        err.value = error.message;
        console.log(error);
      }
    };

    return { isLogged, user, loading, err, login, register, logout, refresh };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          paths: ["accessToken", "refreshToken", "isLogged", "user"],
        },
      ],
    },
  }
);
