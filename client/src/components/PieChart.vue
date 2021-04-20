<template>
<div class="multi-chart-container">
    <div class="date_container">
        <h4>{{date}}</h4>
    </div>
    <div style="border-bottom: 1px solid black;"></div>
    <div class="chart-container" style="background:#ffe5ad;">
        <h4>Calories  <i class="fas fa-drumstick-bite"></i></h4>
        <div class="pie-chart" :style="getChartCalories">
            <p>{{getUser.personal.consumedCalories}}/{{getUser.personal.calories}}</p>
            <div class="middle-chart" style="background:#ffe5ad"></div>
        </div>
    </div>
    <div class="chart-container" style="background:rgb(233,255,219)">
        <h4>Macros  <i class="fas fa-fire"></i></h4>
        <div class="macros_container">
            <div>
                <h6>Protein</h6>
                <div class="macro-chart" :style="getChartProtein">
                    <p>{{getUser.personal.consumedProtein}}/{{getUser.personal.protein}}</p>
                    <div class="middle-chart-macros"></div>
                </div>
            </div>
            <div>
                <h6>Carbs</h6>
                <div class="macro-chart" :style="getChartCarbs">
                    <p>{{getUser.personal.consumedCarbs}}/{{getUser.personal.carbs}}</p>
                    <div class="middle-chart-macros"></div>
                </div>
            </div>
            <div class="third-micro">
                <h6>Fat</h6>
                <div class="macro-chart" :style="getChartFats">
                    <p>{{getUser.personal.consumedFat}}/{{getUser.personal.fat}}</p>
                    <div class="middle-chart-macros"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="chart-container" style="background:#FFE4E1; border-bottom:none;">
        <h4>Weight  <i class="fas fa-weight"></i></h4>
        <div class="scale-chart">
             <table class="charts-css area" id="my-chart">
                <tbody>
                    <tr>
                    <td style="--start: 0.2; --size: 0.4"> <span class="data"><p>{{getUser.personal.weight}}kg</p><i class="far fa-circle"></i></span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.4; --size: 0.3"> <span class="data"><i class="far fa-circle"></i></span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.3; --size: 0.3"> <span class="data"><i class="far fa-circle"></i></span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.3; --size: 0.4"> <span class="data"><i class="far fa-circle"></i></span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.4; --size: 0.6"> <span class="data"><i class="far fa-circle"></i></span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.6; --size: 0.6"> <span class="data"><i class="far fa-circle"></i></span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.6; --size: 0.4"> <span class="data"><i class="far fa-circle"></i></span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.4; --size: 0.6"> <span class="data"><p>{{getUser.personal.goalWeight}}kg</p><i class="far fa-circle"></i></span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.6; --size: 0.3"> <span class="data"></span> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="chart-container" style="background-image: radial-gradient(#A8D8FF,#CFF6FF); border-bottom:none;">
        <h4><AddWater/>Water  <i class="fas fa-tint"></i></h4>
        <div class="pie-chart" :style="getChartWater"> 
            <p>{{getUser.personal.consumedWater}}/{{getUser.personal.water}}</p>
            <div class="middle-chart" style="background:#add8e6"></div>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import moment from 'moment'
import AddWater from '../components/AddWater'
export default {
    name: 'PieChart',
    components: {AddWater},
    methods: {
        ...mapActions(['setCalorieChart'])
    },
    computed: mapGetters(['getChartCalories','getChartProtein','getChartCarbs','getChartFats','getChartWater','getUser']),
    data: ()=>{
        return{
            date: moment(Date.now()).format('LL')
        }
    }
}
</script>


<style lang='scss' scoped>
.chart-container{
    text-align: center;
    border: 1px solid black;
    height: 100%;
    position: relative;
}
.multi-chart-container{
    display: grid;
    width: 200%;
    grid-template-columns: repeat(2,1fr);
    height: 75vh;
    .date_container{
        position: relative;
        padding: 20px 0;
        border-bottom: 1px solid black;
        h4{
            position: absolute;
            right: -15%;
            margin-left: 100px;
            bottom: 3%;
        }
    }
}

.third-micro{
    width: 200%;
}
.pie-chart{
    width: 202px;
    height: 202px;
    border-radius: 50%;
    border: 3px solid black;
    margin: 0 auto;
    position: relative;
    cursor: pointer;
    &:hover p{
        opacity: 1;
        left: -30%;
    }
    p{
        position: absolute;
        font-weight: bold;
        top: 0;
        left: -10%;
        opacity: 0;
        transition: 200ms;
    }
}

.charts-css{
    --color-1: rgb(221,160,221);
}
#area-example-2 {
  height: 200px;
  max-width: 100px;
  margin: 0 auto;
}
table{
    margin-top: 75.4px;
}
tbody{
    width: 80%;
}
td{
    p{
        width: 50px;
        position: absolute;
        left: -80%;
    }
    i{
      margin-top: 25px;
      color: white;
      background: black;
      border-radius: 50%;
    }
}
.scale-chart{
    width: 100%;
    height: 200px;
    position: relative;
    margin-bottom: 0;
}
.macros_container{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 1rem;
}

.macro-chart{
    width: 87px;
    height: 87px;
    border-radius: 50%;
    border: 3px solid black;
    margin: 0 auto;
    cursor: pointer;
    position: relative;
    &:hover p{
        opacity: 1;
        right:  -85%;
    }
    p{
        position: absolute;
        font-weight: bold;
        top: 0;
        right: -30%;
        opacity: 0;
        transition: 200ms;
    }
}
.middle-chart-macros{
    background: rgb(233,255,219);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 16.5px;
    border: 3px solid black;
}
.middle-chart{
    border: 3px solid black;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 40px;
}
.chart-container h4{
    margin: 30px 0;
    font-family: 'Exo', sans-serif!important;
}
</style>
