<template>
  <div class="faq-details">
    <article class="faq-details-article">
      <section>
        <h1>Perguntas Frequentes</h1>
        <div class="faq-list">
          <div class="faq-list-item">
            <h2 class="faq-list-item-question">Como Funciona?</h2>
            <p class="faq-list-item-answer">Escolha qual(is) serviço(s) você deseja;</p>
            <p
              class="faq-list-item-answer"
            >Após selecionar, você poderá efetuar o pagamento da forma que desejar (no momento boleto ou cartão de crédito estao disponiveis);</p>
            <p
              class="faq-list-item-answer"
            >Após a confirmação do pagamento, adicione seu currículo e responda algumas perguntas para que a gente te conheça um pouco melhor - e assim possa te ajudar melhor;</p>
            <p
              class="faq-list-item-answer"
            >Um consultor de RH nosso avaliará seu currículo e/ou Linkedin, fará as correções e alterações necessárias e em no máximo 48 horas enviaremos seu currículo e/ou Linkedin reformulado de volta pra você;</p>
            <p
              class="faq-list-item-answer"
            >Se você estiver feliz com o resultado, é só finalizar o serviço e nos avaliar!</p>
            <p
              class="faq-list-item-answer"
            >Se tiver mais alguma(s) alteração(ões) a serem feitas, é só nos avisar na própria plataforma, que faremos a alteração em até 48 horas;</p>
            <p
              class="faq-list-item-answer"
            >Todo o processo é muito claro e você pode acompanhar tudo pelo site.</p>
          </div>
          <div class="faq-list-item">
            <h2 class="faq-list-item-question">O que é o serviço de Análise e Revisão de currículo?</h2>
            <p
              class="faq-list-item-answer"
            >Neste serviço nós analisamos cautelosamente e reconstruímos o seu currículo para que ele fique mais atraente para o recrutador, assim aumentando suas chances de fazer mais entrevistas de emprego.</p>
            <br>
            <p
              class="faq-list-item-answer"
            >Nós analisamos todos os detalhes para que seu currículo esteja coerente com as vagas que deseja se candidatar - desde formatação, gramática, ênfase até layout e descrições.</p>
          </div>
          <div class="faq-list-item">
            <h2 class="faq-list-item-question">O que é o serviço de Análise de LinkedIn?</h2>
            <p
              class="faq-list-item-answer"
            >Nossos consultores de RH analisam todos os campos do seu LinkedIn e enviam um documento com as alterações que devem ser feitas. Além disso, enviamos dicas de boas práticas para que o seu perfil tenha mais relevância e atenção na rede social.</p>
          </div>
          <div class="faq-list-item">
            <h2 class="faq-list-item-question">Preciso passar a senha do meu LinkedIn?</h2>
            <p
              class="faq-list-item-answer"
            >NÃO! Para a análise do seu LinkedIn, nós pediremos apenas o link do seu perfil, para que possamos vê-lo.</p>
            <br>
            <p
              class="faq-list-item-answer"
            >Faremos a análise e enviaremos as melhorias para você em um documento pdf. A partir daí, é só você copiar e colar as informações que te enviarmos nos campos corretos do LinkedIn, conforme nossa orientação detalhada.</p>
            <br>
            <p
              class="faq-list-item-answer"
            >Obs: Nunca entregue as senha do seu LinkedIn para outras pessoas, ela é só sua!</p>
          </div>
          <div class="faq-list-item">
            <h2 class="faq-list-item-question">Qual o prazo de resposta?</h2>
            <p
              class="faq-list-item-answer"
            >Em no máximo 48 horas você recebe seu currículo e/ou LinkedIn analisados.</p>
          </div>
          <div class="faq-list-item">
            <h2 class="faq-list-item-question">E se eu não tiver condições para pagar os serviços?</h2>
            <p
              class="faq-list-item-answer"
            >Se você recebe ou recebeu no seu último emprego um salário de até R$1.500, nós fazemos um trabalho voluntário e totalmente gratuito há mais de um ano chamado Revisores do Bem. Nos envie seu currículo e conte sua história, que te responderemos em até 30 dias (o prazo é maior pois temos muita procura e nossos voluntários disponibilizam tempo livre para esse projeto).</p>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
  export default {
    created() {
      window.scrollTo(0, 0);
    }
  };
</script>

<style>
  .faq-details-article {
    width: 100%;
  }

  .faq-details-article section{
    width: 80%;
    margin: 20px auto;
  }

  .faq-details-article h1{
    font-size: 3rem;
    font-family: "Nunito", sans-serif;
    color: #0922bc;
    font-weight: bold;
  }

  .faq-details-article h2{
    font-size: 2rem;
    font-weight: bold;
    text-align: justify;
    font-family: "Nunito", sans-serif;
    color: #667998;
  }

  .faq-details-article p{
    text-align: justify;
    font-family: "Nunito", sans-serif;
    font-size: 1.1rem;
    font-weight: 100;
  }

</style>
