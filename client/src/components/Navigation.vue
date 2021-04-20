<template>
<nav class="navbar">
	<div class="container-fluid">
		<!-- Nav Header -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse-1" aria-expanded="false">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
      <router-link v-for="item in items" :key="item.name" class="navbar-brand" :to="getUser ? item.name : '/calculator'"><span :class="item.icon"></span><span class="link"> {{item.name[0].toUpperCase() + item.name.slice(1,)}}</span></router-link>
	  <a  class="navbar-brand" :href="getUser ? '/logout' : '#'"><span class="fas fa-sign-out-alt"></span><span class="link">Logout</span></a>
		</div>
    <h2>CalorieHub</h2>
	</div>
</nav>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'
  export default {
      name: 'Navigation',
      methods: {...mapActions(['retrieveKeys','setUser','retrieveKeys','setCalorieChart'])},
	  computed: {...mapGetters(['getUser'])},
        data () {
            return {
            tab: null,
            items: [
                {name:'calculator',icon:"fas fa-calculator"},
                {name:'meals',icon:"fas fa-hamburger"},
                {name:'progress',icon:"fas fa-chart-pie"},
                {name:'favorites',icon:"fas fa-heart"}
            ]
            }
        },
		created() {
			axios.get('/info').then(res=>{
				this.setUser(res.data.user)
				this.retrieveKeys(res.data.keys)
				if(res.data.user){
					this.setCalorieChart(res.data.user.personal)
				}
			})
		},
  }
</script>
<style lang='scss' scoped>
.v-application .display-3{
  font-family: 'Abril Fatface', cursive;
}

.navbar{
  width: 100vw!important;
  height: 90px;
}
.navbar h2{
  color:white;
  margin-right: 2%;
}

a{
  text-decoration: none;
  color: white!important;
}
a:visited{
  color: white;
}
@import url('https://fonts.googleapis.com/css?family=Roboto');

// Body
body {
	margin: 10%;
	color: white;
	background: #111111;
	font-family: 'Roboto', sans-serif;
}


// Navbar
.navbar {
	border: 0;
	border-radius: 0;
	background: linear-gradient(to right, #29AB87, #004B49);
	.nav li > a, .navbar-brand {
		max-height: 50px;
		width: auto;
		background: transparent !important;
		font-size: 18px;
		transition: 0.2s ease-in-out;
		&:hover{
			background-color: rgba(255,255,255,0.2);
			font-size: 14px;
			.link {
				width: 100%;
				padding: 0 5px 0 5px;
				visibility: visible;
				font-size: 14px;
			}
		}
	}
	.link {
		width: 0;
		font-family: 'Roboto', sans-serif;
		transition: 0.2s ease-in-out;
		visibility: hidden;
		font-size: 0px;
	}
	span {
		color: white;
	}
	.navbar-toggle {
		padding-right: 0;
		.icon-bar {
			background: white;
		}
	}
	.navbar-collapse {
		display: none;
	}
	button {
		background: transparent;
	}
	button[type=submit] {
		padding-right: 0;
		span {
			transition: 0.3s ease-in-out;
		}
		&:hover {
			span {
				transform: scale(1.3) rotate(90deg);
			}
		}
	}
	form {
		padding: 0;
		.form-control {
			border: 0;
			border-radius: 0;
			color: black;
			font-weight: bold;
			background: rgba(255,255,255,0.7);
			transition: 0.2s ease-in-out;
			&:hover {
				background: white;
			}
		}
	}
}

</style>
