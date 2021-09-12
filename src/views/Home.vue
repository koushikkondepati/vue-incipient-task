<template>
  <div class="home-div grey lighten-3">
    <v-card style="height:90vh" class="pa-0 ma-0">
        <AddUser></AddUser>
        <v-divider></v-divider>
        <UserTable></UserTable>
      </v-card>
  </div>
</template>

<script>
// import userData from "../users.json";
import "../styles/style.css";
import UserTable from "../components/userTable.vue";
import AddUser from "../components/AddUser.vue";
export default {
  name: "Home",

  data(){
    return{
      
      
    }
  },

  components: {
    AddUser,
    UserTable,
  },

};
</script>

