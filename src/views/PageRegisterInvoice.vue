<template>
  <BcPageBase 
    title="Cadastrar Notas Fiscais"
    class="page page-invoice">

    <template slot="content">
      <form class="form">
        <b-field label="Dados da NF:">
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
import BcPageBase from '@/components/BcPageBase.vue'

export default {
  name: 'PageRegisterInvoice',
  components: {
    BcPageBase
  }
}
</script>
