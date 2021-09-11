<template>
    <div>
        <!-- <v-row> 
          <v-col cols="12" class="d-inline-flex" style="height:70px">
            <h4 class="pt-1 ml-4">Users</h4>
            <v-spacer></v-spacer>
            <v-btn dense color="primary" class="mr-4" @click.stop="openCreateUserDialog()">Create User</v-btn>
          </v-col>
        </v-row> -->
        <!-- <v-divider></v-divider> -->
        <v-row  class="d-flex justify-center">
            <v-col cols="11">
                <div class="v-scrolling-div" style="height:420px">
                <table class="mt-6" id="employeelist">
                <tr>
                    <th>Name</th>
                    <th>SurName</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>website</th>
                    <th>Action</th>
                </tr>
                <!-- <tr v-for="(user,idx) in data" :key="user.id" id="employeelist">
                    <td>{{user.name}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.phone}}</td>
                    <td>{{user.website}}</td>
                    <td><v-btn dense color="success" @click.stop="editUserDetails(idx)">Edit</v-btn><v-btn dense color="error" class="ml-2" @click="remove(idx)">Delete</v-btn></td>
                </tr> -->
                <tr v-for="(user) in allUsers" :key="user.id" id="employeelist">
                    <td>{{user.name}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.phone}}</td>
                    <td>{{user.website}}</td>
                    <td><v-btn dense color="success" @click.stop="editUserDetails(user.id)">Edit</v-btn><v-btn dense color="error" class="ml-2" @click="deleteUsers(user.id)">Delete</v-btn></td>
                </tr>
                </table>
                </div>
          </v-col>
        </v-row>
        <v-row>
          <UserDialog :userDialog="userDialog" :editenabled="editenabled"></UserDialog>
        </v-row>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';
import UserDialog from "./UserDialog.vue";
// import userData from "../users.json";
export default {

  data(){
    return{
      data: [],
      // users: userData,
      UserDialog: false,
      // create user form data
      Name: "",
      surname: "",
      email: "",
      password: "",
      username: "",
      website: "",
      phone: "",
      countrycode: "",
      //edit details data
      editUser: {
        Name: "",
        surname: "",
        email: "",
        password: "",
        username: "",
        phone: "",
        website: "",
        countrycode: ""
      },
      selectedRow: null,
      usersdata: "",
      editenabled: false,
      
      //validation
      rules: {
          name: [val => (val || '').length > 0 || 'This field is required'],
        },
      userDialog: false,
    }
  },

  components: {
    UserDialog,
  },

  created(){
    this.fetchUsers();
  },

  mounted(){
      // this.getData();
  },

  computed: mapGetters(["allUsers","dialogStatus"]),

  methods:{


    ...mapActions(["fetchUsers","deleteUsers"]),



    //edit the selected row details
    editUserDetails(idx){
      this.editenabled = true;
      this.selectedRow = idx;
      this.userDialog = true;
    },
 
  }
};
</script>