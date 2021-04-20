<template>
    <div class="meals_container">
        <div class="options_container">
            <div class="option" v-for="item in items" :key="item.name">
                <v-btn @click="()=>selectedPage = item.name">{{item.name}}</v-btn>
                <i :class="selectedPage === item.name ? 'fas fa-utensils selectedIcon'  : 'fas fa-utensils'" ></i>
            </div>
        </div>
        <div class="content_container">
            <div>
                  <v-simple-table dark>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Meal
                        </th>
                        <th class="text-left">
                            Calories
                            <i class="fas fa-fire"></i>
                        </th>
                        <th class="text-left">
                            Fat (g)
                            <i class="fas fa-bacon"></i>
                        </th>
                        <th class="text-left">
                            Carbs (g)
                            <i class="fas fa-bread-slice"></i>
                        </th>
                        <th class="text-left">
                            Protein (g)
                            <i class="fas fa-drumstick-bite"></i>
                        </th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in getUser.meals" :key="item.id"
                         :style="item.mealType === selectedPage || selectedPage==='Snack' && item.mealType === '' ?  null: {display: 'none'}">
                        <td>{{ item.mealName }}</td>
                        <td>{{ item.calories }}</td>
                        <td>{{ item.fat }}</td>
                        <td>{{ item.carbs }}</td>
                        <td>{{ item.protein }}</td>
                        <td><i @click="()=> removeMeal(item.id)" class="far fa-times-circle"></i></td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import axios from 'axios'
export default {
    name:'Meals',
    methods: {...mapActions(['setUser'])},
    computed: {...mapGetters(['getUser'])},
    data: ()=>{
        return {
            selectedPage: 'Breakfast',
            styles:{
                color: 'white'
            },
            items: [
                {name:'Breakfast'},
                {name:'Lunch'},
                {name:'Dinner'},
                {name:'Snack'}
            ],
            removeMeal: (id)=>{
                axios.post('/remove-meal',{id}).then(()=>{
                    window.location.reload()
                })
            }
        }
    }
}
</script>

<style scoped>
.fa-times-circle{
    cursor: pointer;
}
.fa-times-circle:hover{
    color: red;
    transition: 200ms;
    transform: scale(1.1);
}

.meals_container{
    width: 80%;
    margin: 2% auto;
    background: white;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    height: 70%;
    border-radius: 10px;
}
.meals_container .options_container{
    width: 100%;
    display: flex;
    flex-flow: column;
    background: white;
    justify-content: space-between;
    align-items: start;
}
.meals_container .options_container .v-btn{
    width: 140px;
    font-size: 1.2rem;
    padding: 15px!important;
    margin: 10px 0;
}
.meals_container .content_container{
    width: 200%;
    border-radius: 10px;
    overflow-x: auto;
}
.meals_container .content_container h2{
    width: 100%;
    text-align: center;
    margin: 10px 0;
}

.fa-utensils{
    margin-left: 20px;
    font-size: 1.2rem;
    color: white
}
.selectedIcon{
    color: black;
}
</style>