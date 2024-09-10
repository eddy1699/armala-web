<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.name : null "
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="true"
      :paginated="paginated"
      :per-page="perPage"
      :data="info"
      default-sort="name"
      striped
      hoverable
    >
      <b-table-column
        v-slot="props"
        label="Nombre"
        field="Nombre"
        sortable
      >
        {{ props.row.name }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Apellidos"
        field="Apellidos"
        sortable
      >
        {{ props.row.lastname }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Tipo de documento"
        field="city"
        sortable
      >
        <p v-if="props.row.idType >3">
          DNI
        </p>
        <p v-else>
          Carnet de extranjeria
        </p>
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="N° de documento"
        field="N° de documento"
        sortable
      >
        {{ props.row.idNumber }}
      </b-table-column>
      <!-- <b-table-column
        v-slot="props"
        cell-class="is-progress-col"
        label="Progress"
        field="progress"
        sortable
      >
        <progress
          class="progress is-small is-info"
          :value="props.row.progress"
          max="100"
        >
          {{ props.row.progress }}
        </progress>
      </b-table-column> -->
      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div class="buttons is-right no-wrap">
          <router-link
            :to="{name:'client.edit', params: {id: props.row.id}}"
            class="button is-small is-info"
          >
            <b-icon
              icon="account-edit"
              size="is-small"
            />
          </router-link>
          <b-button
            type="is-danger"
            size="is-small"
            @click.prevent="trashModalOpen(props.row)"
          >
            <b-icon
              icon="trash-can"
              size="is-small"
            />
          </b-button>
        </div>
      </b-table-column>

      <section
        slot="empty"
        class="section"
      >
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon
              icon="emoticon-sad"
              size="is-large"
            />
          </p>
          <p>Cargando información&hellip;</p>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import ModalBox from '@/components/ModalBox.vue'
import axios from 'axios'
export default defineComponent({
  name: 'ClientsTableSample',
  components: { ModalBox },
  props: {
    checkable: Boolean,
    isEmpty: Boolean,
    perPage: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      checkedRows: [],
      isModalActive: false,
      trashObject: null,
      info: [],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'name',
          label: 'First Name'
        },
        {
          field: 'lastName',
          label: 'Last Name'
        },
        {
          field: 'gender',
          label: 'Gender'
        }
      ]
    }
  },
  computed: {
    paginated () {
      return this.clients.length > this.perPage
    },
    ...mapState([
      'clients'
    ])
  },
  created () {
    // this.makeRequest()
  },
  methods: {
    trashModalOpen (obj) {
      this.trashObject = obj
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false

      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    },
    async makeRequest () {
      const localStorageData = JSON.parse(localStorage.getItem('userData'))
      const token = localStorageData.token
      const response = await axios.get('https://localhost:7001/api/Client', {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.info = response.data.result
      console.log(this.info)
      return this.info
    }
  }
})
</script>
