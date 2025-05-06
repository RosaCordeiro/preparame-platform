<template>
  <main class="fm">
    <h2>Materiais Gratuitos</h2>
    <div class="fm__grid">
      <a v-for="(item, index) in imageLinks" :key="index" :href="'/#/MateriaisGratuitos/' + item.slug"
        rel="noopener noreferrer" class="image-card">
        <img :src="item.image_url != null ? item.image_url : 'https://placehold.co/600x400?text=Sem+Imagem'" :alt="'Imagem ' + (index + 1)" />
      </a>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      imageLinks: [],
    };
  },
  async mounted() {
    document.documentElement.classList.add("site-body");
    try {
      const response = await axios.get("https://api-preparame.app.homolog.inf.br/materials/public");
      this.imageLinks = response.data;
    } catch (error) {
      console.error("Erro ao carregar os materiais:", error);
    }
  },
  beforeUnmount() {
    document.documentElement.classList.remove("site-body");
  }
};
</script>
