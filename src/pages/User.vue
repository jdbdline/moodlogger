<template>
  <q-page class="q-pa-md" >
      <h5 >
        User
      </h5>


      <div col ='q-gutter-md'>
        <div class="row">  
          <h7 class="col">
            Username
          </h7> 
          <div class="col"><q-input filled v-model="newUsername" label="Username" />
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col"> 
        <br>
        </div>
      </div>  
      
      <div class ='q-gutter-md'>
        <div class="row">
          <h7 class="col">
            Email
          </h7> 
          <div class="col"><q-input filled v-model="newEmail" label="Email" />
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col"> 
        <br>
        </div>
      </div>  
      
       <div class="row"> 
        <h7 class="col">
          Profile Picture
        </h7> 

        <div class="col">
           <q-btn color="primary" label="Get Picture" @click="captureImage" />
            <img :src="imageSrc">
        </div>

      </div>
      <div class="row">
        <div class="col"> 
        <br>
        </div>
      </div>  

     
      <div class="row">
        <div class="col"> 
        <br> 
          GPS position: <strong>{{ newGpsPosition }}</strong>
        </div>
      </div> 


      <div class="row">
        <div class="col"> 
        <br> 
          Location <strong>{{ newLocationName }}</strong>
        </div>
      </div>  
      
      <div class="row">
        <div class="col"> 
        <br> 
          Degrees Celcius: <strong>{{ newCelcius }}</strong>
        </div>
      </div>  

      <div class="row">
        <div class="col"> 
        <br> 
          Weather Note: <strong>{{ newWeatherNote }}</strong>
        </div>
      </div>  

      <q-btn 
          color="blue" 
          glossy
          label="Determine Location"
          style="width:100%"
          @click="determineGps" 
            @keyup.enter="determineGps"
           />
      <div class="row">
        <div class="col"> 
        <br>
        </div>
      </div>  

      <q-btn 
          color="green" 
          glossy
          label="Determine Current Weather"
          style="width:100%"
          @click="determineCurrentWheather" 
            @keyup.enter="determineCurrentWheather"
           />
      <div class="row">
        <div class="col"> 
        <br>
        </div>
      </div>  

       <q-btn 
          color="amber" 
          glossy
          label="Update Information"
          style="width:100%"
          @click="alert" 
            @keyup.enter="alert"
           />
 
  </q-page>


  
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation'
import axios from 'axios'

export default defineComponent({ 
  data () {    
    return {
        newUsername  : '',
        newEmail  : '',
        newGpsPosition: '',
        newCelcius: '',
        newLocationName: '',
        newWeatherNote: ''
    }
  }, 
  methods:{
    determineGps(){ 
        Geolocation.getCurrentPosition().then(newPosition => {
                this.newGpsPosition = newPosition.coords.latitude+','+newPosition.coords.longitude
            })
    },

    determineCurrentWheather(){ 
      
          const api = axios.create({ baseURL: 'https://moodbackend.herokuapp.com/getWeather?q='+ this.newGpsPosition})
          .get('/')
          .then(
              response => {
                console.log('response' , response.data)
                this.newCelcius     = response.data.current.temp_c+'°C'
                this.newWeatherNote = response.data.current.condition.text
                this.newLocationName  = response.data.location.name
              }).catch(err=>{
                 console.log('response' , err)
              
              });
          
    },
    alert(){
      this.determineGps();
       this.$q.dialog({
        title: 'Update',
        message: 'Some message'
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
      
    }
  }
  ,
  setup () {
     const imageSrc = ref('')
    
      async function captureImage () {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      })

      // The result will vary on the value of the resultType option.
      // CameraResultType.Uri - Get the result from image.webPath
      // CameraResultType.Base64 - Get the result from image.base64String
      // CameraResultType.DataUrl - Get the result from image.dataUrl
      imageSrc.value = image.webPath
      
    }
    return {
      newProfilePic: ref(null),
      captureImage,
      position :'',
      
    }
  }

})
</script>
