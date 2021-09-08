<template>
  <div class="pa-0 ma-0">
    <v-container fluid class="ma-0 pa-0">
      <v-card style="height:100vh">
        <v-row style="height:80px">
          <v-col cols="12" class="d-flex">
            <v-col cols="2"><h4 class="pt-1">Users</h4></v-col>
            <v-spacer></v-spacer>
            <v-col cols="2"><v-btn color="primary" dense class="">Create User</v-btn></v-col>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>


export default {
  name: "Home",

  components: {
    // HelloWorld,
  },
};
</script>
