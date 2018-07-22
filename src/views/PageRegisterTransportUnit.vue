<template>
  <BcPageBase 
    title="Cadastrar Pacote"
    class="page page-home">

    <template slot="content">
      <form class="form">
        <b-field label="Dados do Pacote:">
          <b-input 
            type="textarea"
            rows="10"
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

        <b-field>
            <div id="demo"></div>
          </b-field>
        <b-field 
          v-if="!!responseJSON"
          label="Resposta">          
          <b-field label="Dados do Pacote:">            
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

    var sample={
        "$class": "org.logistic.network.CreateTransportUnit",
        "transporter": "Correios",
        "insurance": "none",
        "logistic_operator": "none",
        "cte_xml_base64": "xml_content",
        "cte_key": "none",
        "mdfe_xml_base64": "xml_content",
        "mdfe_key": "none",
        "other": "Descrição do pedido",
        "weight": 0,
        "proof_of_theft_base64": "base64",
        "destinator": {
          "$class": "org.logistic.network.Address",
          "first_name": "Carlos",
          "last_name": "Francisco",
          "email": "carlos.francisco@intelipost.com",
          "phone": "",
          "cellphone": "",
          "is_company": "false",
          "federal_tax_payer_id": "",
          "country": "",
          "state": "",
          "city": "",
          "address": "Av. Antártica",
          "number": "",
          "neighborhood": "",
          "reference": "",
          "additional": "",
          "zip": ""
        },
        "dimensions": {
          "$class": "org.logistic.network.Dimensions",
          "L": 0,
          "H": 0,
          "W": 0
        },
        "proof_of_delivery": {
          "$class": "org.logistic.network.ProofOfDelivery",
          "url": "",
          "proof_base64": "",
          "name": "",
          "rg": ""
        },
        "insurance_validation": {
          "id": "",
          "$class": "org.logistic.network.InsuranceValidation",
          "receive_base64": ""
        },
        "collect_insurance_document": {
          "$class": "org.logistic.network.CollectInsuranceDocument",
          "document_base64": ""
        },
        "proof_of_insurance_contract": {
          "$class": "org.logistic.network.ProofOfInsuranceContract",
          "response": true,
          "message": ""
        },
        "insurance_claim_approved": {
          "$class": "org.logistic.network.InsuranceClaimApproved",
          "response": true,
          "message": ""
        },
        "status_detail": {
          "$class": "org.logistic.network.StatusDetail",
          "event_date": "",
          "transporter_code": "",
          "transporter_message": "",
          "latitude": "",
          "longitude": ""
        }
      };
    sample = JSON.stringify(sample, null, 4);

    return {
      isLoading: false,
      transportUnitJSON: sample,
      responseJSON: null,
    };
  },
  methods: {
    sendTransportUnit() {       

        this.isLoading = true;

      axios.post('http://10.100.22.118:8080/transportUnit', JSON.parse(this.transportUnitJSON))
        .then(res => {
          if (res.status === 200) {
            console.log(res);

            this.$toast.open({
              message: 'Pacote cadastrado com sucesso!',
              type: 'is-success',
              position: 'is-bottom',
            });

            $("#demo").barcode(
                res.data.id, // Value barcode (dependent on the type of barcode)
                "code128" // type (string)
            );

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
