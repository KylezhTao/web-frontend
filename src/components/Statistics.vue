<template>
  <div>
    <div class="statistics">
      <el-descriptions title="外规库描述信息" size="medium">
          <el-descriptions-item label="法律数">
            <el-tag size="small">{{ countPerType['法律'] }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="行政法规数">
            <el-tag size="small">{{ countPerType['行政法规'] }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="外规总数">
            <el-tag size="small" type="success">{{ countPerType['法律'] + countPerType['行政法规'] }}</el-tag>
          </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="chart-content">
      <div ref="pieChart" class="pie-chart"
        :style="{ width: '500px', height: '500px' }"></div>
      <div ref="barChart" class="bar-chart"
        :style="{ width: '500px', height: '500px' }"></div>
    </div>
  </div>
</template>

<script>
import { getStatistics } from '@/request/api'
export default {
  name: "Statistics",
  data() {
    return {
      countPerDepartment: {},
      countPerType: {},
      countPerReleaseDate: {},
      countPerImplementationDate: {},
    }
  },

  async created(){
    await this.getStatistics();
    this.$nextTick(() => {
      this.drawPieChart()
      this.drawBarChart()
    })
  },

  mounted() {

  },

  methods: {
    async getStatistics () {
      try{
        const res = await getStatistics();
        if(res.data && res.data.code === 0){
          this.countPerDepartment = res.data.content.countPerDepartment;
          this.countPerType = res.data.content.countPerType;
          this.countPerImplementationDate = res.data.content.countPerImplementationDate;
          this.countPerReleaseDate = res.data.content.countPerReleaseDate;
        }
        else if(res.data && res.data.code !== 0){
          this.$message.error(res.data.content)
        }
        else {
          this.$message.error("返回数据为空")
        }
      }catch(e){
        this.$message.error("服务器异常")
      }
    },

    drawPieChart() {
      let pieData = []
      this.countPerDepartment['未知'] = this.countPerDepartment['']
      delete this.countPerDepartment['']
      for(let dept in this.countPerDepartment){
        pieData.push({name: dept, value: this.countPerDepartment[dept]})
      }
      pieData.sort((a,b) => b.value - a.value)
      let mychart = this.$echarts.init(this.$refs.pieChart);
      let options = {
        title: {
          text: '外规发布部门类簇饼图',
          left: 'left'
        },
        legend: {
          type: 'scroll',
          bottom: 10,
        },
        tooltip: {
          trigger: 'item',
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '外规发布数',
            type: 'pie',
            radius: [20, 140],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 8
            },
            data: pieData
          }
        ]
      };

      mychart.setOption(options);
    },

    drawBarChart () {
      let barCategory = [], barValue = []
      let sortedByMonth = {}
      Object.keys(this.countPerReleaseDate)
            .sort()
            .forEach(key => sortedByMonth[key] = this.countPerReleaseDate[key])
      for(let month in sortedByMonth){
        barCategory.push(month)
        barValue.push(this.countPerReleaseDate[month])
      }
      let mychart = this.$echarts.init(this.$refs.barChart);
      let options = {
        title: {
          text: '外规发布数柱状图',
          left: 'left'
        },
        toolbox: {
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
        xAxis: {
          type: 'category',
          data: barCategory
        },
        yAxis: {
          name: '数量',
          type: 'value'
        },
        series: [
          {
            data: barValue,
            type: 'bar'
          }
        ]
      };

      mychart.setOption(options);
    }

  },
}
</script>

<style scoped>
.statistics {
  margin-bottom: 10px;
}

.chart-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.pie-chart{
  padding: 15px 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.bar-chart{
  padding: 15px 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>