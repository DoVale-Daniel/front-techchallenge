<template>
  <BcPageBase 
    title="Cadastrar Entregas"
    class="page page-home">

    <template slot="content">
      <form class="form">
        <b-field label="Dados da Entrega:">
          <b-input type="textarea"></b-input>
        </b-field>

        <b-field>
          <p class="control">
            <button 
              type="submit" 
              class="button is-primary is-pulled-right">
              Enviar
            </button>
          </p>
        </b-field>
      </form>
    </template>

  </BcPageBase>
</template>

<script>
// @ is an alias to /src
import BcField from '@/components/BcField.vue'
import BcPageBase from '@/components/BcPageBase.vue'

export default {
  name: 'PageRegisterTransportUnit',
  components: {
    BcField,
    BcPageBase,
  }
}
</script>
