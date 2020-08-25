<script>
import { Bubble, } from 'vue-chartjs';
export default {
  extends: Bubble,
  name: 'MovieChart',
  props: [ 'data', ],
  data() {
    return {
      points: [],
      chart: null,
    };
  },
  methods: {
    initChart() {
      this.getPoints().then(() => {
        const _this = this;
        this.chart = this.renderChart(
          {
            labels: [ 'Data', ],
            datasets: [
              {
                label: 'Data One',
                backgroundColor: 'orange',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                pointBorderColor: '#249EBF',
                data: this.points,
              },
            ],
          },
          {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Entertainment',
                  },
                  ticks: {
                    min: 0,
                    max: 10,
                  },
                  gridLines: {
                    display: true,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Story',
                  },
                  ticks: {
                    min: 0,
                    max: 10,
                  },
                  gridLines: {
                    display: true,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
            tooltips: {
              enabled: true,
              mode: 'single',
              callbacks: {
                label: tooltipItem => {
                  return this.points[tooltipItem.index].titles;
                },
              },
            },
            responsive: true,
            maintainAspectRatio: true,
          }
        );
      });
    },
    getPoints() {
      let promises = [];

      this.data.forEach(rating => {
        let promise = new Promise(resolve => {
          let z = {};
          z.titles = [ rating.title, ];
          z.r = 5;
          z.x = rating.s;
          z.y = rating.e;
          let p = this.points.find(point => {
            return parseFloat(point.x) === parseFloat(z.x) && parseFloat(point.y) === parseFloat(z.y);
          });
          if (!p) {
            z.label = z.titles.join('\n');
            this.points.push(z);
            resolve();
          } else {
            p.titles.push(z.titles[0]);
            let sizeToAdd = 6 - p.titles.length;
            p.r += sizeToAdd > 1 || 1;
            resolve();
          }
        });
        promises.push(promise);
      });

      return Promise.all(promises).then(() => {
        this.points = this.points.sort((a, b) => a.y - b.y);
        this.points = this.points.sort((a, b) => a.x - b.x);
      });
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