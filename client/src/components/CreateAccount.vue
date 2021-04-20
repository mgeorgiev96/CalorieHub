<template>
    <form action="/create-account" method="POST" class="login_container">
        <img class='logo_img' src="../assets/images/logo_calorie.png">
        <v-text-field
            label="Email..."
            outlined
            dense
            v-model="email"
            type="email"
            name='username'
        ></v-text-field>
        <v-text-field
            label="Password..."
            outlined
            dense
            v-model="password"
            type="password"
            name='password'
        ></v-text-field>
                <v-text-field
            label="Name..."
            outlined
            dense
            v-model="name"
            type="text"
            name='name'
        ></v-text-field>
        <v-btn type="submit">Sign Up</v-btn>
        <br>
         <p>No account? <span @click="changePage">Sign In.</span></p>
    </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: "CreateAccount",
    methods: {
        ...mapActions(['changePage'])
    },
        data: ()=>{
        return {
            email: '',
            password:'',
            name: ''
        }
    }
}
</script>
<style scoped>
span{
    font-weight: bold;
    cursor: pointer;
}
.login_container .logo_img{
    width: 270px;
    height: 270px;
    margin: 20px auto;
}
.login_container .v-text-field{
    width: 60%;
    margin: 0 auto;
}
</style>