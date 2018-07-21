<template>
  <BcPageBase 
    title="Cadastrar Entregas"
    class="page page-home">

    <template slot="content">
      <form class="form">
        <b-field label="Dados da Entrega:">
          <b-input 
            type="textarea"
            v-model="transportUnitJSON" />
        </b-field>

        <b-field>
          <p class="control">
            <button 
              @click="sendTransportUnit" 
              class="button is-primary is-pulled-right"
              :class="{ 'is-loading': isLoading }">
              Enviar
            </button>
          </p>
        </b-field>

        <b-field 
          v-if="!!responseJSON"
          label="Resposta">
          <b-field label="Dados da Entrega:">
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
      transportUnitJSON: null,
      responseJSON: null,
    };
  },
  methods: {
    sendTransportUnit() {
      this.isLoading = true;

      axios.post('http://129.213.89.112:3000/api/CreateTransportUnit', JSON.parse(this.transportUnitJSON))
        .then(res => {
          if (res.status === 200) {
            console.log(res);

            this.$toast.open({
              message: 'Pacote cadastrado com sucesso!',
              type: 'is-success',
              position: 'is-bottom',
            });

            const {
              transport_unit,
              nfe_xml_base64,
              nfe_key,
              id,
            } = res.data;

            this.responseJSON = JSON.stringify({
              transport_unit: `resource:org.logistic.network.TransportUnit#${id}`,
              nfe_xml_base64,
              nfe_key,
            });

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
