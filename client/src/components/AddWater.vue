<template>
  <div class="water_button">
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
                          label="Water(ml)..."
                          outlined
                          dense
                          v-model="waterQty"
                          type="number"
                          @keypress="(e)=>onlyNumberKey(e)"
                        ></v-text-field>
                <template>
                  </template>
            </form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="addWater"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import axios from 'axios'

  export default {
    name: 'CreateMeal',
    computed: {...mapGetters(['getIngredients','getUser'])},
    methods: {...mapActions(['removeIngredient','setUser','setCalorieChart'])},
    props: ['position','icon'],
    data () {
      return {
        dialog: false,
        waterQty: '',
        addWater: ()=>{
            axios.post('/save-water',{water:Math.ceil(this.waterQty)}).then(res=>{
                    this.setUser(res.data)
                    this.setCalorieChart(res.data.personal)
                    this.dialog = false
            })
        },
        onlyNumberKey : (evt)=>{
            if (!evt.key.match(/\d/)){
                evt.preventDefault();
            }
        }
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
.water_button{
  position: absolute;
  top: 3px;
  left: 5px;
}
.fa-plus-circle{
  font-size: 1.2rem;
  color: black;
  position: relative;
}
.fa-plus-circle::after{
  content: 'Add Water';
  position: absolute;
  top: 0;
  right: -100px;
  color: white;
  font-size: 0.9rem;
  display: inline-block;
  background: black;
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