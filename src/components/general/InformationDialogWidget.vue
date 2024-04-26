<template>
  <div
    class="info-dialog-widget"
    id="info-dialog"
    :class="{
      show: show,
      hide: show,
    }"
  >
    <div class="info-dialog-container">
      <div class="info-dialog-container-text">
        <div v-if="id === 'e-NPS'">
          <span>e-NPS</span>

          <p>
            O e-NPS* (e = employee) analisa o quanto colaboradores (neste caso
            ex-colaboradores) recomendam a empresa em que trabalham, com base na
            pergunta: O quanto você recomendaria esta empresa para seus amigos e
            familiares trabalharem?
          </p>

          <p>Ex-colaboradores podem dar notas de 0 até 10:</p>

          <ul>
            <li>Quem dá nota de 0 até 6 é considerado detrator da marca</li>
            <li>Quem dá nota 7 ou 8 é considerado neutro</li>
            <li>Quem dá nota 9 ou 10 é considerado promotor da marca</li>
          </ul>

          <p>
            Depois de aplicado a metodologia de cálculo do e-NPS, temos o
            indicador que pode ir de -100 até 100 (ou de -10 até 10, ou -1 até
            1), e é separado em 4 categorias: crítica, de aperfeiçoamento, de
            qualidade e de excelência.
          </p>

          <ul>
            <li>-100 até 0: crítica</li>
            <li>0 até 50: de aperfeiçoamento</li>
            <li>50 até 75: de qualidade</li>
            <li>75 até 100: de excelência</li>
          </ul>
        </div>

        <div v-else-if="id === 'Risco Trabalhista'">
          <span>Risco Trabalhista</span>
          <p>
            Temos nossa própria metodologia de cálculo para este indicador, que
            avalia todas as respostas que impactam no risco trabalhista.
          </p>

          <p>
            O risco vai de 0 até 10, quanto mais próximo de 10, maior o risco
            trabalhista.
          </p>

          <p>
            Sempre fique de olho se o risco da sua empresa está menor ou maior
            que a média.
          </p>

          <p>Riscos acima de 4, também devem ter atenção maior.</p>
        </div>
        <div v-else-if="id === 'Marca'">
          <span>Risco de Marca Empregadora</span>

          <p>
            Temos nossa própria metodologia de cálculo para este indicador, que
            avalia todas as respostas que impactam no risco de marca.
          </p>

          <p>
            O risco vai de 0 até 10, quanto mais próximo de 10, maior o risco
            trabalhista.
          </p>

          <p>
            Sempre fique de olho se o risco da sua empresa está menor ou maior
            que a média.
          </p>

          <p>Riscos acima de 4, também devem ter atenção maior.</p>

          <p>
            Para a maioria das empresas, este risco costuma ser um pouco maior
            que o risco trabalhista.
          </p>
        </div>
        <div v-else-if="id === 'Realocados'">
          <span>Taxa de Recolocação </span>

          <p>Reflete o percentual das pessoas que foram recolocadas.</p>

          <p>
            Sempre que recebemos a informação do ex-colaborador sobre a
            recolocação, nós atualizamos este indicador.
          </p>

          <p>
            Quinzenalmente, também fazemos uma varredura no LinkedIn para ver os
            recolocados.
          </p>
        </div>

        <div v-else-if="id === 'Acolhidos'">
          <span>Taxa de Acolhimento</span>

          <p>
            Reflete o percentual das pessoas que foram demitidas, passaram pela
            etapa de acolhimento e já têm acesso à plataforma.
          </p>

          <p>
            [pessoas que passaram pelo acolhimento] / [pessoas que recebemos da
            empresa]
          </p>
        </div>
        <div v-else-if="id === 'Cálculos da rescisão estão corretos?'">
          <span>Cálculos da rescisão estão corretos?</span>

          <p>
            Reflete o percentual de pessoas que falaram que o cálculo de
            rescisão está correto.
          </p>

          <p>Quanto mais perto de 100%, melhor.</p>

          <p>
            Se este número for menor que 97%, é um ponto de atenção, visto que
            há pessoas que entendem que o cálculo está errado.
          </p>

          <p>Números abaixo de 97% podem indicar 2 situações:</p>

          <p>1) Que pode de fato haver erro no cálculo</p>
          <p>
            2) Que o cálculo está certo, mas pode precisar melhorar comunicação
            e transparência do cálculo (muito comum)
          </p>

          <p>
            Lembre-se: não basta pagar certo, é preciso mostrar que está pagando
            certo.
          </p>
        </div>
        <div v-else-if="id === 'Pendências Trabalhistas'">
          <span>Pendências Trabalhistas</span>

          <p>
            Reflete o percentual de pessoas que nos comunicaram alguma
            pendência, dúvida ou desconforto trabalhista.
          </p>

          <p>
            Este indicador não reflete se a pendência trabalhista é pertinente
            ou não, reflete apenas que houve a dúvida.
          </p>

          <p>
            Para 100% dos casos sinalizados como Pendências Trabalhistas, o time
            <a href="https://www.prepara.me/">Prepara.me</a> entra em contato
            para entender exatamente o que gerou o fato.
          </p>
        </div>
        <div v-else-if="id === 'Avaliação pós demissão'">
          <span>Avaliação pós demissão</span>

          <p>
            Reflete as notas individuais das respostas dadas pelos
            ex-colaboradores.
          </p>

          <p>Quanto mais próximo de 10, melhor!</p>

          <p>
            Através dessas notas, é possível avaliar várias frentes, como:
            respeito dentro da empresa, saúde mental, insalubridade, processo de
            demissão e pacotes de benefícios.
          </p>

          <p>
            Há duas formas de avaliar quais frentes precisam de mais atenção:
          </p>

          <p>1) Notas abaixo de 7</p>
          <p>2) Notas abaixo da média geral</p>
        </div>
        <div v-else-if="id === 'Mapa de sentimentos'">
          <span>Mapa de Sentimentos</span>

          <p>Reflete os sentimentos mais citados dos respondentes.</p>

          <p>
            Eles podem escolher (da lista pré-definida), quantos sentimentos
            quiserem, mesmo que sejam sentimentos contraditórios, afinal, em um
            processo de demissão cabem muitos sentimentos.
          </p>

          <p>
            Esses sentimentos trazem muitas informações, por isso é importante
            dar atenção a eles, especialmente se estiverem muito acima ou muito
            abaixo da média geral.
          </p>

          <p>Alguns exemplos:</p>

          <ul>
            <li>
              Se o sentimento de “surpresa” estiver muito acima da média, uma
              causa comum (mas não única) pode ser a falta de feedback.
            </li>
            <li>
              Se o sentimento de “tristeza – porque gostava muito da empresa”
              estiver muito abaixo da média, pode indicar uma possível falta de
              conexão entre ex-colaboradores e empresa. Isso é particularmente
              ruim se esta falta de conexão se estender para colaboradores que
              ainda estão na empresa.
            </li>
          </ul>
        </div>
      </div>

      <img
        src="~assets/icons/close.svg"
        alt=""
        width="20"
        height="20"
        @click="close"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextDialogWidget",
  data() {
    return {
      id: "",
      show: false,
    };
  },
  methods: {
    getText(id) {
      return this.infos.find((info) => info.id === id)?.text || "";
    },
    open(id) {
      this.id = id;
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
  mounted() {
    window.confirmDialog = this;
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

.info-dialog-widget {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgb(217 217 217 / 40%);
  backdrop-filter: blur(2px);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  visibility: hidden;
}

.info-dialog-widget.show {
  opacity: 1;
}

.hide {
  visibility: visible;
}

.info-dialog-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  width: 95%;
  max-width: 500px;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  position: relative;
}

.info-dialog-container img {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.info-dialog-container span {
  font-size: 20px;
  font-weight: 700;
  line-height: 20.29px;
  text-align: left;
  color: rgba(182, 61, 158, 1);
  font-family: "Inter", sans-serif;
  margin-bottom: 20px;
  display: block;
}

.info-dialog-container-text {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 10px 20px;
}

.row {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  padding: 10px 20px;
}

ul {
  list-style-type: none; /* Remove a numeração */
  padding: 0; /* Remove o padding padrão */
  margin: 0; /* Remove a margem padrão */
}

li:before {
  content: "•"; /* Adiciona um círculo antes de cada item */
  color: #000; /* Cor do círculo */
  font-weight: bold; /* Deixa o círculo em negrito */
  display: inline-block; /* Faz o círculo ficar na mesma linha do texto */
  width: 1em; /* Define a largura do círculo */
}
</style>
