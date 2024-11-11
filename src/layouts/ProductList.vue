<template>
  <div class="product-list">
    <div class="product-list-container">
      <h1 class="product-list-title">
        Escolha suas mentorias
      </h1>
      <div class="product-list-cards-container">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/site/productDetails/ProductCard.vue";

import axios from "axios";
import { baseApiUrl, showError } from "../global.js";

export default {
  components: {
    ProductCard,
  },
  data() {
    return { products: [] };
  },
  created() {
    window.scrollTo(0, 0);
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      this.products = axios
        .get(`${baseApiUrl}/products?onlyAdmin=false`)
        .then((products) => {
          this.products = products.data;
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.product-details-list {
  padding: 2%;
}

.product-list-container {
  background-color: rgb(243, 244, 249);
  padding: 20px;
}

.product-details h1 {
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}

.product-list-cards-container {
  margin: 20px 15%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 24px;
}

.product-list-title {
  text-align: center;
  grid-column: 1;
  grid-row: 1;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  color: #667998;
  font-size: 3rem;
}

@media (orientation: portrait) {
  .product-list-title {
    font-size: 1.5rem;
    line-height: unset;
  }
}
</style>
