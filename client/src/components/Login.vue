<template>
    <form v-if="getPage" action="/login" method="POST" class="login_container">
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
        <v-btn type="submit">Login</v-btn>
        <p style="text-decoration:underline; margin: 10px 0;">OR</p>
        <v-btn dark><a href="/api/google" class="google_button">Login with Google</a></v-btn>
        <br>
        <p>No account? <span @click="changePage">Sign up here.</span></p>
    </form>
    <CreateAccount v-else/>
</template>

<script>
import CreateAccount from './CreateAccount'
import {mapGetters,mapActions} from 'vuex'
export default {
    name: "Login",
    components: {CreateAccount},
    computed: {...mapGetters(["getPage"])},
    methods: {
        ...mapActions(['changePage'])
    },
    data: ()=>{
        return {
            email: '',
            password:'',
            page: true
        }
    }
}
</script>

<style scoped>
.login_container{
    background: white;
    width: 28%;
    margin: 3% auto;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-flow: column;
    align-items: center;
    box-shadow: 0 0 5px lightgray ;
}
.login_container .v-text-field{
    width: 60%;
    margin: 0 auto;
}
.login_contaner .v-btn{
    align-self: center;
    margin: 0 auto;
    color: white;
}
.login_container .logo_img{
    width: 270px;
    height: 270px;
    margin: 20px auto;
}
.login_container .google_button{
    color: white;
    text-decoration: none;
}
.login_container .google_button:visited{
    color: white;
}
.login_container span{
    cursor: pointer;
    font-weight: bold;
}

</style>