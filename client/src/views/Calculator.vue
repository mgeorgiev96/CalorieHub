<template>
  <div class="calorie_calculator">
    <div class="search_panel">
      <div v-if="getImage===undefined" class="background_image" :style="{'background-image':`url('https://i.imgur.com/YWXaTQy.jpg')`}"></div>
      <div v-else class="background_image" :style="{'background-image':`url(${getImage})`}"></div>
      <h3 style="margin: 20px 0">Search Food</h3>
      <form @submit="(e)=>e.preventDefault()">
          <v-text-field
            label="Food..."
            placeholder="Food..."
            outlined
            dense
            v-model="criteria"
          ></v-text-field>
          <v-btn @click="()=>retrieveNutrition(criteria)" dark>Search</v-btn>
      </form>
      <div class="info_box">
        To use the personal section, create meals, save information... <router-link to='/'>Sign</router-link> into your account.
      </div>
    </div>
    <div class="information_panel">
      <template>
          <v-simple-table dark>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Name <input @keydown="(e)=>inputRules(e)"  pattern="\d*" maxlength="4" type="number" v-model="grams" min="0" max="1000">(g)
                  </th>
                  <th class="text-left">
                    Calories
                    <i class="fas fa-fire"></i>
                  </th>
                  <th class="text-left">
                    Fat(g)
                    <i class="fas fa-bacon"></i>
                  </th>
                  <th class="text-left">
                    Carb(g)
                    <i class="fas fa-bread-slice"></i>
                  </th>
                  <th class="text-left">
                    Protein(g)
                    <i class="fas fa-drumstick-bite"></i>
                  </th>
                  <th class="text-left" v-if="getUser">
                    <CreateMeal/>
                  </th>
                  <th class="text-left">
                  </th>
                </tr>
              </thead>
              <tbody>
                        <tr v-for="item in getNutrition" :key="item.food.foodId + generateID()">
                          <td>{{item.food.label}}</td>
                          <td>{{item.food.nutrients.ENERC_KCAL ? ((item.food.nutrients.ENERC_KCAL / 100) * grams).toFixed(2) : ''}}</td>
                          <td>{{item.food.nutrients.FAT ? ((item.food.nutrients.FAT / 100) * grams).toFixed(2) : '0'}}</td>
                          <td>{{item.food.nutrients.CHOCDF ? ((item.food.nutrients.CHOCDF / 100) * grams).toFixed(2) : '0'}}</td>
                          <td>{{item.food.nutrients.PROCNT ? ((item.food.nutrients.PROCNT / 100) * grams).toFixed(2) : '0'}}</td>
                          <td v-if="getUser"><i @click="(e)=>logInfo(e)" class="fas fa-plus"></i></td>
                          <td v-else></td>
                          <td v-if="getUser"><AddFavourite :favouriteItem="{name: item.food.label,calories: item.food.nutrients.ENERC_KCAL,fat: item.food.nutrients.FAT ,protein: item.food.nutrients.PROCNT,carbs: item.food.nutrients.CHOCDF,id: generateID()}"/></td>
                        </tr>
              </tbody>
            </template>
          </v-simple-table>
      </template>
    </div>
  </div>
</template>


<script>

import {mapActions,mapGetters} from 'vuex'
import CreateMeal from '../components/CreateMeal'
import uuid from 'uuid/v4'
import AddFavourite from '../components/AddFavourite'

export default {
    name: 'Calculator',
    methods: {...mapActions(['retrieveNutrition','addIngredient'])},
    computed:{...mapGetters(['getNutrition','getImage','getUser'])},
    components: {CreateMeal,AddFavourite},
  data () {
    return {
      criteria:'',
      grams: 100 ,
      generateID: ()=> uuid(),
      inputRules: (e)=>{
        if(parseInt(e.key) || e.key === '0'){
          if(parseInt(e.target.value + e.key) > 1000 || e.target.value.length + 1 > 4){
            this.grams = ''
          }
        }
      },
      logInfo: (e)=>{
        let target = e.target
        let name = target.parentElement.parentElement.children[0].innerHTML
        let calories = target.parentElement.parentElement.children[1].innerHTML
        let fat = target.parentElement.parentElement.children[2].innerHTML
        let carbs = target.parentElement.parentElement.children[3].innerHTML
        let protein = target.parentElement.parentElement.children[4].innerHTML
        let id = uuid()
        this.addIngredient({name,calories,fat,carbs,protein,id,grams:this.grams})
      }
    }
  },
}
</script>

<style scoped>
.calorie_calculator{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    width: 70vw;
    margin: 2% auto;
    background: white;
    height: 75vh;
    border-radius: 10px;
    grid-gap: 2rem;
    border: 3px solid black;
}
.search_panel{
 width: 100%;
 display: flex;
 flex-flow: column;
 text-align: center;
 border-right: 3px solid black;
}
.search_panel form{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.search_panel form .v-input__control{
  width: 80%!important;
}
.search_panel .background_image{
  height: 250px;
  width: 100%;
  background-position: center;
  background-size:cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  border-bottom: 2px solid black;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.information_panel{
width: 200%;
height: 100%;
overflow: auto;
height: 69vh;
margin-top: 13px;
border-radius: 10px;
}

tbody i{
  cursor: pointer;
  color: #98fb98;
}
.fa-plus{
  font-size: 1rem;
  color: #98fb98;
  position: relative;
}
.fa-plus:active{
  transform: scale(1.2);
  transition: 150ms;
}
.fa-plus::after{
  content: 'Add';
  position: absolute;
  top: -9px;
  left: -53px;
  color: black;
  font-size: 0.9rem;
  display: inline-block;
  background: #98fb98;
  padding: 3px 10px;
  border-radius: 15px;
  font-family: 'Titillium Web', sans-serif !important;
  opacity: 0;
  transition: 200ms;
  font-weight: normal;
}
.fa-plus:hover::after{
  opacity: 1;
}
.info_box{
  border: 1px solid lightgrey;
  width: 80%;
  border-radius: 15px;
  padding: 10px;
  margin: 20px auto;
}
input[type=number]{
  color: white;
  text-align: center;
}
.information_panel::-webkit-scrollbar,
.information_panel::-webkit-scrollbar-thumb{
  width: 26px;
  background-clip: padding-box;
  border: 10px solid transparent;
  background: white;
}
.information_panel::-webkit-scrollbar,
.information_panel::-webkit-scrollbar-thumb{
  width: 26px;
  background-clip: padding-box;
  border: 10px solid transparent;
  background: white;
}
.information_panel::-webkit-scrollbar-thumb{
  box-shadow: inset 0 0 0 10px;
}
.information_panel .post_container:hover{
  color: rgba(0, 0, 0, 0.3);
}
</style>