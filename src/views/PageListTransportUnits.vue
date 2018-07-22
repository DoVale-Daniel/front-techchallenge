<template>
  <BcPageBase 
    title="Lista de Pacotes"
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
        :loading="isLoading">

        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="current_owner" label="Current Owner">
            {{ props.row.current_owner }}
          </b-table-column>

          <b-table-column field="insurance" label="Seguro">
            {{ props.row.insurance }}
          </b-table-column>

          <b-table-column field="actions" label="Ações">
            <button class="button is-primary">Detalhes</button>
          </b-table-column>

        </template>
      </b-table>
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
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 20,
      data: [],
    };
  },
  methods: {
    sendTransportUnit() {
      this.isLoading = true;

      axios.get('http://10.100.22.118:8080/transportUnit')
        .then(res => {
          if (res.status === 200) {
            console.log(res);

            this.data = res.data.map(item => {
              return {
                id: item.id,
                current_owner: item.current_owner,
                insurance: item.insurance,
              };
            });

            this.isLoading = false;
          }
        })
        .catch((e) => {
          console.log(e);

          this.$toast.open({
            message: 'Não foi possivel listar os Transport Units',
            type: 'is-danger',
            position: 'is-bottom',
          });

          this.isLoading = false;
        });
    },
  },
  created() {
    this.sendTransportUnit();
  },
  components: {
    BcField,
    BcPageBase,
  },
};
</script>
