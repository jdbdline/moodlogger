<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated>
      <q-toolbar>
       <q-btn
              flat
              dense
              round
              clickable
              @click = "toggleLeftDrawer"
              icon="menu"
              />

         

       
        <div class = "q-px-sm q-pt-sm q-mb-sm">
          <div class="row">
            <div class="col">
              <h3 class="col">
                  Mood Logger
              </h3>
              
            </div>
        </div>
        
      

      </div>
      </q-toolbar>
      
      <q-img 
          src = "~assets/space.jpeg"
          class = "header-img absolute-top"
          />
    </q-header>  

 
  <q-drawer
          v-model="leftDrawerOpen"
          show-if-above
          @click = "getPositiveAffirmation"
          :width="250"
          :breakpoint="600"
        >
          <q-scroll-area style="height: calc(100% - 162px); padding-top:10px;margin-top: 162px; border-right: 1px solid #ddd">
            <q-list padding>
              <q-item
               to="/"
               clickable 
               exact
               v-ripple>
                <q-item-section avatar>
                  <q-icon name="send" />
                </q-item-section>

                <q-item-section>
                  Moods
                </q-item-section>
              </q-item>

              <q-item 
                to="/report"
                active 
                clickable 
                exact
                v-ripple>
                <q-item-section avatar>
                  <q-icon name="star" />
                </q-item-section>

                <q-item-section>
                  Reports
                </q-item-section>
              </q-item>

              <q-item 
                to="/help"
                active 
                clickable 
                exact
                v-ripple>
                <q-item-section avatar>
                  <q-icon name="help" />
                </q-item-section>

                <q-item-section>
                  Help
                </q-item-section>
              </q-item>   
              
              <q-item 
                to="/user"
                active 
                clickable 
                exact
                v-ripple>
                <q-item-section avatar>
                  <q-icon name="account_circle" />
                </q-item-section>

                <q-item-section>
                  User
                </q-item-section>
              </q-item>           
            </q-list>
          </q-scroll-area>
            
      
            <div class="absolute-top bg-transparent" style="height:162px; padding:25px;">
               <q-img 
                src = "~assets/space.jpeg"
                class = "header-img absolute-top"

                />
              <q-avatar  
                @click = "toggleLeftDrawer"
                 clickable 
                 size="56px" 
                 class="q-mb-lg">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
              <div class="text-weight-bold">JD Oberholster</div>
              <div>{{ todaysDate }}</div>
              
            </div>
          
        </q-drawer>   

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>


import axios from 'axios'
import { defineComponent, ref } from 'vue'
import { date } from 'quasar'
import { useQuasar } from 'quasar'

let affirmation = '';

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    
    let leftDrawerOpen = ref(false)

    return {
       mood: ref(),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      text: ref(''),
      ph: ref(''),
      $q : useQuasar(),
      dense: ref(false)
    }
  },
  data(){
    return {
      methods : {
         
            
            
          
      }
    }
  },
  computed:{
     todaysDate(){
          let timeStamp  = Date.now();
          return date.formatDate(timeStamp, 'dddd D MMMM hh:mm');
     }
  },

  methods:{
   getPositiveAffirmation(){
           let posAffirmation;
         
            const api = axios.create({ baseURL: 'http://192.168.1.89:3000/getAffirmation' });  
                          
                api.get('/')
                .then((response) => {
                            this.$q.notify({
                              message: response.data['affirmation'],
                              color: 'purple'
                            })


                    })
              
              return posAffirmation;
         }
  }
})
</script>
<style lang="scss">
  .header-img{
    height:100%;
    z-index:-1;
    opacity:0.2;    
  }
</style>