import axios from 'axios';

const state = {
    users:[],
    userDialog: false,
    editEnabled: false,
    selectedId: "",
};
// getting the state
const getters = {
    allUsers: (state) => {
        return state.users
    },
    getDialogStatus: (state)=>{
        return state.userDialog
    },
    getEditBtnStatus: (state)=>{
        return state.editEnabled
    },
    getSelectedId: (state)=>{
        return state.selectedId
    }
};

const actions = {
    async fetchUsers({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        commit('setUsers', response.data);
    },

    async openDialog({commit}){
        const value = true;
        commit('dialogStatus',value);
        const value4 = false;
        commit('editEnable', value4);
    },

    async deleteUsers( {commit}, id){
        if(confirm("Are u sure to delete this user?")){
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            commit('removeUser', id);
        }
   
    },

    async addUser( {commit}, UserDataEmptyArray){
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        "id": UserDataEmptyArray.id,
        "name": UserDataEmptyArray.Name,
        "username": UserDataEmptyArray.username,
        "email": UserDataEmptyArray.email,
        "address": {
          "street": "Dayna Park",
          "suite": "Suite 449",
          "city": "Bartholomebury",
          "zipcode": "76495-3109",
          "geo": {
            "lat": "24.6463",
            "lng": "-168.8889"
          }
        },
        "phone": UserDataEmptyArray.phone,
        "website": UserDataEmptyArray.website,
        "company": {
          "name": "Yost and Sons",
          "catchPhrase": "Switchable contextually-based project",
          "bs": "aggregate real-time technologies"
        }});
    console.log(response.data);
    commit('addUser', response.data);
    const value1 = false;
    commit('dialogStatus',value1);
    const value4 = false;
    commit('editEnable', value4);
    },

    async editUserDetails({commit},id){
        console.log(id);
        const ID = id;
        commit('rowId',ID);
        const value2 = true;
        commit('dialogStatus', value2);
        const value3 = true;
        commit('editEnable', value3);
    },

    async UpdateUser({commit}, updatedUserDetails){
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUserDetails.id}`, updatedUserDetails );
        console.log(response.data);
        commit('updatedUser', response.data);
        const value1 = false;
    commit('dialogStatus',value1);
    const value4 = false;
    commit('editEnable', value4);
    },

    

    
};

const mutations = {
    setUsers: (state, users) => (state.users = users),
    removeUser: (state,id) => state.users = state.users.filter((user) => user.id !== id),
    addUser: (state,newUser) => state.users.unshift(newUser),
    dialogStatus: (state,value) => (state.userDialog = value),
    editEnable: (state,value1) => (state.editEnabled = value1),
    rowId: (state,id) => (state.selectedId = id),
    updatedUser(state, updatedUserDetails){
        const index = state.users.findIndex( x => x.id === updatedUserDetails.id)

        if(index!==-1){
            state.users.splice(index,1,updatedUserDetails);
        }
    }

};


export default {
    state,
    getters,
    actions,
    mutations
}