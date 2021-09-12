import axios from 'axios';

const state = {
    users:[],
    userDialog: false,
    editEnabled: false,
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

    async editUserDetails({commit}, id){
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
            'name':'',
            'username':'',
            'phone':'',
            'website':'EditedUserDataArray.website',
            'email':'EditedUserDataArray.email',
        });
        const value3 = true;
        commit('dialogStatus',value3);
        console.log(response.data);
        const value2 = true;
        commit('editEnable',value2);
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
        commit('addUser', response.data);
        }
};

const mutations = {
    setUsers: (state, users) => (state.users = users),
    removeUser: (state,id) => state.users = state.users.filter((user) => user.id !== id),
    addUser: (state,newUser) => state.users.unshift(newUser),
    dialogStatus: (state,value) => (state.userDialog = value),
    editEnable: (state,value1) => (state.editEnabled = value1),

};


export default {
    state,
    getters,
    actions,
    mutations
}