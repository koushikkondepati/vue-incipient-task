<template>
    <div>
        <v-row>
          <v-col cols="12" class="d-inline-flex" style="height:70px">
            <h4 class="pt-1 ml-4">Users</h4>
            <v-spacer></v-spacer>
            <v-btn dense color="primary" class="mr-4" @click="openCreateUserDialog()">Create User</v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row  class="d-flex justify-center">
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
                    <v-text-field v-if="!editenabled" dense outlined v-model="Name" :rules="rules.name" required></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.Name" :rules="rules.name" required></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <label for="Surname">Surname</label><br/>
                    <v-text-field v-if="!editenabled" dense outlined v-model="surname" :rules="rules.name" required></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.surname" :rules="rules.name" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6">
                    <label for="Email">Email Address</label><br/>
                    <v-text-field v-if="!editenabled" dense outlined v-model="email" :rules="rules.name" required></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.email" :rules="rules.name" required></v-text-field>
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
                    <v-text-field v-if="!editenabled" dense outlined v-model="phone" :rules="rules.name" required></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.phone" :rules="rules.name" required></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <label for="Countrycode">Phone Country Code</label><br/>
                    <v-text-field v-if="!editenabled" dense outlined v-model="countrycode"></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.countrycode"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <input type="file" id="myFile" name="filename">
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <v-btn v-if="!editenabled" color="primary" dense @click="createUser()" :disabled="(Name.length == 0 || email.length == 0 || phone.length == 0)">Save</v-btn>
                    <v-btn v-else color="primary" dense @click="UpdateUser()">Save</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <!-- user dialog ends -->
    </div>
</template>

<script>
import userData from "../users.json";
export default {

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
      
      //validation
      rules: {
          name: [val => (val || '').length > 0 || 'This field is required'],
        },
    }
  },

  components: {
    
  },

  methods:{
    //opens the dialog or popup box
    openCreateUserDialog(){
      this.UserDialog = true;
    },

    //creates the row for the table
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
      this.reset();
    },


    //edit the selected row details
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

    //update the selected row
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

    // remove the selected row
    remove(idx){
      if(confirm("Are u sure to delete this userr?")){
        this.users.splice(idx,1);
      }
    },

    //reset form
    reset(){
        this.Name = "";
          this.surname = "";
          this.email = "";
          this.password = "";
          this.username = "";
          this.company = "";
          this.phone = "";
          this.countrycode = "";
    }
    
   
  }
};
</script>