<template>
<div class="progress_container">
    <div class="personal_info">
        <div class="logo_container">
            <div class="logo_container_image">
            </div>
        </div>
        <h4 style="margin: 20px auto;">{{getUser.name}}</h4>
        <div class="inner_container">
            <div v-if="editable.weight" class="field_option"><h4>Weight: {{getUser.personal.weight}}kg</h4><i @click="()=> editable.weight = !editable.weight" class="fas fa-edit"></i></div>
            <div v-else class="field_option">
                <input type="number" @keypress="(e)=>onlyNumberKey(e)" v-model="weight" class="form-control" :placeholder="getUser.personal.weight"  aria-describedby="addon-wrapping">
                <i @click="()=> editPersonal('weight',weight)" class="fas fa-save"></i>
            </div>
            <div v-if="editable.weightGoal" class="field_option"><h4>Weight Goal: {{getUser.personal.goalWeight}} kg</h4><i @click="()=> editable.weightGoal = !editable.weightGoal" class="fas fa-edit"></i></div>
            <div v-else class="field_option">
                <input type="number" @keypress="(e)=>onlyNumberKey(e)" v-model="goalWeight" class="form-control" :placeholder="getUser.personal.goalWeight"  aria-describedby="addon-wrapping">
                <i @click="()=> editPersonal('goalWeight',goalWeight)" class="fas fa-save"></i>
            </div>
            <div v-if="editable.calories" class="field_option"><h4>Calories: {{getUser.personal.calories}}</h4><i @click="()=> editable.calories = !editable.calories" class="fas fa-edit"></i></div>
            <div v-else class="field_option">
                <input type="number" @keypress="(e)=>onlyNumberKey(e)" v-model="calories" class="form-control" :placeholder="getUser.personal.calories"  aria-describedby="addon-wrapping">
                <i @click="()=> editPersonal('calories',calories)" class="fas fa-save"></i>
            </div>
            <div v-if="editable.protein" class="field_option"><h4>Protein: {{getUser.personal.protein}}g</h4><i @click="()=> editable.protein = !editable.protein" class="fas fa-edit"></i></div>
            <div v-else class="field_option">
                <input @keypress="(e)=>onlyNumberKey(e)" type="number" v-model="protein" class="form-control" :placeholder="getUser.personal.protein"  aria-describedby="addon-wrapping">
                <i @click="()=> editPersonal('protein',protein)" class="fas fa-save"></i>
            </div>
            <div v-if="editable.carbs" class="field_option"><h4>Carbs: {{getUser.personal.carbs}}g</h4><i @click="()=> editable.carbs = !editable.carbs" class="fas fa-edit"></i></div>
            <div v-else class="field_option">
                <input @keypress="(e)=>onlyNumberKey(e)" type="number" v-model="carbs"  class="form-control" :placeholder="getUser.personal.carbs"  aria-describedby="addon-wrapping">
                <i @click="()=> editPersonal('carbs',carbs)" class="fas fa-save"></i>
            </div>
            <div v-if="editable.fats" class="field_option"><h4>Fats: {{getUser.personal.fat}}g</h4><i @click="()=> editable.fats = !editable.fats" class="fas fa-edit"></i></div>
            <div v-else class="field_option">
                <input @keypress="(e)=>onlyNumberKey(e)" type="number" v-model="fat" class="form-control" :placeholder="getUser.personal.fat"  aria-describedby="addon-wrapping">
                <i @click="()=> editPersonal('fat',fat)" class="fas fa-save"></i>
            </div>
            <div v-if="editable.water" class="field_option"><h4>Water: {{getUser.personal.water}}ml</h4><i @click="()=> editable.water = !editable.water" class="fas fa-edit"></i></div>
            <div v-else class="field_option">
                <input @keypress="(e)=>onlyNumberKey(e)" type="number" v-model="water" class="form-control" :placeholder="getUser.personal.water"  aria-describedby="addon-wrapping">
                <i @click="()=> editPersonal('water',water)" class="fas fa-save"></i>
            </div>
            </div>
    </div>
    <div class="multi-chart-container">
        <PieChart/>
    </div>
</div>
</template>

<script>
import PieChart from '../components/PieChart'
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'
export default {
    name: 'Progress',
    components: {PieChart},
    computed: {...mapGetters(['getUser'])},
    methods: {
        ...mapActions(['setUser']),
        editPersonal: (type,value)=>{
            axios.post('/edit-personal',{type,value}).then(()=>{
                window.location.reload()
            })
        }
    },
    data: ()=>{
        return {
            weight: 0,
            goalWeight: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
            calories: 0,
            water: 0,
            editable:{
                name: true,
                age: true,
                weight: true,
                weightGoal: true,
                calories: true,
                protein: true,
                carbs: true,
                fats: true,
                water: true
            },
             onlyNumberKey : (evt)=>{
                if (!evt.key.match(/\d/)){
                    evt.preventDefault();
                }
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.progress_container{
    width: 70%;
    height: 75.5vh;
    border: 3px solid black;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    margin: 2% auto;
}
.personal_info{
    width: 100%;
    border-right: 2px solid black;
    overflow: auto;
    font-family: 'Exo', sans-serif!important;
    display: flex;
    flex-flow: column;
    justify-content: start;
    .logo_container{
        width: 100%;
        height: 200px;
        margin: 0 0 20px 0;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid lightgrey;
        .logo_container_image{
            height: 150px;
            width: 150px;
            background-image: url('https://i.imgur.com/bOE9fOC.png');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            margin-top: 20px;
        }
    }
    .inner_container{

    }
}
.field_option{
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin: 10px auto;
}
.field_option{
    input{
        font-size: 1.3rem;
        border: 1px solid black;
        width: 56%;
    }
    i{
        margin-left: 10px;
        margin-top: 10px;
        cursor: pointer;
    }
}
</style>
