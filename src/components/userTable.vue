<template>
    <div>
        <v-row> 
            <!-- https://dummy.restapiexample.com/api/v1/employees -->
          <v-col cols="12" class="d-inline-flex" style="height:70px">
            <h4 class="pt-1 ml-4">Users</h4>
            <v-spacer></v-spacer>
            <v-btn dense color="primary" class="mr-4" @click.stop="openCreateUserDialog()">Create User</v-btn>
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
                    <th>website</th>
                    <th>Action</th>
                </tr>
                <tr v-for="(user,idx) in data" :key="user.id" id="employeelist">
                    <td>{{user.name}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.phone}}</td>
                    <td>{{user.website}}</td>
                    <td><v-btn dense color="success" @click.stop="editUserDetails(idx)">Edit</v-btn><v-btn dense color="error" class="ml-2" @click="remove(idx)">Delete</v-btn></td>
                </tr>
                </table>
                </div>
          </v-col>
        </v-row>
        <!-- user dialog starts here -->
        <v-dialog v-model="UserDialog" width="800" persistent style="overflow-x: hidden">
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
                    <v-text-field v-if="!editenabled" dense outlined v-model="website"></v-text-field>
                    <v-text-field v-else dense outlined v-model="editUser.website"></v-text-field>
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
                    <v-btn v-if="!editenabled" color="primary" dense @click="createUser()" :disabled="(this.Name.length == 0 || this.email.length == 0 || this.phone.length == 0 || this.website.length == 0 || this.surname.length == 0)">Save</v-btn>
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
      data: [],
      users: userData,
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
    }
  },

  components: {
    
  },

  mounted(){
      this.getData();
  },

  methods:{

    async getData() {
      try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        this.apiUsers = await response.json();
        console.log(this.apiUsers);
        //console.log(JSON.stringify(this.apiUsers));
        this.data = this.apiUsers;
      } catch (error) {
        console.log(error);
      }
    },

    //opens the dialog or popup box
    openCreateUserDialog(){
      this.UserDialog = true;
    },

    //creates the row for the table
    createUser(){
      this.data.push({
        "id": this.data.length+20,
        "name": this.Name,
        "username": this.surname,
        "email": this.email,
        "phone": this.phone,
        "website": this.website,
        // "address[3]": this.password,
        // "address[4]": this.countrycode,
      });
      this.UserDialog= false;
      this.reset();
    },


    //edit the selected row details
    editUserDetails(idx){
      this.editenabled = true;
      this.selectedRow = idx;
      this.UserDialog= true;
      this.editUser.Name = this.data[idx].name;
      this.editUser.surname = this.data[idx].username;
      this.editUser.email = this.data[idx].email;
    //   this.editUser.password = this.data[idx].address[3];
      this.editUser.username = this.data[idx].username;
      this.editUser.website = this.data[idx].website;
      this.editUser.phone = this.data[idx].phone;
    //   this.editUser.countrycode = this.data[idx].address[4];

      this.reset();
    },

    //update the selected row
    async UpdateUser(){
      
      this.data[this.selectedRow].id = this.selectedRow+1;
      this.data[this.selectedRow].name = this.editUser.Name;
      this.data[this.selectedRow].username = this.editUser.surname;
      this.data[this.selectedRow].email = this.editUser.email;
    //   this.data[this.selectedRow].address[3] = this.editUser.password;
      this.data[this.selectedRow].username = this.editUser.username;
      this.data[this.selectedRow].website = this.editUser.website;
    //   this.data[this.selectedRow].address[4] = this.editUser.countrycode;
      this.data[this.selectedRow].phone = this.editUser.phone;

      this.UserDialog= false;
      this.editenabled = false;
    },

    // remove the selected row
    remove(idx){
      if(confirm("Are u sure to delete this user?")){
        this.data.splice(idx,1);
      }
    },

    //reset form
    reset(){
        this.Name = "";
          this.surname = "";
          this.email = "";
          this.password = "";
          this.username = "";
          this.website = "";
          this.phone = "";
          this.countrycode = "";
    }
    
   
  }
};
</script>