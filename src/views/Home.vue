<template>
  <div class="home-div grey lighten-3">
    <v-card style="height:90vh" class="pa-0 ma-0">
        <v-row>
          <v-col cols="12" class="d-inline-flex" style="height:70px">
            <h4 class="pt-1 ml-4">Users</h4>
            <v-spacer></v-spacer>
            <v-btn dense color="primary" class="mr-4">Create User</v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="d-flex justify-center">
          <v-col cols="11">
            <table class="mt-6">
              <tr>
                <th>Name</th>
                <th>SurName</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Activate</th>
                <th>Action</th>
              </tr>
              <tr v-for="user in users" :key="user.id">
                <td>{{user.Name}}</td>
                <td>{{user.Surname}}</td>
                <td>{{user.Email}}</td>
                <td>{{user.Phone}}</td>
                <td>{{user.Status}}</td>
                <td><v-btn dense color="success">Edit</v-btn><v-btn dense color="error" class="ml-2">Delete</v-btn></td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </v-card>
  </div>
</template>

<script>
import userData from "../users.json";
export default {
  name: "Home",

  data(){
    return{
      users: userData,
    }
  },

  components: {
    // HelloWorld,
  },
};
</script>

<style scoped>

.home-div{
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
  /* padding: 10px 5px; */
}

td,th{
  padding: 10px 20px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
