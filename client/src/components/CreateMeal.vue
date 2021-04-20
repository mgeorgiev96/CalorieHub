<template>
  <div class="text-left" :style="position">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <i
          class="fas fa-plus-circle"
          v-bind="attrs"
          v-on="on"
          :style="icon"
        >
        </i>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Create Meal or Save to Progress
        </v-card-title>

        <v-card-text>
            <form style="margin-top:20px">
                        <v-text-field
                          label="Meal Name..."
                          outlined
                          dense
                          v-model="mealName"
                        ></v-text-field>
                                <v-select
                                :items="items"
                                filled
                                label="Type"
                                value='Breakfast'
                                v-model="mealType"
                              ></v-select>
                <template>
                    <v-card
                      max-width="600"
                      class="mx-auto"
                    >

                      <v-list two-line subheader>
                        <v-subheader inset>Ingredients</v-subheader>

                        <v-list-item
                          v-for="item in getIngredients"
                          :key="item.id"
                        >
                          <v-list-item-avatar>
                                  <div v-if="item.image===undefined" :style="{'background-image':`url(https://cdn.vuetifyjs.com/images/cards/cooking.png)`}"></div>
                                  <div v-else :style="{'background-image':`url(${item.image})`}"></div>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                            <v-list-item-subtitle>{{item.grams}} g</v-list-item-subtitle>
                            <span>{{item.calories}} kcal</span>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-btn icon>
                              <i @click="()=>removeIngredient(item.id)" class="far fa-times-circle"></i>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </template>
            </form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="saveMeal"
          >
            Create
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="saveNutrition"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import axios from 'axios'
import uuid from 'uuid/v4'

  export default {
    name: 'CreateMeal',
    computed: {...mapGetters(['getIngredients','getUser'])},
    methods: {...mapActions(['removeIngredient','setUser','setCalorieChart'])},
    props: ['position','icon'],
    data () {
      return {
        dialog: false,
        mealName: '',
        mealType: '',
        saveMeal: ()=>{
          let calories = 0
          let carbs = 0
          let protein = 0
          let fat = 0
          this.getIngredients.map(i=>{
            calories += Math.ceil(i.calories)
            carbs += Math.ceil(i.carbs)
            protein += Math.ceil(i.protein)
            fat += Math.ceil(i.fat)
          })
          axios.post('/create-meal',{
            username: this.getUser.username,
            mealName:this.mealName,
            mealType: this.mealType,
            calories,
            protein,
            carbs,
            fat,
            ingredients: this.getIngredients,
            id: uuid()

          }).then(res=>{
            this.setUser(res.data)
            this.dialog = false
          })
        },
        saveNutrition: ()=>{
          let calories = 0
          let carbs = 0
          let protein = 0
          let fat = 0
          this.getIngredients.map(i=>{
            calories += Math.ceil(i.calories)
            carbs += Math.ceil(i.carbs)
            protein += Math.ceil(i.protein)
            fat += Math.ceil(i.fat)
          })
          axios.post('/save-progress',{
            mealName:this.mealName,
            mealType: this.mealType,
            calories,
            protein,
            carbs,
            fat,
            ingredients: this.getIngredients,
            id: uuid()

          }).then(res=>{
            this.setUser(res.data)
            this.setCalorieChart(res.data.personal)
            this.dialog = false
          })
        },
        items: ['Breakfast','Lunch','Dinner','Snack']
      }
    },
  }
</script>
<style scoped>
.v-list{
  height: 400px;
  overflow: auto;
}
.fa-times-circle:hover{
  color: red;
  transition: 200ms;
  transform: scale(1.05);
}
.fa-times-circle:active{
  transition: 150ms;
  transform: scale(1.20);
}
.fa-plus-circle{
  font-size: 1.2rem;
  color: #98fb98;
  position: relative;
}
.fa-plus-circle::after{
  content: 'Create Meal';
  position: absolute;
  top: -9px;
  left: -100px;
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
.fa-plus-circle:hover::after{
  opacity: 1;
}
</style>