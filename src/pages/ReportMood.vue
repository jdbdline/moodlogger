<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="width:100%">
    <q-carousel
      v-model="slide"
      control-color="primary"
      class="rounded-borders"
      style="width:100%"
    >
      <q-carousel-slide 
        v-for="slide in slides"
        :key="slide.label"
        :name="slide.value" 
        class="column no-wrap flex-center"
        :id="slide.value" 
      >
      </q-carousel-slide>
    </q-carousel> 
    <div class="row justify-center">
      <q-btn-toggle
        class="my-custom-toggle"
        unelevated
        v-model="slide"
        :options="slides"
        toggle-color="primary"
        color="white"
        text-color="primary"
      />
    </div>
  </div>
  </q-page>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Localbase from 'localbase'
import { date } from 'quasar'

let db = new Localbase('db');
am4core.useTheme(am4themes_animated);

let chart = ''

export default {
  name: 'PageIndex',
  data () {
    return {
      slide: 'chartdiv1',
      slides: [
        { label: 1, value: 'chartdiv1', data: [] },
        { label: 2, value: 'chartdiv2', data: [] },
        { label: 3, value: 'chartdiv3', data: [] },
        { label: 4, value: 'chartdiv4', data: [] }
      ]
    }
  },
  methods: {
    _getData() {
      let data = []
     
      let timeStamp = Date.now()
     // let dayInYear = date.formatDate(timeStamp, 'DDD')
       
      db.collection('moods').get().then(k =>{
          k.forEach(function (item, index) {         
              data.push({ date: new Date(2021, 0, index), name: "name" + index, value: item.score })
  
          });      
      })
                 
      return data
    },
    _getChart(){
      this.chart = am4core.create(document.getElementById(this.slide), am4charts.XYChart)

      this.chart.data = this.slides.find(slide => slide.value === this.slide).data
      
      let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.renderer.grid.template.location = 0

      let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.tooltip.disabled = true
      valueAxis.renderer.minWidth = 35

      let series = this.chart.series.push(new am4charts.LineSeries())
      series.dataFields.dateX = "date"
      series.dataFields.valueY = "value"

      series.tooltipText = "{valueY.value}"
      this.chart.cursor = new am4charts.XYCursor()

      let scrollbarX = new am4charts.XYChartScrollbar()
      scrollbarX.series.push(series)
      this.chart.scrollbarX = scrollbarX
    }
  },
  watch: {
    slide() {
      this.chart.dispose()
      this.$nextTick(() =>{
        this._getChart()
      })

    }
  },
  mounted() {
    this.slides.forEach( (slide) => {
      slide.data = this._getData()
    })
    this._getChart()
  },

  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>