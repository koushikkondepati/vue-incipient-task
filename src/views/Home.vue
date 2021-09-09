<template>
  <div class="home-div grey lighten-3">
    <v-card style="height:90vh" class="pa-0 ma-0">
        <v-row>
          <v-col cols="12" class="d-inline-flex" style="height:70px">
            <h4 class="pt-1 ml-4">Users</h4>
            <v-spacer></v-spacer>
            <v-btn dense color="primary" class="mr-4" @click="openCreateUserDialog()">Create User</v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="d-flex justify-center">
          <v-col cols="11">
            <div class="v-scrolling-div" style="height:420px">
              <table class="mt-6" id="employeelist">
              <tr>
                <th>Name</th>
                <th>SurName</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Activate</th>
                <th>Action</th>
              </tr>
              <tr v-for="(user,idx) in users" :key="user.id" id="employeelist">
                <td>{{user.Name}}</td>
                <td>{{user.Surname}}</td>
                <td>{{user.Email}}</td>
                <td>{{user.Phone}}</td>
                <td>{{user.Status}}</td>
                <td><v-btn dense color="success" @click="editUserDetails(idx)">Edit</v-btn><v-btn dense color="error" class="ml-2" @click="remove(idx)">Delete</v-btn></td>
              </tr>
            </table>
            </div>
          </v-col>
        </v-row>
        <!-- user dialog starts here -->
        <v-dialog v-model="UserDialog" width="800" persitent style="overflow-x: hidden">
          <v-card style="height:100vh" elevation-1>
            <v-row>
              <v-col cols="12" class="pa-8">
                <v-row>
                  <v-col md="6">
                    <label for="Name">Name</label><br/>
                    <v-text-field v-if="!editenabled" dense outlined v-model="Name"></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.Name"></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <label for="Surname">Surname</label><br/>
                    <v-text-field v-if="!editenabled" dense outlined v-model="surname"></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.surname"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6">
                    <label for="Email">Email Address</label><br/>
                    <v-text-field v-if="!editenabled" dense outlined v-model="email" ></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.email"></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <label for="Surname">Password</label><br/>
                    <v-text-field v-if="!editenabled" dense outlined v-model="password"></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.password"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6">
                    <label for="username">Username</label><br/>
                    <v-text-field v-if="!editenabled" dense outlined v-model="username"></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.username"></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <label for="company">Company</label><br/>
                    <v-text-field v-if="!editenabled" dense outlined v-model="company"></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.company"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6">
                    <label for="Phone">Phone Number</label><br/>
                    <v-text-field v-if="!editenabled" dense outlined v-model="phone"></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.phone"></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <label for="Countrycode">Phone Country Code</label><br/>
                    <v-text-field v-if="!editenabled" dense outlined v-model="countrycode"></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.countrycode"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <button>choose file</button>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <v-btn v-if="!editenabled" color="primary" dense @click="createUser()">Save</v-btn>
                    <v-btn v-else color="primary" dense @click="UpdateUser()">Save</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <!-- user dialog ends -->
      </v-card>
  </div>
</template>

<script>
import userData from "../users.json";
import "../styles/style.css";
export default {
  name: "Home",

  data(){
    return{
      users: userData,
      UserDialog: false,
      // create user form data
      Name: "",
      surname: "",
      email: "",
      password: "",
      username: "",
      company: "",
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
        company: "",
        countrycode: ""
      },
      selectedRow: null,
      usersdata: "",
      editenabled: false,
      
    }
  },

  components: {
    // HelloWorld,
  },

 

  methods:{
    openCreateUserDialog(){
      this.UserDialog = true;
    },

    createUser(){
      this.users.push({
        "id": this.users.length,
        "Name": this.Name,
        "Surname": this.surname,
        "Email": this.email,
        "Phone": this.phone,
        "Status": "Active"
      });
      this.UserDialog= false;
    },

    editUserDetails(idx){
      this.editenabled = true;
      this.selectedRow = idx;
      this.UserDialog= true;
      this.editUser.Name = this.users[idx].Name;
      this.editUser.surname = this.users[idx].Surname;
      this.editUser.email = this.users[idx].Email;
      this.editUser.password = this.users[idx].Password;
      this.editUser.username = this.users[idx].Username;
      this.editUser.company = this.users[idx].Company;
      this.editUser.phone = this.users[idx].Phone;
      this.editUser.countrycode = this.users[idx].Countrycode;
    },

    async UpdateUser(){
      
      this.users[this.selectedRow].id = this.selectedRow+1;
      this.users[this.selectedRow].Name = this.editUser.Name;
      this.users[this.selectedRow].Surname = this.editUser.surname;
      this.users[this.selectedRow].Email = this.editUser.email;
      this.users[this.selectedRow].Password = this.editUser.password;
      this.users[this.selectedRow].Username = this.editUser.username;
      this.users[this.selectedRow].Company = this.editUser.company;
      this.users[this.selectedRow].Countrycode = this.editUser.countrycode;
      this.users[this.selectedRow].Phone = this.editUser.phone;

      this.UserDialog= false;
      this.editenabled = false;
    },

    remove(idx){
      if(confirm("Are u sure to delete this userr?")){
        // document.getElementById("employeelist").deleteRow(idx+1)[idx];
        this.users.splice(idx,1);
      }
    }
    
   
  }
};
</script>

<style scoped>

/* .home-div{
  padding: 40px 20px;
}


table {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}

tr,th {
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
  
}

td,th{
  padding: 10px 20px;
}

tr:hover{
  cursor: pointer;
  background-color: #dddddd;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.input{
  width: 40%;
  padding: 10px;
}

.v-scrolling-div{
  overflow-y: scroll;
}

.v-scrolling-div::-webkit-scrollbar {
        width: 5px;
    }
    .v-scrolling-div::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    .v-scrolling-div::-webkit-scrollbar-thumb {
        background: #AFAFAF;
    } */
</style>
