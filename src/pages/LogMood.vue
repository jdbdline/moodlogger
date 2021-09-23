<template>
    <div class="q-pa-md ">
        <div class="row">
          <div class="col">
            <h5>
              How are you doing?
            </h5>
          </div>
         </div> 
        <div class="row">
          <div class="col">
      
            <h9>
              You can slide your mood to a score from (-5 to 5)
            </h9>
            </div>
         </div> 
      
          <div class="row">
            <div class="col">
               <br>
            </div>
         </div> 
      
        <div class="row">
           <div class="q-gutter-sm col">
                

                  <q-slider
                  v-model="newScore"
                  :min="-5"
                  :max="5"
                  :step="1"
                  label
                  label-always
                  color="light-green"
                />
              </div>
              
          <div class="col">   
            
             
            
          </div>
        </div> 
        
         <div class="row">
            <div class="col">
               <br>
            </div>
         </div> 
      
        <div class="row">
          <div class="col">
            <q-input 
            v-model="newNote"
            square
            placeholder="Describe Mood" 
            hint="How are you feeling?" 
            bg-color="white"
            class="col"
            dense />
          </div>
          <div class="col">   
            
             
            
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-checkbox v-model="newMeal" label="Did you have a meal recently?" color="teal" />
          </div>
            </div>
            <div class="row">
          <div class="col">
            <q-checkbox v-model="newMedication" label="Did you take your medication recently?" color="teal" />
          </div>
          

        </div>

        <div class="col">
          <q-checkbox v-model="newRest" label="Did you rest enough?" color="teal" />
        </div>

        <div class="col">
          <q-checkbox v-model="newWater" label="Did you drink enough water?" color="teal" />
        </div>
  
        <div class="col">
          <q-checkbox v-model="newComfort" label="Is your body comfortable?" color="teal" />
        </div>

        

        <div class="row">
          <div class="col"> 
            <div class="q-pa-md q-gutter-sm ">
              <q-btn 
                color="deep-orange" 
                glossy 
                label="Log Mood"
                @click="addMood" 
                @keyup.enter="addMood"
              />
            </div>
          </div>
        </div>
  </div>

  <q-page class="bg-grey-3 column ">

      <div class="q-pa-md q-gutter-sm">
        <h5>
          Previous Entries
        </h5> 
      </div>

        <q-list dense padding >
          <q-item
            v-for="( mood , index) in moods"
            :key="mood.score"
            seperator
            class ="ml-row"
            bordered
          >   
            <div class="q-pa-sm  ">
              
              <div class="row">
                <div class="col" style="font-size:20px;">
                   Log Entry #{{ index + 1 }} 
                </div>
                <div class="col" style="text-align:right;padding-top:5px;">
                    {{ mood.date }}
                </div>
              </div>
                <div class="row">
                  <div class=" col">                  
                    Mood Score
                  </div>

                   <div class="col col-right">   
                     {{ mood.score }}
                    </div>
                </div>
            <div>
           
            <div class="row">
              <div class="col">

                </div>
              </div>
             </div> 

          <div class="q-pa-md row" >
            <div class="q-gutter-md col">
              Mood Note             
            </div>
            <div class="q-gutter-md col col-right">
               {{ mood.note }}              
            </div>
          </div>

          <div class="q-pa-md row" >
            <div class="q-gutter-md col">
              Did you have a meal recently?              
            </div>
            <div class="q-gutter-md col col-right">
               {{ mood.meal=='true'?'yes':'No' }}              
            </div>
          </div>


          <div class="q-pa-md row" >
            <div class="q-gutter-md col">
              Did you take your medication recently?
              
            </div>
            <div class="q-gutter-md col col-right">
              
                  {{ mood.medication=='true'?'yes':'No' }} 
              
            </div>
          </div>

          <div class="q-pa-md row" >
            <div class="q-gutter-md col">
              Are you well rested?
            </div>
            <div class="q-gutter-md col col-right">          
                  {{ mood.rest=='true'?'yes':'No' }}
            </div>
          </div>

          <div class="q-pa-md row" >
            <div class="q-gutter-md col">
              Have you drank water recently
            </div>
            <div class="q-gutter-md col col-right">          
                  {{ mood.water=='true'?'yes':'No' }}
            </div>
          </div>

          <div class="q-pa-md row" >
            <div class="q-gutter-md col">
              Is your body comfortable?
            </div>
            <div class="q-gutter-md col col-right">          
                  {{ mood.comfort=='true'?'yes':'No' }}
            </div>
          </div>

           <div class="q-pa-md row" >
            <div class="q-gutter-md col ">
              Degrees Celcius Outside
              
            </div>
            <div class="q-gutter-md col col-right">
               {{ mood.celcius }}
              
            </div>
          </div>

           <div class="q-pa-md row" >
            
            <div class="q-gutter-md col ">
                Weather Note:               
              
            </div>
            <div class="q-gutter-md col col-right">
                {{ mood.weatherNote }}
                
            </div>
 
          </div>

           <div class="q-pa-md row" >
            <div class="q-gutter-md col ">
                Location:
            </div>
             <div class="q-gutter-md col col-right">
                {{ mood.locationName }}
            </div>
          </div>

          <div class="q-pa-md row" >
            <div class="q-gutter-md col ">
                Wind Speed KPH:
            </div>
             <div class="q-gutter-md col col-right">
                {{ mood.wind_kph }} km/h
            </div>
          </div>

        

            <br>
            </div>
          </q-item>

      </q-list>
  
      
  </q-page>

  
</template>
<style lang="sass" scoped>
.flex-break
  flex: 1 0 100% !important
  height: 0 !important

.example-container
  .example-cell
    margin: 1px
    padding: 4px 8px
    box-shadow: inset 0 0 0 2px $grey-6

.col-right
  text-align: right

.ml-row:nth-child(odd)
  background-color: white

   
</style>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { date } from 'quasar'
import Localbase from 'localbase'
import { useQuasar } from 'quasar'
import axios from 'axios'
import { Geolocation } from '@capacitor/geolocation'


let db = new Localbase('db');

export default defineComponent({
  setup () {
    return {
      mood: ref(0),
      meal: ref(false),
      medication: ref(false),
      rest: ref(false),
      water: ref(false),
      comfort: ref(false),
      
    }
  },
  data(){
    return {
      newScore: '0',
      newNote: '',
      newMeal: ref(false),
      newMedication: ref(false),
      newRest: ref(false),
      newWater: ref(false),
      newComfort: ref(false),
      $q : useQuasar(),
      moods :[],
    }
      
  },
  methods:{
      async determineGps(){ 
          let result = {};
          let newPosition = await Geolocation.getCurrentPosition();
          result = newPosition.coords.latitude+','+newPosition.coords.longitude;
          return result;
      },

      async determineCurrentWheather(latlong){ 
          const api = await axios.create({ baseURL: 'https://moodbackend.herokuapp.com/getWeather?q='+ latlong}).get('/');
          let returnArray = {
                    'celcius' : api.data.current.temp_c,
                    'weatherNote' : api.data.current.condition.text,
                    'locationName' : api.data.location.name,
                    'wind_kph' : api.data.current.wind_kph,
                  };                

          return returnArray;      
      },
      async getWeatherLocation(){
            let gps = await this.determineGps();            
            let current_weather = await this.determineCurrentWheather(gps);
            console.log('die weer',current_weather);
            return current_weather;
      } , 
      getMood(){

          const api = axios.create({ baseURL: 'https://moodbackend.herokuapp.com/getMoods' });          
          api.get('/')
          .then(
              response => {
                console.log('response' , response)
                this.moods = response.data;
              }).catch(err=>{
                 console.log('response' , err)
              
              });

      },
      
     uuidv4c() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      },

     async addMood(){
        let timeStamp = Date.now();
        let formattedString = date.formatDate(timeStamp, 'dddd D MMMM hh:mm');
        
        let mood = [{
          score       : this.newScore,
          note        : this.newNote,
          meal        : this.newMeal,
          medication  : this.newMedication,
          rest        : this.newRest,
          water       : this.newWater,
          comfort     : this.newComfort,
          date        : formattedString,
          timeStamp   : timeStamp,
          done        : false
        }];


          let formData = new FormData();
   

          formData.append('id',this.uuidv4c());
          formData.append('score',this.newScore);
          formData.append('note',this.newNote);
          formData.append('meal',this.newMeal);
          formData.append('medication',this.newMedication);
          formData.append('rest',this.newRest);
          formData.append('water',this.newWater);
          formData.append('comfort',this.newComfort);
          formData.append('date',formattedString);
          formData.append('timeStamp',timeStamp);

          try {
              let api_data =  await this.getWeatherLocation();
              console.log('inside',api_data);
              formData.append('celcius',api_data['celcius'])
              formData.append('weatherNote',api_data['weatherNote'])
              formData.append('locationName',api_data['locationName'])
              formData.append('wind_kph',api_data['wind_kph'])
              
            } catch (error) {
              throw new Error(error);
            }
        

          const api = axios.create({ baseURL: 'https://moodbackend.herokuapp.com/createMood' });
                    
          api.post('/',formData)
          .then(
              response => {
                console.log('response' , response)
            
              }).catch(err=>{
                 console.log('response' , err)
              
              });
        this.newScore = '';
        this.newNote  = '';
        this.newMeal  = ref(false);
        this.newMedication  = ref(false); 
        this.newRest  = ref(false); 
        this.newWater  = ref(false); 
        this.newComfort  = ref(false);    
       
        this.$q.notify('Mood recorded, refresh to see mood history');
 
      }
  },
  created() {
    this.getMood();
  }
})



</script>
