console.log("API URL:", useRuntimeConfig().public.API_URL);

export default function $api(url, options = {}) {
    return $fetch(url, {
      baseURL: useRuntimeConfig().public.API_URL,
      ...options
    });

    
  }
  