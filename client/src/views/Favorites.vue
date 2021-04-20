<template>
    <div class="favorites_container">
        <div class="category" style='background: #ffdecb;'>
            <h4>MEAT  <i class="fas fa-drumstick-bite"></i></h4>
            <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name 100(g)
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
                        <th class="text-left">
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr v-for="item in getUser.favourites" :key="item.id" :style="item.mealType==='meat'?'':'display:none'">
                                <td>{{item.name}}</td>
                                <td>{{item.calories.toFixed(2)}}</td>
                                <td>{{item.fat.toFixed(2)}}</td>
                                <td>{{item.carbs.toFixed(2)}}</td>
                                <td>{{item.protein.toFixed(2)}}</td>
                                <td><i @click="()=> removeFavourite(item.id)" class="fas fa-times"></i></td>
                            </tr>
                    </tbody>
                    </template>
                </v-simple-table>
        </div>
        <div class="category" style='background: #90EE90;'>
            <h4>FRUITS  <i class="fas fa-apple-alt"></i></h4>
            <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name 100(g)
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
                        <th class="text-left">
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr v-for="item in getUser.favourites" :key="item.id" :style="item.mealType==='fruit'?'':'display:none'">
                                <td>{{item.name}}</td>
                                <td>{{item.calories.toFixed(2)}}</td>
                                <td>{{item.fat.toFixed(2)}}</td>
                                <td>{{item.carbs.toFixed(2)}}</td>
                                <td>{{item.protein.toFixed(2)}}</td>
                                <td><i @click="()=> removeFavourite(item.id)" class="fas fa-times"></i></td>
                            </tr>
                    </tbody>
                    </template>
                </v-simple-table>
        </div>
        <div class="category" style='background:#FFF8DC;'>
            <h4>VEGIES  <i class="fas fa-carrot"></i></h4>
            <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name 100(g)
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
                        <th class="text-left">
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr v-for="item in getUser.favourites" :key="item.id" :style="item.mealType==='veggie'?'':'display:none'">
                                <td>{{item.name}}</td>
                                <td>{{item.calories.toFixed(2)}}</td>
                                <td>{{item.fat.toFixed(2)}}</td>
                                <td>{{item.carbs.toFixed(2)}}</td>
                                <td>{{item.protein.toFixed(2)}}</td>
                                <td><i @click="()=> removeFavourite(item.id)" class="fas fa-times"></i></td>
                            </tr>
                    </tbody>
                    </template>
                </v-simple-table>
        </div>
        <div class="category" style='background:#CFF6FF;'>
            <h4>FISH  <i class="fas fa-fish"></i></h4>
            <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name 100(g)
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
                        <th class="text-left">
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr v-for="item in getUser.favourites" :key="item.id" :style="item.mealType==='fish'?'':'display:none'">
                                <td>{{item.name}}</td>
                                <td>{{item.calories.toFixed(2)}}</td>
                                <td>{{item.fat.toFixed(2)}}</td>
                                <td>{{item.carbs.toFixed(2)}}</td>
                                <td>{{item.protein.toFixed(2)}}</td>
                                <td><i @click="()=> removeFavourite(item.id)" class="fas fa-times"></i></td>
                            </tr>
                    </tbody>
                    </template>
                </v-simple-table>
        </div>
        <div class="category" style='background:#F08080'>
            <h4>NUTS  <img src="https://img.icons8.com/ios-glyphs/30/000000/nut.png"/></h4>
            <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name 100(g)
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
                        <th class="text-left">
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr v-for="item in getUser.favourites" :key="item.id" :style="item.mealType==='nut'?'':'display:none'">
                                <td>{{item.name}}</td>
                                <td>{{item.calories.toFixed(2)}}</td>
                                <td>{{item.fat.toFixed(2)}}</td>
                                <td>{{item.carbs.toFixed(2)}}</td>
                                <td>{{item.protein.toFixed(2)}}</td>
                                <td><i @click="()=> removeFavourite(item.id)" class="fas fa-times"></i></td>
                            </tr>
                    </tbody>
                    </template>
                </v-simple-table>
        </div>
                <div class="category" style='background:#FF6347;'>
            <h4>OTHER  <i class="fas fa-hamburger"></i></h4>
            <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name 100(g)
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
                        <th class="text-left">
                        </th>
                        </tr>
                        
                    </thead>
                    <tbody>
                            <tr v-for="item in getUser.favourites" :key="item.id" :style="item.mealType==='other' || item.mealType === ''?'':'display:none'">
                                <td>{{item.name}}</td>
                                <td>{{item.calories.toFixed(2)}}</td>
                                <td>{{item.fat.toFixed(2)}}</td>
                                <td>{{item.carbs.toFixed(2)}}</td>
                                <td>{{item.protein.toFixed(2)}}</td>
                                <td><i @click="()=> removeFavourite(item.id)" class="fas fa-times"></i></td>
                            </tr>
                    </tbody>
                    </template>
                </v-simple-table>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
    name: 'Favourites',
    computed: {...mapGetters(['getFavourites','getUser'])},
    data: ()=>{
        return {
            removeFavourite: (id)=>{
                axios.post('/remove-favourite',{id}).then(()=>{
                    window.location.reload()
                })
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.fa-times{
    cursor: pointer;
}
.fa-times:hover{
    color: red;
    transition: 200ms;
}
.fa-times:active{
    transform: scale(1.1);
}
.fa-plus-circle{
    position: absolute;
    color: red;
}
.favorites_container{
    width: 95%;
    height: 70vh;
    margin: 2% auto;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 1rem;
    .category{
        overflow: auto;
        height: 400px;
        border: 3px solid black;
        border-radius: 10px;
        padding: 0 5px;
        h4{
            width: 100%;
            text-align: center;
            margin-top: 8px;
        }
    }
}


.category::-webkit-scrollbar,
.category::-webkit-scrollbar-thumb{
  width: 26px;
  background-clip: padding-box;
  border: 10px solid transparent;
}
.category::-webkit-scrollbar-thumb{
  box-shadow: inset 0 0 0 10px;
}

</style>
