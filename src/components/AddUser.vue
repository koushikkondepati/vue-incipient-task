<template>
  <div>
    <v-row> 
          <v-col cols="12" class="d-inline-flex" style="height:70px">
            <h4 class="pt-1 ml-4">Users</h4>
            <v-spacer></v-spacer>
            <v-btn dense color="primary" class="mr-4" @click="openDialog()">Create User</v-btn>
          </v-col>
    </v-row>
    <v-row>
      <UserDialog :userDialog="userDialog"></UserDialog>
    </v-row>
  </div>
    
    
</template>

<script>
import {mapActions} from "vuex";
import UserDialog from "./UserDialog.vue"
export default {
  data(){
    return{
      userDialog: false,
    }
  },
  components:{
    UserDialog,
  },
  computed:{
    
  },
  methods:{
    ...mapActions(["openDialog"]),
    openCreateUserDialog(){
      this.userDialog = true;
    }
  },
}
</script>