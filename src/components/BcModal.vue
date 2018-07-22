<template>
<section>
  <button class="button is-success"
            @click="isCardModalActive = true; sendInvoice();">
            {{label}}
  </button>
  <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-12">Detalhes</p>
                        </div>
                    </div>

                    <div class="content">
                        {{ this.responseJSON }}
                    </div>
                </div>
            </div>
        </b-modal>
</section>
</template>

<script>
import axios from "axios";
export default {
  name: "BcModal",
  props: {
    label: String,
    id: String
  },
  data() {
    return {
      isLoading: false,
      responseJSON: null
    };
  },
  methods: {
    sendInvoice() {
      this.isLoading = true;
      const invoiceJSON = {
        "nfe_xml_base64": "PD9waHAKcGhwaW5mbygpOwo=",
        "nfe_key": "abcIntelipost1"
      }
      axios
        .post(
          "http://10.100.22.118:8080/transportUnit/" +
            this.id +
            "/invoice",
          invoiceJSON
        )
        .then(res => {
          if (res.status === 200) {
            console.log(res);

            this.$toast.open({
              message: "Nota fiscal inserida com sucesso!",
              type: "is-success",
              position: "is-bottom"
            });

            this.responseJSON = JSON.stringify(res.data);
            this.isLoading = false;
          }
        })
        .catch(e => {
          console.log(e);

          this.$toast.open({
            message: "Não foi possivel inserir a nota fiscal.",
            type: "is-danger",
            position: "is-bottom"
          });

          this.isLoading = false;
        });
    }
  },
  created() {}
};
</script>
