<template>
  <div id="movie-chart" class="ui basic fluid segment"></div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'MovieChart',
  props: [ 'data', ],
  data() {
    return {
      points: [],
      svg: undefined,
    };
  },
  computed: {
    canvasWidth() {
      return $('#movie-chart').width();
    },
    chartPadding() {
      return this.canvasWidth * 0.1;
    },
    chartWidth() {
      return this.canvasWidth - this.chartPadding;
    },
    avgx() {
      let xvals = this.points.map(i => i.x);
      return xvals.reduce((a, b) => a + b, 0) / xvals.length;
    },
    avgy() {
      let yvals = this.points.map(i => i.y);
      return yvals.reduce((a, b) => a + b, 0) / yvals.length;
    },
  },
  methods: {
    initChart() {
      if (this.svg) {
        this.svg.remove();
        this.points = [];
      }
      this.buildChart().then(() => {
        Promise.all([ this.getPoints(), this.addGridlines(), ]).then(res => {
          this.plotPoints();
          //this.addStatisticalInfo();
        });
      });
    },
    buildChart() {
      return new Promise(resolve => {
        this.svg = d3
          .select('#movie-chart')
          .append('svg')
          .attr('width', this.canvasWidth)
          .attr('height', this.canvasWidth);

        this.svg
          .append('rect')
          .attr('x', this.chartPadding)
          .attr('y', 0)
          .attr('width', this.chartWidth)
          .attr('height', this.chartWidth)
          .style('stroke', 'black')
          .style('fill', 'none')
          .style('stroke-width', 1);

        this.svg
          .append('text')
          .attr('x', this.canvasWidth / 2)
          .attr('y', this.canvasWidth - this.chartPadding / 2)
          .text('Story');

        this.svg
          .append('text')
          .text('Entertainment')
          .attr('transform', 'rotate(-90)')
          .attr('x', 0 - this.chartWidth / 2)
          .attr('y', this.chartPadding / 2)
          .style('text-anchor', 'middle');

        resolve();
      });
    },
    addGridlines() {
      let promises = [];

      for (let i = 1; i < 20; i++) {
        promises.push(
          new Promise(resolve => {
            let xpos = i * 0.05 * this.chartWidth + this.chartPadding;
            let ypos = i * 0.05 * this.chartWidth;
            let isEven = i % 2 === 0;
            let opacity = isEven ? 0.3 : 0.15;

            this.svg
              .append('line')
              .attr('x1', xpos)
              .attr('x2', xpos)
              .attr('y1', 0)
              .attr('y2', this.chartWidth)
              .style('stroke-width', 1)
              .style('stroke', 'black')
              .style('stroke-opacity', opacity)
              .style('fill', 'none');

            this.svg
              .append('line')
              .attr('x1', this.chartPadding)
              .attr('x2', this.canvasWidth)
              .attr('y1', ypos)
              .attr('y2', ypos)
              .style('stroke-width', 1)
              .style('stroke', 'black')
              .style('stroke-opacity', opacity)
              .style('fill', 'none');

            if (isEven) {
              this.svg
                .append('text')
                .attr('x', xpos - 3)
                .attr('y', this.chartWidth + 12)
                .text(i / 2)
                .attr('font-size', 12);

              this.svg
                .append('text')
                .attr('x', this.chartPadding - 12)
                .attr('y', ypos + 3)
                .text(10 - i / 2)
                .attr('font-size', 12);
            }
            resolve();
          })
        );
      }
      return Promise.all(promises);
    },
    getPoints() {
      let promises = [];

      this.data.forEach(rating => {
        let promise = new Promise(resolve => {
          let z = {};
          z.titles = [ rating.title, ];
          z.size = this.chartWidth * 0.0075;
          z.count = 1;
          z.x = (rating.s / 10) * this.chartWidth + this.chartPadding;
          z.y = (rating.e / 10) * this.chartWidth;
          let p = this.points.find(point => {
            return point.x === z.x && point.y === z.y;
          });
          if (!p) {
            this.points.push(z);
            resolve();
          } else {
            p.titles.push(z.titles[0]);
            p.size += this.chartWidth * 0.0025;
            p.count++;
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
    plotPoints() {
      this.points.forEach(point => {
        let id = `chart-point-${point.x}-${point.y}`;
        this.svg
          .append('circle')
          .attr('cx', point.x)
          .attr('cy', this.chartWidth - point.y)
          .attr('r', point.size)
          .style('fill', 'orange')
          .attr('class', 'chart-point')
          .attr(
            'data-html',
            `<div class="ui list"><div class="item">${point.titles.join(
              '</div><div class="item">'
            )}</div></div>`
          )
          .attr('id', id);
      });

      $('.chart-point').popup({
        position: 'left center',
        variation: 'inverted',
      });
    },
    addStatisticalInfo() {
      // Average Story value
      this.svg
        .append('line')
        .attr('x1', this.avgx)
        .attr('x2', this.avgx)
        .attr('y1', 0)
        .attr('y2', this.chartWidth)
        .style('stroke-width', 1)
        .style(
          'stroke-dasharray',
          `${this.chartWidth * 0.0075}, ${this.chartWidth * 0.0075}`
        )
        .style('stroke', 'purple')
        .style('fill', 'none');

      // Average Entertainment Value
      this.svg
        .append('line')
        .attr('x1', this.chartPadding)
        .attr('x2', this.canvasWidth)
        .attr('y1', this.chartWidth - this.avgy)
        .attr('y2', this.chartWidth - this.avgy)
        .style('stroke-width', 1)
        .style(
          'stroke-dasharray',
          `${this.chartWidth * 0.0075}, ${this.chartWidth * 0.0075}`
        )
        .style('stroke', 'purple')
        .style('fill', 'none');
      
      // Trendline
      let xVals = this.buildVals(this.points, 'x');
      let yVals = this.buildVals(this.points, 'y');
      let xyVals = this.multiplyVals(xVals, yVals);
      let x2Vals = this.multiplyVals(xVals, xVals);
      let y2Vals = this.multiplyVals(yVals, yVals);

      let sumX = this.sum(xVals);
      let sumY = this.sum(yVals);
      let sumXY = this.sum(xyVals);
      let sumX2 = this.sum(x2Vals);
      let sumY2 = this.sum(y2Vals);

      let n = xVals.length;

      let slope = ((n * sumXY) - (sumX * sumY)) / ((n * sumX2) - (sumX * sumX));

      let intercept = ((sumX2 * sumY) - (sumX * sumXY)) / ((n * sumX2) - (sumX * sumX));
      
      let end = (slope * -(this.canvasWidth - this.chartPadding)) + intercept;
      
      this.svg
        .append('line')
        .attr('x1', this.chartPadding)
        .attr('x2', this.canvasWidth)
        .attr('y1', intercept - (this.chartPadding / 2))
        .attr('y2', end - (this.chartPadding / 2))
        .style('stroke-width', 1)
        .style('stroke', 'purple')
        .style('fill', 'none');
    },
    sum(vals) {
      return vals.reduce((a,b) => a + b, 0);
    },
    buildVals(vals, key) {
      let returnArr = [];
      for (let i = 0; i < vals.length; i++) {
        for (let j = 0; j < vals[i].count; j++) {
          returnArr.push(vals[i][key]);
        }
      }
      return returnArr;
    },
    multiplyVals(arr1, arr2) {
      let returnArr = [];
      for (let i = 0; i < arr1.length; i++) {
        returnArr.push(arr1[i] * arr2[i]);
      }
      return returnArr;
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