<template>
    <!-- user dialog starts here -->
        <v-dialog v-model="getDialogStatus" width="800" persistent style="overflow-x: hidden">
          <v-card style="height:100vh" elevation-1>
            <v-row>
              <v-col cols="12" class="pa-8">
                <v-row>
                  <v-col md="6">
                    <label for="Name">Name</label><br/>
                    <v-text-field v-if="!getEditBtnStatus" dense outlined v-model="UserDataEmptyArray.Name" :rules="rules.name" required></v-text-field>
                    <v-text-field v-else dense outlined v-model="EditedUserDataArray.Name" :rules="rules.name" required></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <label for="Surname">Surname</label><br/>
                    <v-text-field v-if="!getEditBtnStatus" dense outlined v-model="UserDataEmptyArray.surname" :rules="rules.name" required></v-text-field>
                    <v-text-field v-else dense outlined v-model="EditedUserDataArray.surname" :rules="rules.name" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6">
                    <label for="Email">Email Address</label><br/>
                    <v-text-field v-if="!getEditBtnStatus" dense outlined v-model="UserDataEmptyArray.email" :rules="rules.name" required></v-text-field>
                    <v-text-field v-else dense outlined v-model="EditedUserDataArray.email" :rules="rules.name" required></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <label for="Surname">Password</label><br/>
                    <v-text-field v-if="!getEditBtnStatus" dense outlined v-model="UserDataEmptyArray.password"></v-text-field>
                    <v-text-field v-else dense outlined v-model="EditedUserDataArray.password"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6">
                    <label for="username">Username</label><br/>
                    <v-text-field v-if="!getEditBtnStatus" dense outlined v-model="UserDataEmptyArray.username"></v-text-field>
                    <v-text-field v-else dense outlined v-model="EditedUserDataArray.username"></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <label for="company">Company</label><br/>
                    <v-text-field v-if="!getEditBtnStatus" dense outlined v-model="UserDataEmptyArray.website"></v-text-field>
                    <v-text-field v-else dense outlined v-model="EditedUserDataArray.website"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6">
                    <label for="Phone">Phone Number</label><br/>
                    <v-text-field v-if="!getEditBtnStatus" dense outlined v-model="UserDataEmptyArray.phone" :rules="rules.name" required></v-text-field>
                    <v-text-field v-else dense outlined v-model="EditedUserDataArray.phone" :rules="rules.name" required></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <label for="Countrycode">Phone Country Code</label><br/>
                    <v-text-field v-if="!getEditBtnStatus" dense outlined v-model="UserDataEmptyArray.countrycode"></v-text-field>
                    <v-text-field v-else dense outlined v-model="EditedUserDataArray.countrycode"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <input type="file" id="myFile" name="filename">
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <v-btn v-if="!getEditBtnStatus" color="primary" dense @click="addUser(UserDataEmptyArray)" :disabled="(this.UserDataEmptyArray.Name.length == 0 || this.UserDataEmptyArray.email.length == 0 || this.UserDataEmptyArray.phone.length == 0 || this.UserDataEmptyArray.website.length == 0 || this.UserDataEmptyArray.surname.length == 0)">Save</v-btn>
                    <v-btn v-else color="primary" dense @click="UpdateUser()">Save</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <!-- user dialog ends -->
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
    data(){
        return{
            UserDataEmptyArray:{
                Name: "",
                surname: "",
                email: "",
                password: "",
                username: "",
                website: "",
                phone: "",
                countrycode: "",
            },
            //edit details data
            EditedUserDataArray: {
                Name: "",
                surname: "",
                email: "",
                password: "",
                username: "",
                website: "",
                phone: "",
                countrycode: "",
            },
            
            //validation
            rules: {
                name: [val => (val || '').length > 0 || 'This field is required'],
              },
        }
    },
    methods:{
      ...mapActions(["addUser"]),
    },
    computed:mapGetters(["getDialogStatus","getEditBtnStatus"]),
    

}
</script>