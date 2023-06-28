<template>
  <div id="q-app" class="schedule">
    <q-page class="q-pa-lg">
      <div class="row">
        <q-card
          class="my-card col-2 q-ma-sm"
          v-for="click in clicks"
          :key="click.cn_name"
        >
          <q-card-section class="row justify-center">
            <b>{{ click.count }} Cliques</b></q-card-section
          >
          <q-card-section class="row justify-center">
            {{ click.cn_name }}
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../global";

export default {
  components: {},
  data() {
    return {
      clicks: [],
    };
  },
  methods: {
    listClicks() {
      let config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/clicks`,
      };

      axios(config)
        .then(async (clicks) => {
          this.clicks = clicks.data;

          console.log(this.clicks);
        })
        .catch((err) => {
          console.log(err);
          showError(err);
        });
    },
  },
  mounted() {
    this.listClicks();
  },
};
</script>

<style>
.schedule {
  height: 100%;
}

.my-card {
  height: 180px;
  width: 180px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
</style>
