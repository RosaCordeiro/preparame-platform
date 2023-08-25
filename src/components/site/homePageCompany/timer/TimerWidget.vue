<template>
  <section class="timer">
    <div
      class="title"
      :style="{
        backgroundColor: $parent.clockColor,
        color: $parent.textColor,
      }"
    >
      <span>
        Este mês as bolsas acabaram. <br />
        Mês que vem tem mais :) <br />Volte em:
      </span>
    </div>

    <div class="row row__home-company">
      <div
        class="day"
        :style="{
          backgroundColor: $parent.clockColor,
          color: $parent.textColor,
        }"
      >
        {{ days }}
        <span>
          {{ days > 1 ? "dias" : "dia" }}
        </span>
      </div>
      <div
        class="hour"
        :style="{
          backgroundColor: $parent.clockColor,
          color: $parent.textColor,
        }"
      >
        {{ hours }}
        <span>
          {{ hours > 1 ? "horas" : "hora" }}
        </span>
      </div>
      <div
        class="minute"
        :style="{
          backgroundColor: $parent.clockColor,
          color: $parent.textColor,
        }"
      >
        {{ minutes }}
        <span>
          {{ minutes > 1 ? "minutos" : "minuto" }}
        </span>
      </div>
      <div
        class="second"
        :style="{
          backgroundColor: $parent.clockColor,
          color: $parent.textColor,
        }"
      >
        {{ seconds }}
        <span>
          {{ seconds > 1 ? "segundos" : "segundo" }}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      countDownDate: this.lastDateOfMonth(),
      x: setInterval(() => {
        this.countDownDate = this.lastDateOfMonth();
      }, 1000),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  mounted() {
    this.countDown();
  },
  methods: {
    lastDateOfMonth() {
      const year = new Date().getFullYear();
      const month = new Date().getMonth();

      return new Date(year, month + 1, 0);
    },
    countDown() {
      const now = new Date().getTime();
      const distance = this.countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;

      if (distance < 0) {
        clearInterval(this.x);
        document.querySelector(".timer").innerHTML = "EXPIRED";
      }
    },
  },
  watch: {
    countDownDate() {
      this.countDown();
    },
  },
};
</script>

<style>
.timer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  width: fit-content;
  gap: 20px;
}

.day,
.hour,
.minute,
.second,
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  animation: slide 1s ease-in-out;
  color: white;
  flex-direction: column;
}

.day,
.hour,
.minute,
.second {
  font-size: 50px;
  flex: 1;
  min-width: 110px;
}

.day span,
.hour span,
.minute span,
.second span {
  font-size: 20px;
  font-weight: normal;
  margin-top: 10px;
}

.title {
  width: 100%;
  padding: 15px;
  font-size: 20px;
  text-align: center;
}

.timer__row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
}
</style>
