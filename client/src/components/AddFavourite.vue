<template>
  <div class="text-left" :style="position">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <i
          class="fas fa-heart"
          v-bind="attrs"
          v-on="on"
          :style="icon"
          @click="()=>logInfo(favouriteItem)"
        >
        </i>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Add Favourite
        </v-card-title>

        <v-card-text>
            <form style="margin-top:20px">
                                <v-select
                                :items="items"
                                filled
                                label="Type"
                                value='Breakfast'
                                v-model="mealType"
                              ></v-select>
            <p>Name 100g: {{getFavourite.name}}</p>
            <p>Calories: {{getFavourite.calories ? getFavourite.calories.toFixed(2): ''}}</p>
            <p>Protein: {{getFavourite.protein  ? getFavourite.protein.toFixed(2):''}}</p>
            <p>Carbs: {{getFavourite.carbs ? getFavourite.carbs.toFixed(2):''}}</p>
            <p>Fat: {{getFavourite.fat ? getFavourite.fat.toFixed(2) : ''}}</p>
            </form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="()=>saveFavourite(getFavourite)"
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
    computed: {...mapGetters(['getFavourite'])},
    methods: {...mapActions(['setFavourite','setUser'])},
    props: ['position','icon','favouriteItem'],
    data () {
      return {
        dialog: false,
        mealType: '',
        items: ['meat','fish','nut','veggie','fruit','other'],
        logInfo: (i)=> {
            this.setFavourite(i)
        },
        saveFavourite:(favourite)=>{
          axios.post('/save-favourite',{
            favourite: {...favourite,id:uuid(),mealType:this.mealType}
          }).then(res=>{
            this.setUser(res.data)
            this.dialog = false
          })
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
.fa-plus-circle{
  font-size: 1.2rem;
  color: #98fb98;
  position: relative;
}
.fa-heart{
    color: #98fb98;
}
</style>