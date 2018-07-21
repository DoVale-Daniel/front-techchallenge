<template>
  <BcPageBase 
    title="Cadastrar Notas Fiscais"
    class="page page-home">

    <template slot="content">
      <form class="form">
        <b-field label="Dados da NF:">
          <b-input 
            type="textarea"
            v-model="invoiceJSON" />
        </b-field>

        <b-field>
          <p class="control">
            <button 
              @click="sendInvoice" 
              class="button is-primary is-pulled-right"
              :class="{ 'is-loading': isLoading }">
              Enviar
            </button>
          </p>
        </b-field>

        <b-field 
          v-if="!!responseJSON"
          label="Resposta">
          <b-field label="Dados da NF:">
            <b-input 
              type="textarea"
              v-model="responseJSON" 
              readonly/>
          </b-field>
        </b-field>
      </form>

    </template>

  </BcPageBase>
</template>

<script>
import axios from 'axios';

import BcField from '@/components/BcField.vue'
import BcPageBase from '@/components/BcPageBase.vue'

export default {
  name: 'PageRegisterTransportUnit',
  data() {
    return {
      isLoading: false,
      invoiceJSON: null,
      responseJSON: null,
    };
  },
  methods: {
    sendInvoice() {
      this.isLoading = true;

      axios.post('http://129.213.89.112:3000/api/AddNfe', JSON.parse(this.invoiceJSON))
        .then(res => {
          if (res.status === 200) {
            console.log(res);

            this.$toast.open({
              message: 'Pacote cadastrado com sucesso!',
              type: 'is-success',
              position: 'is-bottom',
            });

            this.responseJSON = JSON.stringify(res.data);
            this.isLoading = false;
          }
        })
        .catch((e) => {
          console.log(e);

          this.$toast.open({
            message: 'Não foi possivel cadastrar o seu pacote',
            type: 'is-danger',
            position: 'is-bottom',
          });

          this.isLoading = false;
        });
    },
  },
  components: {
    BcField,
    BcPageBase,
  },
};
</script>
