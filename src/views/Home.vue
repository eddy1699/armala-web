<!-- eslint-disable new-cap -->
<template>
  <div>
    <!-- <title-bar :title-stack="titleStack" /> -->
    <hero-bar>
      Bienvenido
      <!-- <router-link
        slot="right"
        to="/"
        class="button"
      >
        Dashboard
      </router-link> -->
      <b-button
        slot="right"
        label="Armar un partido"
        type="is-info"
        @click="openModalAddNewClient"
      />
    </hero-bar>
    <section class="section is-main-section">
      <div class="columns is-multiline is-desktop">
        <div
          v-for="(matches, index) in matchArray"
          :key="index"
          class="column is-one-quarter"
        >
          <!-- <div class="card" @click="openModalAddNewClient">
            <div class="card-content">
              <div class="content">

                <p>Pichanga el {{ new Date(matches.matchDate).toLocaleDateString('en-GB')}}</p>
                <div>

                </div>
                <b-tag type="is-warning">Warning</b-tag>
                <p>En {{ matches.place}}</p>
                <p>A las {{ new Date(matches.startHour).getHours() }}:{{ new Date(matches.startHour).getMinutes() }}</p>
                <div><img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDQoj9PhSQgs91v6mPY-Xz5eGwyUZfRjMwWqLd4GnM7EszpCiSWM8_Pumruq8TrJJxfRw&usqp=CAU"
                    class="" alt=""></div>
              </div>
              <b-button type="is-primary">Primary</b-button>
            </div>
          </div> -->
          <div class="card">
            <div class="card-image">
              <figure class="image is-2by1">
                <img
                  src="https://universitario.pe/media/uploads/2020/07/02/nw_i_monu04-1.jpg"
                  alt="Placeholder image"
                >
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <!-- <p>{{ matches.id }}</p> -->
                  <p class="title is-4">
                    Pichanga el
                    {{
                      new Date(matches.matchDate).toLocaleDateString("en-GB")
                    }}
                  </p>
                  <p class="subtitle is-6">
                    Horario: {{ new Date(matches.startHour).getHours() }}:{{
                      new Date(matches.startHour).getMinutes()
                    }} - {{ new Date(matches.endHour).getHours() }}:{{
                      new Date(matches.endHour).getMinutes()
                    }}
                  </p>
                </div>
              </div>

              <div class="content">
                <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
                <a href="#">#responsive</a>
                <br />
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
                <b-tag
                  v-if="matches.playersPaid>=matches.numberPlayer"
                  type="is-success"
                >
                  Han pagado {{ matches.playersPaid }} de {{ matches.numberPlayer }}
                </b-tag>
                <b-tag
                  v-else-if="matches.playersPaid>=matches.numberPlayer*0.5"
                  type="is-warning"
                >
                  Han pagado {{ matches.playersPaid }} de {{ matches.numberPlayer }}
                </b-tag>
                <b-tag
                  v-else
                  type="is-danger"
                >
                  Han pagado {{ matches.playersPaid }} de {{ matches.numberPlayer }}
                </b-tag>

                <!-- <b-tag type="is-danger">Han pagado 8 de 10</b-tag>

                <b-tag type="is-warning">Han pagado 3 de 10</b-tag> -->
              </div>

              <div class="buttons">
                <b-button
                  class="is-info"
                  @click="openModalSeePlayers(matches.id)"
                >
                  Ver convocados
                </b-button>
                <b-button
                  v-if="matches.createdBy==sessionUserId "
                  class="is-success"
                  @click="sendMoney"
                >
                  Cobrar
                </b-button>
                <b-button
                  class="is-success"
                  v-if="matches.createdBy!=sessionUserId "
                  @click="payQuote"
                >
                  Pagar cuota
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <notification-bar class="is-info">
        <div>armalafutbol2024.
          <b-icon
            icon="buffer"
            custom-size="default"
          />
          <b>Sorted and paginated table.</b>&nbsp;Based on Buefy's table.
        </div>
      </notification-bar> -->

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
              <h3 class="modal-card-title title is-3">
                Datos de tu pichanga
              </h3>
              <button
                type="button"
                class="delete"
                @click="$emit('close')"
              />
            </header>
            <section class="modal-card-body">
              <div class="columns is-mobile is-multiline">
                <div class="column">
                  <b-field label="Fecha">
                    <b-datepicker
                      v-model="match.dateMatch"
                      locale="en-GB"
                      type="date"
                      placeholder=""
                      icon="calendar-today"
                      position="is-bottom-left"
                      trap-focus
                    />
                  </b-field>
                  <b-field label="Lugar">
                    <b-input
                      v-model="match.place"
                      type="text"
                      maxlength="30"
                      required
                    />
                  </b-field>
                  <b-field label="Horario">
                    <b-timepicker
                      v-model="match.start"
                      placeholder="Empieza "
                      icon="clock"
                      editable
                      :enable-seconds="enableSeconds"
                      :hour-format="hourFormat"
                      :locale="locale"
                    />
                    <b-timepicker
                      v-model="match.end"
                      placeholder="Termina "
                      icon="clock"
                      editable
                      :enable-seconds="enableSeconds"
                      :hour-format="hourFormat"
                      :locale="locale"
                    />
                  </b-field>
                  <div class="column">
                    <img
                      src="../assets/field.png"
                      class=""
                      alt=""
                    >
                  </div>
                  <!-- <b-field label="Hasta">
                    <b-timepicker placeholder="" icon="clock" editable :enable-seconds="enableSeconds"
                      :hour-format="hourFormat" :locale="locale" v-model="match.end">
                    </b-timepicker>
                  </b-field>-->
                </div>

                <div class="column">
                  <b-field label="Precio de la cancha">
                    <b-input
                      v-model="match.price"
                      type="text"
                      maxlength="30"
                      required
                    />
                  </b-field>
                  <b-field label="Cantidad de jugadores">
                    <b-input
                      v-model="match.quantityPlayers"
                      type="text"
                      maxlength="30"
                      required
                    />
                  </b-field>
                  <b-field label="Cuota">
                    <b-input
                      v-model="match.quote"
                      type="text"
                      maxlength="30"
                      disabled
                    />
                  </b-field>
                  <b-field label="Servicio">
                    <b-input
                      v-model="match.commission"
                      type="text"
                      maxlength="30"
                      disabled
                    />
                  </b-field>
                </div>
                <!-- <div class="column">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/017/223/050/non_2x/football-soccer-field-and-soccer-ball-green-grass-realistic-3d-illustration-png.png"
                    class="" alt="">
                </div> -->
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
                @click="createNewMatch"
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
      </b-modal>
      <b-modal
        v-model="isCardModalActive2"
        :width="640"
        scroll="keep"
      >
        <div class="card">
          <div class="card-content">
            <div class="content">
              <b-table
                :data="isEmpty ? [] : players"
                :bordered="isBordered"
                :striped="isStriped"
                :narrowed="isNarrowed"
                :hoverable="isHoverable"
                :loading="false"
                :focusable="isFocusable"
                :mobile-cards="hasMobileCards"
              >
                <b-table-column
                  v-slot="props"
                  field="id"
                  label="#"
                  width="40"
                  :td-attrs="columnTdAttrs"
                  numeric
                >
                  {{ props.index+1 }}
                </b-table-column>

                <b-table-column
                  v-slot="props"
                  field="first_name"
                  label="Jugador"
                  :td-attrs="columnTdAttrs"
                >
                  {{ props.row.user.name }} {{ props.row.user.lastName }}
                </b-table-column>

                <b-table-column
                  v-slot="props"
                  field="date"
                  label="Estado de pago"
                  :th-attrs="dateThAttrs"
                  :td-attrs="columnTdAttrs"
                  centered
                >
                  <span
                    v-if="props.row.paymentStatus==0"
                    class="tag is-danger"
                  >
                    Pendiente
                  </span>
                  <span
                    v-if="props.row.paymentStatus==1"
                    class="tag is-success"
                  >
                    Pagado
                  </span>
                </b-table-column>
                <b-table-column
                  v-slot="props"
                  field="date"
                  label="Cuota"
                  :th-attrs="dateThAttrs"
                  :td-attrs="columnTdAttrs"
                  centered
                >
                  {{ props.row.match.quote }}
                </b-table-column>

                <template #empty>
                  <div class="has-text-centered">
                    No records
                  </div>
                </template>
              </b-table>
            </div>
            <p>Total de Jugadores </p>
            <p>Dinero recaudado {{ collected }}</p>
          </div>
        </div>
      </b-modal>
      <b-modal
        v-model="isPaymentModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Example Modal"
        close-button-aria-label="Close"
        aria-modal
      >
        <template #default="props">
          <render-elements
            v-bind="formProps"
            @close="props.close"
          />
        </template>
      </b-modal>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import NotificationBar from '@/components/NotificationBar.vue'
// import ClientsTableSample from '@/components/ClientsTableSample.vue'

import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import backendURL from '@/url'

import { mapState } from 'vuex'
import axios from 'axios'
import { name } from 'lodash/find'
import * as chartConfig from '@/components/Charts/chart.config.js'
import RenderElements from '@/components/RenderElements.vue'
const ModalForm = { props: ['email', 'password', 'canCancel'] }
export default defineComponent({
  name: 'Home',
  components: {
    HeroBar,
    // TitleBar,
    RenderElements
    // ClientsTableSample
    // NotificationBar
  },
  data () {
    return {
      formProps: {
        email: 'evan@you.com',
        password: 'testing'
      },
      sessionUserId: null,
      collectMoney: true,
      payQuoteButton: false,
      isPaymentModalActive: false,
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,

      hourFormat: undefined, // Browser locale
      locale: undefined,
      checkable: Boolean,
      // isEmpty: Boolean,
      perPage: {
        type: Number,
        default: 10
      },
      // isLoading: true,
      isLoadingModal: false,
      checkedRows: [],
      isModalActive: false,
      trashObject: null,
      info: [],
      nationalities: [],
      countries: [],
      titleStack: ['Gestión', 'Clientes'],
      isCardModalActive: false,
      isCardModalActive2: false,
      pageNumber: null,
      pageSize: 20,
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
      match: {
        dateMatch: new Date(),
        place: null,
        start: null,
        end: null,
        price: null,
        quantityPlayers: null,
        quote: null,
        matchCode: null,
        createdBy: null,
        commission: null
      },
      inputStateActive: false,
      inputProvinceActive: false,
      inputDistrictActive: false,
      updateButton: false,
      createButton: true,
      matchArray: [],
      enableSeconds: null,
      players: [],
      contador: 0,
      playersPaid: 0
    }
  },
  computed: {
    sampleFormat () {
      const dtf = new Intl.DateTimeFormat(this.locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: this.enableSeconds ? 'numeric' : undefined,
        // Fixes 12 hour display github.com/buefy/buefy/issues/3418
        hourCycle: this.hourFormat === '12' ? 'h12' : 'h23'
      })
      return dtf.format(new Date(2000, 12, 12, 22, 23, 24))
    },
    paginated () {
      return this.clients.length > this.perPage
    },
    ...mapState(['clients'])
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
    },
    'match.price': function () {
      this.calculateQuote()
    },
    'match.quantityPlayers': function () {
      this.calculateQuote()
    },
    'match.quote': function () {
      this.calculateCommission()
    }
  },
  created () {
    this.loadMatches()
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
    openModalSeePlayers (id) {
      this.isCardModalActive2 = true
      this.getPlayersByMatch(id)
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
        const response = await axios.put(
          `${backendURL}/api/Client/${this.client.id}`,
          {
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
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        console.log(response.data)
        if (response.data.isSuccess) {
          this.$swal.fire('Actualizado!', '', 'success')
          this.loadClients()
          this.isCardModalActive = false
        } else {
          this.$swal.fire(
            'Hubo un error en el registro',
            `${response.data.errorMessages}`,
            'Revisar'
          )
        }
      }
    },
    async loadClients () {
      console.log('hola')
      this.isLoading = true
      const localStorageData = JSON.parse(localStorage.getItem('userData'))
      const token = localStorageData.token
      this.pageNumber = this.current
      const response = await axios.get(
        `${backendURL}/api/Client?PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
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
        const response = await axios.post(
          `${backendURL}/api/Client`,
          {
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
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        console.log(response.data)
        if (response.data.isSuccess) {
          this.$swal.fire('Guardado!', '', 'success')
          this.loadClients()
          this.isCardModalActive = false
        } else {
          this.$swal.fire(
            'Hubo un error en el registro',
            `${response.data.errorMessages}`,
            'Revisar'
          )
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
      await this.$swal
        .fire({
          title: 'Desea eliminar este cliente?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Si',
          denyButtonText: 'No'
        })
        .then((result) => {
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
      response.data.isSuccess
        ? (this.inputStateActive = true)
        : (this.inputStateActive = false)
      return this.states
    },
    async loadProvinces (idState) {
      const response = await axios.get(`${backendURL}/api/Province/${idState}`)
      this.provinces = response.data.result
      response.data.isSuccess
        ? (this.inputProvinceActive = true)
        : (this.inputProvinceActive = false)
      console.log(this.provinces)
      return this.provinces
    },
    async loadDistricts (idProvince) {
      const response = await axios.get(
        `${backendURL}/api/District/${idProvince}`
      )
      this.districts = response.data.result
      response.data.isSuccess
        ? (this.inputDistrictActive = true)
        : (this.inputDistrictActive = false)
      console.log(this.districts)
      return this.districts
    },
    async validateIfFieldsFilled () {
      if (
        this.client.name !== '' &&
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
        this.client.email !== ''
      ) {
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
    },

    // MATCH FUNCTIONS

    async createNewMatch () {
      const codeGenerated = this.Str_Random(6)
      this.match.matchCode = codeGenerated
      console.log('PARTIDO', this.match)

      const localStorageData = JSON.parse(localStorage.getItem('userData'))
      const token = localStorageData.token
      const response = await axios.post(
        `${backendURL}api/Match`,
        {
          matchDate: this.match.dateMatch,
          startHour: this.match.start,
          endHour: this.match.end,
          numberPlayer: this.match.quantityPlayers,
          place: this.match.place,
          price: this.match.price,
          matchCode: this.match.matchCode,
          quote: this.match.quote,
          createdBy: JSON.parse(localStorage.getItem('userData')).user.id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      console.log(response.data)
      if (response.data.isSuccess) {
        this.$swal.fire('Pichanga registrada!', '', 'success')
        this.loadMatches()
        this.isCardModalActive = false
      } else {
        this.$swal.fire(
          'Hubo un error en el registro',
          `${response.data.errorMessages}`,
          'Revisar'
        )
      }

      // eslint-disable-next-line new-cap
      // this.$swal.fire({
      //   icon: 'success',
      //   title: 'Your work has been saved',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
    },
    Str_Random (length) {
      let result = ''
      const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

      // Loop to generate characters for the specified length
      for (let i = 0; i <= length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomInd)
      }
      return result
    },
    async loadMatches () {
      console.log('hola')
      this.isLoading = true
      const localStorageData = JSON.parse(localStorage.getItem('userData'))
      const token = localStorageData.token
      const userId = localStorageData.user.id
      this.pageNumber = this.current
      const response = await axios.get(
        `${backendURL}api/Match//MatchId/${userId}?PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      this.matchArray = response.data.result
      console.log(this.matchArray)
      this.sessionUserId = JSON.parse(localStorage.getItem('userData')).user.id
      // this.totalRecords = response.data.totalRecords
      // this.current = this.pageNumber
      // this.info = response.data.result
      // this.isLoading = false
      // this.matchArray = response.data.result

      // return this.info
      // this.collectMoney = true
      // this.payQuoteButton = false
    },

    calculateQuote () {
      this.match.quote = this.match.price / this.match.quantityPlayers

      console.log('CUOTA', this.match.quote)
    },

    calculateCommission () {
      this.match.commission = this.match.price * 0.05

      console.log('comision', this.match.commission)
    },
    sendMoney () {
      const userData = JSON.parse(localStorage.getItem('userData'))

      this.$swal.fire({
        title: 'Listo para pagar tu pichanga?',
        text: 'Se enviara el dinero a la siguiente cuenta /n Cuenta Bancaria:',
        html: '<p>Cuenta Interbancaria:</p>' + userData.user.cellphoneNumber,
        // text: '',
        // text: 'Cuenta Interbancaria:',
        // text: 'Banco:',
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success'
          })
        }
      })
    },

    async getPlayersByMatch (id) {
      console.log('hola')
      this.isLoading = true
      const localStorageData = JSON.parse(localStorage.getItem('userData'))
      const token = localStorageData.token
      this.pageNumber = this.current
      const response = await axios.get(
        `${backendURL}api/UserMatch/PlayersMatch/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      this.players = response.data.result
      let totalQuote = 0

      for (let i = 0; i < this.players.length; i++) {
        console.log('Pago' + totalQuote)
        if (this.players[i].paymentStatus === '1') {
          totalQuote = totalQuote + this.players[i].match.quote
        }
      }
      console.log('Pago' + totalQuote)
      console.log('Recaudado', totalQuote)
      this.collected = totalQuote
      this.players.forEach(player => {
        if (player.paymentStatus === '1') {
          this.playersPaid++
        }
      })
    },
    payQuote () {
      console.log('Pagar Quota')
      this.isPaymentModalActive = true
    }
  }
})
</script>
<style lang="scss" scoped>
@import "../scss/_theme-default";

$pagination-color: $base-color;
</style>

<style scoped>
.rotate-image {
  /* Adjust the angle as needed */
  transform: rotate(90deg);
  margin-top: 100px;
}
</style>
