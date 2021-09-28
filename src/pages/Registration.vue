<template>
  <q-page
    class="window-height window-width row justify-center items-center"
  >
     
      <q-img 
          src = "~assets/space.jpeg"
          class = "header-img absolute-top"
          />
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:485px;">
          <q-card-section class="bg-deep-orange-7">
            <h3 class="text-h5 text-white q-my-md">Mood Logger</h3>
            
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input square clearable v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn 
                unelevated size="lg" 
                color="orange-4" 
                class="full-width text-white" 
                clickable
                @click='signIn'
                label="Sign In" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:485px;">
          <q-card-section class="bg-deep-orange-7">
            <h4 class="text-h5 text-white q-my-md">Registration</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input 
                  square 
                  clearable 
                  v-model="email" 
                  type="email" 
                  label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input 
                square 
                clearable 
                v-model="username" 
                type="username" 
                label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn 
              unelevated size="lg" 
              color="orange-4" 
              class="full-width text-white" 
              clickable
              @click = 'addUser'
              label="Create Account" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Return to login</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

import CryptoJS from 'crypto-js'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods:{
   
    signIn(){
        alert('sign in');

        let formData = new FormData();

        formData.append('email',this.email);
        formData.append('password',this.getHash(this.password));
        
        const api = axios.create({ baseURL: 'https://moodbackend.herokuapp.com/signIn' });

        api.post('/',formData)
        .then(
            response => {
              console.log('response' , response)
          
            }).catch(err=>{
                console.log('response' , err)
            
            });
        
      
        alert('add user');
        

      
    },
    registerUser(){
      alert('register user');
    },
    getHash(password){
      const hash = CryptoJS.SHA256(password);  
      return hash;
    },
    uuidv4c() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      },
   
    async addUser(){
      
      let formData = new FormData();
      formData.append('id',this.uuidv4c());
      formData.append('username',this.username);
      formData.append('password',this.getHash(this.password));
      formData.append('email',this.email);
     
     


      const apiUserExist =  axios.create({ baseURL: 'https://moodbackend.herokuapp.com/doesUserExist?username='+this.username });

      apiUserExist.get('/')
      .then(
        response => {
          console.log('response' , response)  

            //todo create user if user does not exist
         

            if(response.data.status == 'success'){
                  alert('creating user');
                const apiCreateUser =  axios.create({ baseURL: 'https://moodbackend.herokuapp.com/createUser' });

                apiCreateUser.post('/',formData)
                .then(
                  response => {
                    alert('user created successfully')
                    console.log('response' , response)  
                }).catch(err=>{
                  console.log('response' , err) 
                });
            }else{
                  alert(response.data.message);
            }
/*

          if(response.status == 'success'){
            try{
                const apiCreateUser =  axios.create({ baseURL: 'https://moodbackend.herokuapp.com/createUser' });

                apiCreateUser.post('/',formData)
                .then(
                  response => {
                    alert('user created successfully')
                    console.log('response' , response)  
                }).catch(err=>{
                  console.log('response' , err) 
                });
            }
            catch(e){
              console.log(e);
            }
          }else{
            alert(response.message);
          }
          */





      }).catch(err=>{
        console.log('response' , err) 
      });
     
      
/*  
      const apiCreateUser = await axios.create({ baseURL: 'http://localhost:3000/createUser' });

      apiCreateUser.post('/',formData)
      .then(
        response => {
          console.log('response' , response)  
      }).catch(err=>{
        console.log('response' , err) 
      });
      alert('add user');
*/
    }
  }
}
</script>

<style>
</style>