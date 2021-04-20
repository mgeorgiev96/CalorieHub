import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        APP_ID: "",
        APP_KEY: '',
        nutrition: {},
        image: undefined,
        ingredients: [],
        page: true,
        chartCalories: '',
        chartProtein: '',
        chartCarbs: '',
        chartFats: '',
        chartWater: '',
        user: {
            personal: {
                meals: 0,
                weight: 0,
                goalWeight: 0,
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                water: 0
            }
        },
        favourite: '',
    },
    actions:{
        retrieveNutrition({commit},criteria){
            if(criteria !== ""){
                axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${criteria}&app_id=${this.state.APP_ID}&app_key=${this.state.APP_KEY}`).then(res=>{
                    if(res.data.hints.length > 0){
                        commit('saveNutrition',res.data)
                    }else{
                        commit('saveNutrition',[])
                    }
                })
            }
        },
        retrieveKeys({commit},keys){
            commit('saveKeys',keys)
        },
        addIngredient({commit},ingredient){
            commit('saveIngredient',ingredient)
        },
        removeIngredient({commit},id){
            commit('removeIng',id)
        },
        changePage({commit}){
            commit('swapPage')
        },
        setCalorieChart({commit},data){
            commit('stateChartCalories',data)
        },
        setFavourite({commit},item){
            commit('writeFavourite',item)
        },
        setUser({commit},user){
            commit('saveUser',user)
        }
    },
    mutations:{
        saveNutrition(state,data){
            if(data.hints){
                state.nutrition = data.hints
                state.image = data.parsed[0].food.image
            }else{
                state.nutrition = []
                state.image = undefined
            }
        },
        saveKeys(state,keys){
            state.APP_ID = keys.APP_ID
            state.APP_KEY = keys.APP_KEY
        },
        saveIngredient(state,ingredient){
            state.ingredients.push(ingredient)
        },
        removeIng(state,id){
            state.ingredients = state.ingredients.filter(i=>i.id!==id)
        },
        swapPage(state){
            state.page = !state.page
        },
        stateChartCalories(state,data){
            let calories = parseInt(data.calories)
            let consumedCalories = parseInt(data.consumedCalories)
            let water = parseInt(data.water)
            let consumedWater = parseInt(data.consumedWater)
            let protein = parseInt(data.protein)
            let consumedProtein = parseInt(data.consumedProtein)
            let carbs = parseInt(data.protein)
            let consumedCarbs = parseInt(data.consumedCarbs)
            let fats = parseInt(data.fat)
            let consumedFat = parseInt(data.consumedFat)

            state.chartCalories = `background:conic-gradient(green 0 ${(consumedCalories/calories) * 100}%,white 0 ${((calories - consumedCalories)/calories) * 100}%);`
            state.chartWater = `background:conic-gradient(blue 0 ${(consumedWater/water) * 100}%,white 0 ${((water - consumedWater)/water) * 100}%);`
            state.chartProtein = `background:conic-gradient(blue 0 ${(consumedProtein/protein) * 100}%,white 0 ${((protein - consumedProtein)/calories) * 100}%);`
            state.chartCarbs = `background:conic-gradient(red 0 ${(consumedCarbs/carbs) * 100}%,white 0 ${((carbs - consumedCarbs)/calories) * 100}%);`
            state.chartFats = `background:conic-gradient(orange 0 ${(consumedFat/fats) * 100}%,white 0 ${((fats - consumedFat)/calories) * 100}%);`
        },
        writeFavourite(state,item){
            state.favourite = item
        },
        saveUser(state,user){
            state.user = user
        }
    },
    getters:{
        getNutrition: (state)=>{
            return state.nutrition
        },
        getImage: (state)=>{
            return state.image
        },
        getIngredients: (state)=>{
            return state.ingredients
        },
        getPage: (state)=>{
            return state.page
        },
        getChartCalories:(state)=>{
            return state.chartCalories
        },
        getChartProtein:(state)=>{
            return state.chartProtein
        },
        getChartCarbs:(state)=>{
            return state.chartCarbs
        },
        getChartFats:(state)=>{
            return state.chartFats
        },
        getChartWater:(state)=>{
            return state.chartWater
        },
        getFavourites: (state)=>{
            return state.favourites
        },
        getFavourite: (state)=>{
            return state.favourite
        },
        getUser: (state)=>{
            return state.user
        }
    }
})

export default store