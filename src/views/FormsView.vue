<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Gestión de Usuarios
      <router-link
        slot="right"
        to="/"
        class="button"
      >
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        title="Crear un nuevo usuario"
        icon="ballot"
      >
        <form @submit.prevent="formAction">
          <b-field
            label="Datos"
            horizontal
          >
            <b-field>
              <b-input
                v-model="form.name"
                icon="account"
                placeholder="Nombres"
                name="name"
                required
              />
            </b-field>
            <b-field>
              <b-input
                v-model="form.email"
                icon="email"
                type="email"
                placeholder="Apellidos"
                name="email"
                required
              />
            </b-field>
          </b-field>
          <b-field
            message="Do not enter the leading zero"
            horizontal
          >
            <b-field>
              <p class="control">
                <a class="button is-static">
                  +51
                </a>
              </p>
              <b-input
                v-model="form.phone"
                type="tel"
                name="phone"
                expanded
              />
            </b-field>
          </b-field>
          <b-field
            label="Rol"
            horizontal
          >
            <b-select
              v-model="form.department"
              placeholder="Select a department"
              required
            >
              <option
                v-for="(department, index) in departments"
                :key="index"
                :value="department"
              >
                {{ department }}
              </option>
            </b-select>
          </b-field>
          <hr>
          <b-field
            label="Email"
            horizontal
          >
            <b-input
              v-model="form.subject"
              placeholder="nombreapellido@tesoropunto.com"
              required
            />
          </b-field>
          <hr>
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button
                  native-type="submit"
                  type="is-info"
                >
                  Crear
                </b-button>
              </div>
              <div class="control">
                <b-button
                  type="is-info is-outlined"
                  @click.prevent="formAction"
                >
                  Limpiar campos
                </b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
      <card-component
        title="Usuarios"
        icon="ballot-outline"
      >
        <b-table
          :data="data"
          :columns="columns"
        />
        <!-- <b-field
          label="Checkbox"
          class="has-check"
          horizontal
        >
          <checkbox-radio-picker
            v-model="customElementsForm.checkbox"
            :options="{ lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }"
            type="is-info"
          />
        </b-field>
        <hr>
        <b-field
          label="Radio"
          class="has-check"
          horizontal
        >
          <checkbox-radio-picker
            v-model="customElementsForm.radio"
            :options="{ one: 'One', two: 'Two' }"
            type="is-info"
          />
        </b-field>
        <hr>
        <b-field
          label="Switch"
          horizontal
        >
          <b-switch
            v-model="customElementsForm.switch"
            type="is-info"
          >
            Default
          </b-switch>
        </b-field>
        <hr>
        <b-field
          label="File"
          horizontal
        >
          <file-picker
            v-model="customElementsForm.file"
            type="is-info"
          />
        </b-field> -->
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TitleBar from '@/components/TitleBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import FilePicker from '@/components/FilePicker.vue'
import HeroBar from '@/components/HeroBar.vue'
import CheckboxRadioPicker from '@/components/CheckboxRadioPicker.vue'

export default defineComponent({
  name: 'FormsView',
  components: {
    // CheckboxRadioPicker,
    HeroBar,
    // FilePicker,
    CardComponent,
    TitleBar
  },
  data () {
    return {
      titleStack: ['Admin', 'Gestión de Usuarios'],
      departments: ['Administrador', 'Atención al cliente', 'Ventas'],
      form: {
        name: null,
        email: null,
        phone: null,
        department: null,
        subject: null,
        question: null
      },
      customElementsForm: {
        checkbox: ['lorem'],
        radio: 'one',
        switch: true,
        file: null
      },
      data: [
        { id: 1, first_name: 'Jesse Simmons', date: '2016-10-15 13:43:27', active: 'Si', gender: 'Male' },
        { id: 2, first_name: 'John Jacobs', date: '2016-12-15 06:00:53', active: 'Si', gender: 'Male' },
        { id: 3, first_name: 'Tina Gilbert', date: '2016-04-26 06:26:28', active: 'No', gender: 'Female' },
        { id: 4, first_name: 'Clarence Flores', date: '2016-04-10 10:28:46', active: 'Si', gender: 'Male' },
        { id: 5, first_name: 'Anne Lee', date: '2016-12-06 14:38:38', active: 'Si', gender: 'Female' }
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'first_name',
          label: 'Nombre y Apellido'
        },
        {
          field: 'date',
          label: 'Fecha de Ingreso',
          centered: true
        },
        {
          field: 'gender',
          label: 'Rol'
        },
        {
          field: 'active',
          label: 'Activo'
        }
      ]
    }
  },
  methods: {
    formAction () {
      this.$buefy.snackbar.open({
        message: 'Demo only',
        queue: false
      })
    }
  }
})
</script>
