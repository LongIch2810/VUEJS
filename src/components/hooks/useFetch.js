import { ref, watchEffect } from "vue";
import axios from "axios";

export default function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);
  watchEffect(async () => {
    if (!url.value) return;
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get(url.value);
      data.value = res.data;
    } catch (error) {
      error.value = error;
    } finally {
      loading.value = false;
    }
  });

  return { data, error, loading };
}
