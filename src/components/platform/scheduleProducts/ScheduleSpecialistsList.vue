<template>
  <div class="schedule-specialist-list">
    <q-page>
      <Breacrumbs :breadcrumbs="breadcrumbs" />
      <div class="schedule-specialist-list-content">
        <PageTitle :title="title"></PageTitle>
        <div class="col text-subtitle2 ellipsis text-grey-8 q-mb-sm">
          {{ product.name }}
        </div>
        <ScheduleSpecialistCard
          v-for="specialist in specialists"
          :key="specialist.id"
          :specialist="specialist"
          :specialistSchedule="specialist.specialistSchedule"
          :product="product"
        />
      </div>
    </q-page>
  </div>
</template>

<script>
import PageTitle from "../../general/PageTitle.vue";
import Breacrumbs from "../../general/Breacrumbs.vue";
import { filterCrud } from "./../../general/crud/utils/filterCrud";

import {
  organizeSpecialistScheduleData,
  getDayOfWeek,
} from "./organizeSpecialistScheduleData";

export default {
  data() {
    return {
      title: "Selecione o(a) especialista e a hora de seu agendamento",
      productId: "",
      specialists: [],
      product: {},
      breadcrumbs: [
        {
          title: "Agendamento",
          to: "",
        },
      ],
    };
  },
  components: {
    ScheduleSpecialistCard: () => {
      const component = window.mobileAndTabletCheck()
        ? import("./ScheduleSpecialistCardMobile.vue")
        : import("./ScheduleSpecialistCard.vue");
      return component;
    },
    Breacrumbs,
    PageTitle,
  },
  async created() {
    this.productId = this.$route.params.productId;

    await this.loadProduct();
    await this.loadSpecialists();
  },
  methods: {
    loadProduct: async function () {
      const products = await filterCrud([], `products/${this.productId}`);
      this.product = products[0];
      this.productId = this.product.id;
    },
    loadSpecialists: async function () {
      const filtersProductSpecialist = [
        {
          name: "productId",
          model: this.productId,
        },
      ];

      const productSpecialists = await filterCrud(
        filtersProductSpecialist,
        "specialists/products"
      );

      let actualDate = new Date();

      const dateBegin = getDayOfWeek(actualDate, 1, actualDate.getDay() <= 5);
      const dateEnd = getDayOfWeek(actualDate, 5, actualDate.getDay() <= 5);

      dateBegin.setHours(0, 0, 0);
      dateEnd.setHours(23, 59, 59);

      productSpecialists.forEach(async (productSpecialist) => {
        const specialists = await filterCrud(
          [],
          `specialists/${productSpecialist.specialistId}`
        );

        const specialist = specialists[0];
        
        // Filtrar especialistas que são admins (não mostrar na área pública)
        if (specialist && specialist.user && specialist.user.type === 'ADMIN') {
          return; // Pula este especialista
        }

        const filtersSpecialistSchedule = [
          {
            name: "specialistId",
            model: specialist.id,
          },
          {
            name: "dateBegin",
            model: dateBegin,
          },
          {
            name: "dateEnd",
            model: dateEnd,
          },
        ];
        let userType = localStorage.getItem("userType");
        const specialistsSchedule = await filterCrud(
          filtersSpecialistSchedule,
          userType.toUpperCase() === 'ADMIN' ? `specialists/schedule` : `specialists/schedule-to-user`
        );

        specialist.specialistSchedule = organizeSpecialistScheduleData(
          specialistsSchedule,
          dateBegin,
          dateEnd
        );

        this.specialists.push(specialist);
      });
    },
  },
};
</script>

<style lang="scss">
.specialist-list {
  width: 100%;
}

.schedule-specialist-list-content {
  padding: 20px 20px;
}
</style>
