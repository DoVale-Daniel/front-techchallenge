<template>
<section>
  <button class="button is-primary"
            @click="isCardModalActive = true; getDetail();">
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
                        {{ this.details}}
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
      isImageModalActive: false,
      isCardModalActive: false,
      isLoading: false,
      details: {}
    };
  },
  methods: {
    getDetail() {
      this.isLoading = true;

      axios
        .get(`http://129.213.89.112:3000/api/TransportUnit/${this.id}`)
        .then(res => {
          if (res.status === 200) {
            this.details = res.data;
            console.log(this.details);

            this.isLoading = false;
          }
        })
        .catch(e => {
          console.log(e);

          this.$toast.open({
            message: "Não foi possivel listar os detalhes desse Transport Unit",
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
