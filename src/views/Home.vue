<template>
  <div class="home-div grey lighten-3">
    <v-card style="height:90vh" class="pa-0 ma-0">
        <usertable></usertable>
      </v-card>
  </div>
</template>

<script>
// import userData from "../users.json";
import "../styles/style.css";
import usertable from "../components/userTable.vue";
export default {
  name: "Home",

  data(){
    return{
      
      
    }
  },

  components: {
    usertable,
  },

};
</script>

