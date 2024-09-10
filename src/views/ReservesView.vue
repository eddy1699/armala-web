<!-- eslint-disable new-cap -->
<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Reservas
      <!-- <router-link
        slot="right"
        to="/"
        class="button"
      >
        Dashboard
      </router-link> -->
      <b-button
        slot="right"
        label="Agregar nuevo ticket"
        type="is-info"
        @click="openModalAddNewClient"
      />
    </hero-bar>
    <section class="section is-main-section">
      <!-- <notification-bar class="is-info">
        <div>
          <b-icon
            icon="buffer"
            custom-size="default"
          />
          <b>Sorted and paginated table.</b>&nbsp;Based on Buefy's table.
        </div>
      </notification-bar> -->
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Reservas"
        icon="account-multiple"
      >
        <b-table
          :data="info"
          :striped="true"
        >
          <b-table-column
            v-slot="props"
            centered
            field="first_name"
            label="Código de reserva"
          >
            {{ props.row.lastname }}
          </b-table-column>

          <b-table-column
            v-slot="props"
            centered
            field="id"
            label="Pasajero"
            width=""
            numeric
          >
            {{ props.row.name + ' '+ props.row.lastname }}
          </b-table-column>
          <b-table-column
            v-slot="props"
            centered
            field="last_name"
            label="DNI de pasajero"
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
            centered
            field="first_name"
            label="N° de identificación "
          >
            {{ props.row.idNumber }}
          </b-table-column>
          <b-table-column
            v-slot="props"
            centered
            field="first_name"
            label="Fecha y hora de vuelo"
          >
            {{ new Date(props.row.birthDate).toLocaleString("en-GB") }}
          </b-table-column>
          <!-- <b-table-column
            v-slot="props"
            centered
            field="date"
            label="Date"
          >
            {{ new Date(props.row.birthDate).toLocaleDateString('en-GB') }}
          </b-table-column> -->

          <b-table-column
            v-slot="props"
            custom-key="actions"
            cell-class="is-actions-cell"
          >
            <div class="buttons is-right no-wrap">
              <b-button
                type="is-info"
                size="is-small"
                @click="viewClient(props.row.id)"
              >
                <b-icon
                  icon="pencil"
                  size="is-small"
                />
              </b-button>
              <b-button
                type="is-danger"
                size="is-small"
                @click.prevent="deleteClient(props.row.id)"
              >
                <b-icon
                  icon="trash-can"
                  size="is-small"
                />
              </b-button>
            </div>
          </b-table-column>

          <template #empty>
            <div class="has-text-centered" />
          </template>
        </b-table>
        <b-loading
          v-model="isLoading"
          :is-full-page="false"
          :can-cancel="false"
        >
          Cargando información
        </b-loading>
      </card-component>
      <b-pagination
        v-model="current"
        :total="totalRecords"
        order="is-centered"
        :simple="false"
        :rounded="false"
        :per-page="pageSize"
        icon-prev="chevron-left"
        icon-next="chevron-right"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      />
      <b-modal
        v-model="isCardModalActive"
        width="70%"
        scroll="clip"
      >
        <form action="">
          <div
            class="modal-card"
            style="width: auto"
          >
            <header class="modal-card-head">
              <p class="modal-card-title">
                Registro de nuevo ticket
              </p>
              <button
                type="button"
                class="delete"
                @click="$emit('close')"
              />
            </header>
            <section class="modal-card-body">
              <div class="columns is-mobile">
                <div class="column">
                  <b-field
                    horizontal
                    label="N° de ticket"
                  >
                    <b-input
                      v-model="client.name"
                      type="text"
                      maxlength="30"
                      required
                    />
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="Código de reserva"
                  >
                    <b-input
                      v-model="client.lastname"
                      type="text"
                      maxlength="30"
                      required
                    />
                  </b-field>
                </div>
              </div>
              <div class="columns is-mobile">
                <div class="column">
                  <b-field
                    horizontal
                    label="Tipo de documento"
                  >
                    <b-select
                      v-model="client.idType"
                      placeholder="Seleccione un tipo"
                      expanded
                      required
                    >
                      <option value="1">
                        DNI
                      </option>
                      <option value="2">
                        CE
                      </option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="N° de documento"
                  >
                    <b-input
                      v-model="client.idNumber"
                      type="text"
                      maxlength="15"
                      required
                    />
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-field
                    horizontal
                    label="Linea aerea"
                  >
                    <b-select
                      v-model="client.nationality"
                      placeholder="Seleccione un pais"
                      expanded
                      required
                    >
                      <option
                        v-for="nationality in nationalities"
                        :key="nationality.id"
                        :value="nationality.id"
                      >
                        {{ nationality.name }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="Fecha de vuelo"
                  >
                    <b-datepicker
                      v-model="client.birthDate"
                      locale="en-GB"
                      type="date"
                      placeholder="Click to select..."
                      icon="calendar-today"
                      position="is-bottom-left"
                      trap-focus
                    />
                  </b-field>
                </div>
              </div>
              <div class="columns is-mobile">
                <div class="column">
                  <b-field
                    horizontal
                    label="Género"
                  >
                    <b-select
                      v-model="client.gender"
                      placeholder="Seleccione un tipo"
                      expanded
                      required
                    >
                      <option value="1">
                        Masculino
                      </option>
                      <option value="2">
                        Femenino
                      </option>
                      <option value="3">
                        Prefiero no decir
                      </option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="Estado Civil"
                  >
                    <b-select
                      v-model="client.maritalStatus"
                      placeholder="Seleccione un tipo"
                      expanded
                    >
                      <option value="1">
                        Soltero/a
                      </option>
                      <option value="2">
                        Casado/a
                      </option>
                      <option value="3">
                        Divorciado/a
                      </option>
                      <option value="4">
                        Viudo/a
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
              <div class="columns is-mobile">
                <div class="column is full">
                  <b-field
                    horizontal
                    label="Email"
                  >
                    <b-input
                      v-model="client.email"
                      type="email"
                      maxlength="30"
                      required
                    />
                  </b-field>
                </div>
                <div class="column" />
              </div>
              <div class="columns is-mobile">
                <div class="column">
                  <b-field
                    horizontal
                    label="Teléfono Fijo"
                  >
                    <b-input
                      v-model="client.phoneNumber"
                      type="text"
                      maxlength="30"
                    />
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="Teléfono Movil"
                  >
                    <b-input
                      v-model="client.cellphoneNumber"
                      type="text"
                      maxlength="30"
                      required
                    />
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-field
                    horizontal
                    label="Dirección"
                  >
                    <b-input
                      v-model="client.address"
                      required
                      type="text"
                      maxlength="30"
                    />
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="N°"
                  >
                    <b-input
                      v-model="client.addressNumber"
                      type="text"
                      maxlength="30"
                      required
                    />
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="Tipo de vivienda"
                  >
                    <b-select
                      v-model="client.addressType"
                      placeholder="Seleccione un tipo"
                      expanded
                    >
                      <option value="1">
                        Departamento
                      </option>
                      <option value="2">
                        Casa
                      </option>
                      <option value="3">
                        Condominio
                      </option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="N° de interior"
                  >
                    <b-input
                      v-model="client.indoorNumber"
                      type="text"
                      maxlength="30"
                    />
                  </b-field>
                </div>
              </div>
              <div class="columns is-mobile">
                <div class="column">
                  <b-field
                    horizontal
                    label="Pais"
                  >
                    <b-select
                      v-model="client.country"
                      placeholder="Seleccione un pais"
                      expanded
                      required
                    >
                      <option
                        v-for="country in countries"
                        :key="country.id"
                        :value="country.id"
                      >
                        {{ country.name }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="Departamento"
                  >
                    <b-select
                      v-model="client.state"
                      placeholder="Seleccione un departamento o estado"
                      expanded
                      :disabled="inputStateActive==false"
                    >
                      <option
                        v-for="state in states"
                        :key="state.id"
                        :value="state.id"
                      >
                        {{ state.name }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="Provincia"
                  >
                    <b-select
                      v-model="client.province"
                      :disabled="inputProvinceActive==false"
                      expanded
                    >
                      <option
                        v-for="province in provinces"
                        :key="province.id"
                        :value="province.id"
                      >
                        {{ province.name }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="Distrito"
                  >
                    <b-select
                      v-model="client.district"
                      :disabled="inputDistrictActive==false"
                      expanded
                    >
                      <option
                        v-for="district in districts"
                        :key="district.id"
                        :value="district.id"
                      >
                        {{ district.name }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column">
                  <b-field
                    horizontal
                    label="Código postal"
                  >
                    <b-input
                      v-model="client.postalCode"
                      type="text"
                      maxlength="30"
                    />
                  </b-field>
                </div>
              </div>
              <!-- <div class="columns is-mobile">
                <div class="column">
                  <div class="field is-grouped is-grouped-right">
                    <p class="control">
                      <a
                        class="button is-primary"
                        @click="createNewClient"
                      >
                        Crear
                      </a>
                    </p>
                    <p class="control">
                      <a class="button is-light">
                        Cancelar
                      </a>
                    </p>
                  </div>
                </div>
              </div> -->
            </section>
            <footer class="modal-card-foot">
              <div class="column">
                <div class="field is-grouped is-grouped-right" />
              </div>
              <b-button
                label="Cancelar"
                @click="$emit('close')"
              />
              <b-button
                v-show="createButton"
                label="Crear"
                type="is-primary"
                @click="createNewClient"
              />
              <b-button
                v-show="updateButton"
                label="Actualizar"
                type="is-primary"
                @click="updateClient"
              />
            </footer>
          </div>
        </form>
        <!-- <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">
                  Agregar Nuevo Cliente
                </p>
              </div>
            </div>
            <hr>
            <div class="content">
            </div>
          </div>
        </div> -->
        <b-loading
          v-model="isLoadingModal"
          :is-full-page="false"
          :can-cancel="false"
        >
          Cargando información
        </b-loading>
      </b-modal>
      <!-- <hr> -->

      <!-- <notification-bar class="is-info">
        <div>
          <b-icon
            icon="buffer"
            custom-size="default"
          />
          <b>Tightly wrapped</b> &mdash; table header becomes card header
        </div>
      </notification-bar> -->

      <!-- <card-component class="has-table has-mobile-sort-spaced">
        <clients-table-sample
          checkable
        />
      </card-component>

      <hr> -->

      <!-- <notification-bar class="is-info">
        <div>
          <b-icon
            icon="buffer"
            custom-size="default"
          />
          <b>Empty table.</b> When there's nothing to show
        </div>
      </notification-bar> -->

      <!-- <card-component class="has-table has-thead-hidden">
        <clients-table-sample is-empty />
      </card-component> -->
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import NotificationBar from '@/components/NotificationBar.vue'
// import ClientsTableSample from '@/components/ClientsTableSample.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import backendURL from '@/url'

import { mapState } from 'vuex'
import axios from 'axios'
import { name } from 'lodash/find'
import * as chartConfig from '@/components/Charts/chart.config.js'
export default defineComponent({
  name: 'TablesView',
  components: {
    HeroBar,
    TitleBar,
    CardComponent
    // ClientsTableSample
    // NotificationBar
  },
  data () {
    return {
      checkable: Boolean,
      isEmpty: Boolean,
      perPage: {
        type: Number,
        default: 10
      },
      isLoading: true,
      isLoadingModal: false,
      checkedRows: [],
      isModalActive: false,
      trashObject: null,
      info: [],
      nationalities: [],
      countries: [],
      titleStack: ['Gestión', 'Reservas'],
      isCardModalActive: false,
      pageNumber: null,
      pageSize: 10,
      current: 1,
      totalRecords: null,
      states: [],
      provinces: [],
      districts: [],
      client: {
        name: null,
        lastname: null,
        idType: null,
        idNumber: null,
        birthDate: new Date(),
        nationality: null,
        maritalStatus: null,
        gender: null,
        address: null,
        addressNumber: null,
        addressType: null,
        indoorNumber: null,
        district: null,
        province: null,
        state: null,
        country: null,
        postalCode: null,
        phoneNumber: null,
        cellphoneNumber: null,
        email: null

      },
      inputStateActive: false,
      inputProvinceActive: false,
      inputDistrictActive: false,
      updateButton: false,
      createButton: true
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
  watch: {
    'client.country': function () {
      this.loadStates(this.client.country)
    },
    'client.state': function () {
      this.loadProvinces(this.client.state)
    },
    'client.province': function () {
      this.loadDistricts(this.client.province)
    },
    current: function () {
      console.log('old', this.pageNumber)
      this.loadClients()
      console.log('new', this.pageNumber)
    }
  },
  created () {
    this.loadClients()
    this.loadNationalities()
    this.loadCountries()
  },
  methods: {
    openModalAddNewClient () {
      this.updateButton = false
      this.createButton = true
      this.isCardModalActive = true
      this.client.name = ''
      this.client.lastname = ''
      this.client.idType = ''
      this.client.idNumber = ''
      this.client.birthDate = new Date()
      this.client.nationality = ''
      this.client.maritalStatus = ''
      this.client.gender = ''
      this.client.address = ''
      this.client.addressNumber = ''
      this.client.addressType = ''
      this.client.indoorNumber = ''
      this.client.district = ''
      this.client.province = ''
      this.client.state = ''
      this.client.country = ''
      this.client.postalCode = ''
      this.client.phoneNumber = ''
      this.client.cellphoneNumber = ''
      this.client.email = ''
    },
    async viewClient (id) {
      this.updateButton = true
      this.createButton = false
      this.isLoadingModal = true
      this.isCardModalActive = true
      console.log(`Cliente ver${id}`)
      const localStorageData = JSON.parse(localStorage.getItem('userData'))
      const token = localStorageData.token
      const response = await axios.get(`${backendURL}/api/Client/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const clienJson = response.data.result
      this.client.id = clienJson.id
      this.client.name = clienJson.name
      this.client.email = clienJson.email
      this.client.lastname = clienJson.lastname
      this.client.idNumber = clienJson.idNumber
      this.client.indoorNumber = clienJson.indoorNumber
      this.client.idType = clienJson.idType
      this.client.idNumber = clienJson.idNumber
      this.client.birthDate = new Date(clienJson.birthDate)
      this.client.nationality = clienJson.idNationality
      this.client.maritalStatus = clienJson.maritalStatus
      this.client.gender = clienJson.gender
      this.client.address = clienJson.address
      this.client.addressNumber = clienJson.addressNumber
      this.client.addressType = clienJson.addressType
      this.client.indoorNumber = clienJson.indoorNumber
      this.client.country = clienJson.idCountry
      this.client.state = clienJson.state
      this.client.province = clienJson.province
      this.client.district = clienJson.district
      this.client.postalCode = clienJson.postalCode
      this.client.phoneNumber = clienJson.phoneNumber
      this.client.cellphoneNumber = clienJson.cellphoneNumber
      this.isLoadingModal = false
    },
    async updateClient () {
      console.log('Edgardo', this.client.id)
      if (this.validateIfFieldsFilled()) {
        const localStorageData = JSON.parse(localStorage.getItem('userData'))
        const token = localStorageData.token
        const response = await axios.put(`${backendURL}/api/Client/${this.client.id}`, {
          id: this.client.id,
          name: this.client.name,
          lastname: this.client.lastname,
          email: this.client.email,
          idType: this.client.idType,
          idNumber: this.client.idNumber,
          birthDate: this.client.birthDate,
          idNationality: this.client.nationality,
          maritalStatus: this.client.maritalStatus,
          gender: this.client.gender,
          address: this.client.address,
          addressNumber: this.client.addressNumber,
          addressType: this.client.addressType,
          indoorNumber: this.client.indoorNumber,
          district: this.client.district,
          province: this.client.province,
          state: this.client.state,
          idCountry: this.client.country,
          postalCode: this.client.postalCode,
          phoneNumber: this.client.phoneNumber,
          cellphoneNumber: this.client.cellphoneNumber
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response.data)
        if (response.data.isSuccess) {
          this.$swal.fire('Actualizado!', '', 'success')
          this.loadClients()
          this.isCardModalActive = false
        } else {
          this.$swal.fire('Hubo un error en el registro', `${response.data.errorMessages}`, 'Revisar')
        }
      }
    },
    async loadClients () {
      console.log('hola')
      this.isLoading = true
      const localStorageData = JSON.parse(localStorage.getItem('userData'))
      const token = localStorageData.token
      this.pageNumber = this.current
      const response = await axios.get(`${backendURL}/api/Client?PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.totalRecords = response.data.totalRecords
      this.current = this.pageNumber
      this.info = response.data.result

      this.isLoading = false
      return this.info
    },
    async createNewClient () {
      if (this.validateIfFieldsFilled()) {
        const localStorageData = JSON.parse(localStorage.getItem('userData'))
        const token = localStorageData.token
        const response = await axios.post(`${backendURL}/api/Client`, {
          name: this.client.name,
          lastname: this.client.lastname,
          email: this.client.email,
          idType: this.client.idType,
          idNumber: this.client.idNumber,
          birthDate: this.client.birthDate,
          idNationality: this.client.nationality,
          maritalStatus: this.client.maritalStatus,
          gender: this.client.gender,
          address: this.client.address,
          addressNumber: this.client.addressNumber,
          addressType: this.client.addressType,
          indoorNumber: this.client.indoorNumber,
          district: this.client.district,
          province: this.client.province,
          state: this.client.state,
          idCountry: this.client.country,
          postalCode: this.client.postalCode,
          phoneNumber: this.client.phoneNumber,
          cellphoneNumber: this.client.cellphoneNumber
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response.data)
        if (response.data.isSuccess) {
          this.$swal.fire('Guardado!', '', 'success')
          this.loadClients()
          this.isCardModalActive = false
        } else {
          this.$swal.fire('Hubo un error en el registro', `${response.data.errorMessages}`, 'Revisar')
        }
      }
      // eslint-disable-next-line new-cap
      // this.$swal.fire({
      //   icon: 'success',
      //   title: 'Your work has been saved',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
    },
    async deleteClient (id) {
      const confirmation = await this.confimDeleteClient()
      if (confirmation) {
        const localStorageData = JSON.parse(localStorage.getItem('userData'))
        const token = localStorageData.token
        const response = await axios.delete(`${backendURL}/api/Client/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.loadClients()
      }

      // return response
    },
    async confimDeleteClient () {
      let request
      await this.$swal.fire({
        title: 'Desea eliminar este cliente?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          request = true
          this.$swal.fire('Cliente eliminado?', '', 'Ok')
          // if (response.data.isSuccess) { this.$swal.fire('Cliente eliminado!', '', 'success') }
        } else if (result.isDenied) {
          request = false
          this.$swal.fire('No se eliminó al cliente', '', 'info')
        }
      })
      console.log(request)
      return request
      // console.log('Eliminar cliente')
    },
    async loadNationalities () {
      console.log('Nacionalidades')
      const response = await axios.get(`${backendURL}/api/Nationality`)
      this.nationalities = response.data.result
      console.log(this.nationalities)
      return this.nationalities
    },
    async loadCountries () {
      console.log('Paises')
      const response = await axios.get(`${backendURL}/api/Country`)
      this.countries = response.data.result
      return this.countries
    },
    async loadStates (idCountry) {
      const response = await axios.get(`${backendURL}/api/State/${idCountry}`)
      this.states = response.data.result
      response.data.isSuccess ? this.inputStateActive = true : this.inputStateActive = false
      return this.states
    },
    async loadProvinces (idState) {
      const response = await axios.get(`${backendURL}/api/Province/${idState}`)
      this.provinces = response.data.result
      response.data.isSuccess ? this.inputProvinceActive = true : this.inputProvinceActive = false
      console.log(this.provinces)
      return this.provinces
    },
    async loadDistricts (idProvince) {
      const response = await axios.get(`${backendURL}/api/District/${idProvince}`)
      this.districts = response.data.result
      response.data.isSuccess ? this.inputDistrictActive = true : this.inputDistrictActive = false
      console.log(this.districts)
      return this.districts
    },
    async validateIfFieldsFilled () {
      if (this.client.name !== '' &&
      this.client.lastname !== '' &&
      this.client.idType !== '' &&
      this.client.idNumber !== '' &&
      this.client.birthDate !== '' &&
      this.client.nationality !== '' &&
      this.client.maritalStatus !== '' &&
      this.client.gender !== '' &&
      this.client.address !== '' &&
      this.client.addressNumber !== '' &&
      this.client.addressType !== '' &&
      this.client.indoorNumber !== '' &&
      this.client.district !== '' &&
      this.client.province !== '' &&
      this.client.state !== '' &&
      this.client.country !== '' &&
      this.client.postalCode !== '' &&
      this.client.phoneNumber !== '' &&
      this.client.cellphoneNumber !== '' &&
      this.client.email !== '') {
        return true
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Complete todos los datos',
          position: 'is-bottom',
          type: 'is-danger'
        })
        return false
      }
    }

  }
})
</script>
<style lang="scss">
@import "../scss/_theme-default";

        $pagination-color:$base-color
</style>
