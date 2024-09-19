<template>
  <div class="hello">
    <h1>Pagar</h1>
    <div class="container">
      <div
        id="myPaymentForm"
        class="paymentForm"
      >
        <!-- if you want only cards, replace kr-smart-form by kr-embedded -->
        <div
          class="kr-smart-form"
          kr-card-form-expanded
        />
      </div>
    </div>
    <div data-test="payment-message">
      {{ message }}
    </div>
  </div>
</template>

<script>
/* import embedded-form-glue library */
import KRGlue from '@lyracom/embedded-form-glue'
import axios from 'axios'
export default {
  name: 'AttachForm',
  data () {
    return {
      message: ''
    }
  },
  async mounted () {
    const endpoint = 'https://api.micuentaweb.pe' // format: static.my.psp.domain
    // const publicKey = '40398241:publickey_31NpOBRpc527Wsr26TnHFfAQTh36z4GagzOwHDgU6aNtv'
    const publicKey = '40398241:testpublickey_xwnWM49YpsC68D60VPaHrDZjGTd1P3A49cO43LzuvVpXA'
    // format: 999999999:testpublickey_XXXXXXXXXX

    // Generate the form token
    try {
      // Realizar la solicitud POST utilizando Axios
      const localStorageData = JSON.parse(localStorage.getItem('userData'))
      const token = localStorageData.token
      console.log(token)
      const res = await axios.post('https://localhost:7001/api/Match/MatchId', {
        paymentConf: {
          amount: 10000,
          currency: 'PEN'
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      // Obtener el token del formulario
      console.log(res)
      const formToken = res.data.token // Axios ya convierte automáticamente el cuerpo de la respuesta a JSON

      // Cargar la biblioteca remota
      const { KR } = await KRGlue.loadLibrary(endpoint, publicKey)

      // Configuración mínima
      await KR.setFormConfig({
        formToken,
        'kr-language': 'en-US'
      })

      // Callback personalizado para manejar el pago
      await KR.onSubmit(async paymentData => {
        await this.validatePayment(paymentData)
      })

      // Renderizar los elementos del formulario de pago
      await KR.renderElements('#myPaymentForm')
    } catch (error) {
      // Manejo de errores
      console.log(error)
    }

    // try {
    //   const res = await fetch('http://localhost:3000/createPayment', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       paymentConf: { amount: 10000, currency: 'PEN' }
    //     })
    //   })
    //   const formToken = await res.text()
    //   // Load the remote library
    //   const { KR } = await KRGlue.loadLibrary(endpoint, publicKey)
    //   // Set the minimal configuration
    //   await KR.setFormConfig({
    //     formToken,
    //     'kr-language': 'en-US'
    //   })

    //   // Custom payment callback
    //   await KR.onSubmit(async paymentData => {
    //     await this.validatePayment(paymentData)
    //   })

    //   await KR.renderElements('#myPaymentForm') // Create a payment form
    // } catch (error) {
    //   // error => (this.message = error + ' (see console for more details)')
    //   console.log(error)
    // }
  },
  methods: {
    /* Validate the payment data */
    async validatePayment (paymentData) {
      const res = await fetch('http://localhost:3000/validatePayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      })
      if (res.status === 200) this.message = 'Payment successful!'
      return false // Return false to prevent the redirection
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 10px;
}
.paymentForm{
  padding: 10px;
}
</style>
