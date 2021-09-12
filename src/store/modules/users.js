import axios from 'axios';

const state = {
    users:[],
    userDialog: false,
};
// getting the state
const getters = {
    allUsers: (state) => {
        return state.users
    },
    getDialogStatus: (state)=>{
        return state.userDialog
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
    },

    async deleteUsers( {commit}, id){
        if(confirm("Are u sure to delete this user?")){
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

            commit('removeUser', id);
        }
   
    },

    async addUser( {commit}, UserDataEmptyArray){
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        'name':UserDataEmptyArray.Name,
        'username':UserDataEmptyArray.surname,
        'phone':UserDataEmptyArray.phone,
        'website':UserDataEmptyArray.website,
        'email':UserDataEmptyArray.email,
    })
    console.log(response.data);
    commit('addUser', response.data);
    const value1 = false;
    commit('dialogStatus',value1);
    },

    async updateUser( {commit}, EditedUserDataArray){
        const response = await axios.put('https://jsonplaceholder.typicode.com/users', {
            'name':EditedUserDataArray.Name,
            'username':EditedUserDataArray.surname,
            'phone':EditedUserDataArray.phone,
            'website':EditedUserDataArray.website,
            'email':EditedUserDataArray.email,
        })
        console.log(response.data);
        // this.$emit('onCreate',userDialog);
        commit('addUser', response.data);
        // commit('dialogStatus',state.userDialog);
        // console.log(state.userDialog);
        }
};

const mutations = {
    setUsers: (state, users) => (state.users = users),
    removeUser: (state,id) => state.users = state.users.filter((user) => user.id !== id),
    addUser: (state,newUser) => state.users.unshift(newUser),
    dialogStatus: (state,value) => (state.userDialog = value),
};


export default {
    state,
    getters,
    actions,
    mutations
}