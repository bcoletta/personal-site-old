<script>
import { Scatter, } from 'vue-chartjs';
export default {
  extends: Scatter,
  name: 'MovieChart',
  props: [ 'data', ],
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        legend: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Story',
              },
              ticks: {
                min: 0,
                max: 10,
                stepSize: 1,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Entertainment',
              },
              ticks: {
                min: 0,
                max: 10,
                stepSize: 1,
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              let dataset = data.datasets[tooltipItem.datasetIndex];
              return dataset.data[tooltipItem.index].label;
            },
          },
        },
      },
    };
  },
  methods: {
    initChart() {
      let dataPoints = this.data.map(d => {
        return {
          label: d.title,
          x: d.s,
          y: d.e,
        };
      });
      let chartData = {
        datasets: [
          {
            label: 'Movies',
            backgroundColor: 'orange',
            radius: 5,
            data: dataPoints,
          },
        ],
      };
      this.renderChart(chartData, this.chartOptions);
    },
  },
  mounted() {
    this.initChart();
  },
  watch: {
    data: 'initChart',
  },
};
</script>