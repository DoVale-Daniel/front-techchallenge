<template>
  <BcPageBase 
    class="page page-home">

    <b-field grouped group-multiline>
      <b-select v-model="defaultSortDirection">
        <option value="asc">Default sort direction: ASC</option>
        <option value="desc">Default sort direction: DESC</option>
      </b-select>
      <b-select v-model="perPage">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
      </b-select>
    </b-field>

    <template slot="content">
      <b-table 
        :data="data"
        :paginated="true"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :default-sort-direction="defaultSortDirection"
        default-sort="data.id"
        :loading="isLoading"
        :opened-detailed="defaultOpenedDetails"
        detailed
        detail-key="id"
        >

        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" sortable numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="currentOwner" label="Current Owner">
            {{ props.row.currentOwner | currentOwnerFilter}}
          </b-table-column>

          <b-table-column field="status" label="Status">
            {{ props.row.status }}
          </b-table-column>

          <b-table-column field="nfeKey" label="NFE">
            {{ props.row.nfe_key}}
          </b-table-column>

          <b-table-column field="actions" label="Ações">
            <button class="button is-success"
                @click="sendInvoice(props.row.id);">
                Gerar NF
            </button>
          
          </b-table-column>

        </template>
         <template slot="detail" slot-scope="props">
            <article class="media">
                <div class="media-content">
                    <div class="columns">
                      <div class="column">
                      <b>Endereço</b>
                      <p>
                          First Name: {{props.row.destinator.first_name}}
                      </p>
                      <p>
                          Last Name: {{props.row.destinator.last_name}}
                      </p>
                      <p>
                          Email: {{props.row.destinator.email}}
                      </p>
                      <p>
                          Address: {{props.row.address}}
                      </p>      
                    </div>
                    <div class="column">
                      <b>Dimensões</b>
                        <p>
                            Height: {{props.row.dimensions.H}}
                        </p>
                        <p>
                            Width: {{props.row.dimensions.W}}
                        </p>
                        <p>
                            Length: {{props.row.dimensions.L}}
                        </p>
                    </div>
                    </div>
                </div>
            </article>
        </template>
      </b-table>
    </template>

  </BcPageBase>
</template>

<script>
import axios from "axios";
import moment from "moment";

import BcField from "@/components/BcField.vue";
import BcPageBase from "@/components/BcPageBase.vue";

export default {
  name: "PageRegisterTransportUnit",
  data() {
    return {
      isLoading: false,
      transportUnitJSON: null,
      responseJSON: null,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      currentPage: 1,
      perPage: 10,
      data: []
    };
  },
  methods: {
    sendTransportUnit() {
      this.isLoading = true;

      axios
        .get("http://10.100.22.118:8080/transportUnit")
        .then(res => {
          if (res.status === 200) {
            console.log(res);

            res.data = res.data.sort(function(a, b) {
              var x = a["id"];
              var y = b["id"];
              return x < y ? 1 : x > y ? -1 : 0;
            });

            this.data = res.data.map(item => {
              return {
                id: item.id,
                status: item.status,
                created: item.timestamp,
                nfe_key: item.nfe_key,
                destinator: item.destinator,
                dimensions: item.dimensions,
                currentOwner: item.current_owner
              };
            });

            this.isLoading = false;
          }
        })
        .catch(e => {
          console.log(e);

          this.$toast.open({
            message: "Não foi possivel listar os Transport Units",
            type: "is-danger",
            position: "is-bottom"
          });

          this.isLoading = false;
        });
    },
    sendInvoice(id) {
      this.isLoading = true;
      const invoiceJSON = {
        "nfe_xml_base64": "PD9waHAKcGhwaW5mbygpOwo=",
        "nfe_key": "abcIntelipost1"
      }
      axios
        .post(
          "http://10.100.22.118:8080/transportUnit/" +
            id +
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

            // this.responseJSONF = JSON.stringify(res.data);
            this.sendTransportUnit();
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
  created() {
    this.sendTransportUnit();
  },
  components: {
    BcField,
    BcPageBase
  },
  filters: {
    date: date => {
      if (!date) return "";
      date = moment(date).format("DD/MM/YYYY HH:mm");
      return date;
    },
    currentOwnerFilter: owner => {
      if (!owner) return "";
      owner = owner.split("#")[1];
      return owner;
    }
  }
};
</script>
