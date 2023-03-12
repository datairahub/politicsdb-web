import { select, selectAll, pointer } from 'd3-selection';
import { scaleBand, scaleTime } from 'd3-scale';
import { min, max, extent } from 'd3-array';
import { axisBottom } from 'd3-axis';
import d3chart from '../d3.chart';

const d3 = {
  select,
  selectAll,
  pointer,
  scaleBand,
  scaleTime,
  min,
  max,
  extent,
  axisBottom,
};

/**
 * Displays a line chart
 *
 * @param {htmlNode} selection vue ref element: this.$refs.my_selected_node
 * @param {object} data data to represent
 * @param {object} config extra configuration parameters
 *
 * Required data format = [
 *   {
 *     id: Any,
 *     name: String,
 *     type: String,
 *     start: Date,
 *     end: Date,
 *   },
 *   {
 *     id: Any,
 *     name: String,
 *     type: String,
 *     start: Date,
 *     end: Date,
 *   },
 * ]
 */
export default class extends d3chart {
  constructor(selection, data, config) {
    super(selection, data, config, {
      class: 'lifetime',
      addSize: true,
      margin: {
        top: 0,
        right: 10,
        bottom: 16,
        left: 10,
      },
      color: 'steelblue', // Accepts strings, array or object
      bandAttrs: {},
      bandStyles: {
        opacity: 0.9,
      },
      textAttrs: {},
      textStyles: {
        'font-size': 12,
        'pointer-events': 'none',
        fill: 'white',
      },
      scales: {
        xMinOverride: null,
        xMaxOverride: null,
        yPaddingInner: 0.2,
        yPaddingOuter: 0.3,
      },
      axis: {
        xFormat: (d) => d.getUTCFullYear(),
        xTicks: 10,
      },
      tooltip: null, // Accepts function
      click: null, // Accepts function
    });
  }

  /**
   * Init chart
   */
  initChart() {
    // Set up dimensions
    this.initChartFrame(this.cfg.class);

    // // Init scales
    this.yScale = d3.scaleBand();
    this.xScale = d3.scaleTime();

    // Axis group
    this.axisg = this.g.append('g').attr('class', `chart__axis chart__axis--${this.cfg.class}`);

    // Bottom axis
    this.xAxis = this.axisg
      .append('g')
      .attr('class', `chart__axis-x chart__axis-x--${this.cfg.class}`);

    this.setChartDimension();
    this.updateChart();
  }

  /**
   * Set up chart dimensions (non depending on data)
   */
  setChartDimension() {
    // Resize SVG element
    const width = this.cfg.width + this.cfg.margin.left + this.cfg.margin.right;
    const height = this.cfg.height + this.cfg.margin.top + this.cfg.margin.bottom;

    this.svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', width).attr('height', height);
  }

  /**
   * Bind data to main elements groups
   */
  bindData() {
    // Bands group
    this.bandsgroup = this.g.selectAll('.chart__bands-group').data(this.data, (d) => d.id);
  }

  /**
   * Set up scales
   */
  setScales() {
    const yValues = this.data
      .sort((a, b) => a.start - b.start)
      .reduce((acc, curr) => (acc.includes(curr.type) ? acc : acc.concat(curr.type)), []);

    const xMin = this.cfg.scales.xMinOverride === null
      ? d3.min(this.data, (d) => d.start)
      : this.cfg.scales.xMinOverride;
    const xMax = this.cfg.scales.xMaxOverride === null
      ? d3.max(this.data, (d) => d.end)
      : this.cfg.scales.xMaxOverride;

    // Calcule vertical scale
    this.yScale
      .domain(yValues)
      .range([this.cfg.height, 0])
      .paddingInner(this.cfg.scales.yPaddingInner)
      .paddingOuter(this.cfg.scales.yPaddingOuter);

    // Calcule horizontal scale
    this.xScale.domain([xMin, xMax]).rangeRound([0, this.cfg.width]);

    // Redraw horizontal axis
    this.xAxis
      .attr('transform', `translate(0,${this.cfg.height})`)
      .call(d3.axisBottom(this.xScale).tickFormat(this.cfg.axis.xFormat));
  }

  /**
   * Add new chart's elements
   */
  enterElements() {
    // Elements to add
    const bandsgroup = this.bandsgroup
      .enter()
      .append('g')
      .attr('class', `chart__bands-group chart__bands-group--${this.cfg.class}`);

    const band = bandsgroup
      .append('rect')
      .attr('class', `chart__band chart__band--${this.cfg.class}`)
      .attr('x', (d) => this.xScale(d.start))
      .attr('width', (d) => this.xScale(d.end) - this.xScale(d.start))
      .attr('y', (d) => this.yScale(d.type))
      .attr('rx', this.yScale.bandwidth() / 2)
      .attr('ry', this.yScale.bandwidth() / 2)
      .attr('height', this.yScale.bandwidth());

    Object.keys(this.cfg.bandAttrs).forEach((key) => {
      band.attr(key, this.cfg.bandAttrs[key]);
    });

    Object.keys(this.cfg.bandStyles).forEach((key) => {
      band.style(key, this.cfg.bandStyles[key]);
    });

    band
      .on('click', (event, d) => {
        if (!this.cfg.click) return;
        this.cfg.click(event, d);
      })
      .on('mouseover', (event, d) => {
        if (!this.cfg.tooltip) return;
        this.tooltip.html(`<div>${this.cfg.tooltip(event, d)}</div>`).classed('active', true);
      })
      .on('mouseout', () => {
        if (!this.cfg.tooltip) return;
        this.tooltip.classed('active', false);
      })
      .on('mousemove', (event) => {
        if (!this.cfg.tooltip) return;
        const pos = d3.pointer(event, this.selection.node());
        const selectionwidth = this.selection.node().getBoundingClientRect().width;
        const tooltipSizes = this.tooltip.node().getBoundingClientRect();
        const left = pos[0] > selectionwidth / 2 ? pos[0] - tooltipSizes.width - 10 : pos[0] + 10;
        this.tooltip
          .style('left', `${left}px`)
          .style('top', `${pos[1] - tooltipSizes.height / 2}px`);
      });

    const text = bandsgroup
      .append('text')
      .attr('class', `chart__text chart__text--${this.cfg.class}`)
      .attr('x', (d) => this.xScale(d.start) + (this.xScale(d.end) - this.xScale(d.start)) / 2)
      .attr('y', (d) => this.yScale(d.type) + this.yScale.bandwidth() / 2 + 4)
      .attr('text-anchor', 'middle')
      .text((d) => d.type);

    Object.keys(this.cfg.textAttrs).forEach((key) => {
      text.attr(key, this.cfg.textAttrs[key]);
    });

    Object.keys(this.cfg.textStyles).forEach((key) => {
      text.style(key, this.cfg.textStyles[key]);
    });
  }

  /**
   * Update chart's elements based on data change
   */
  updateElements() {
    // Redraw bands
    this.g
      .selectAll('.chart__band')
      .attr('fill', (d) => this.colorElement(d))
      .attr('x', (d) => this.xScale(d.start))
      .attr('width', (d) => this.xScale(d.end) - this.xScale(d.start))
      .attr('y', (d) => this.yScale(d.type))
      .attr('rx', this.yScale.bandwidth() / 2)
      .attr('ry', this.yScale.bandwidth() / 2)
      .attr('height', this.yScale.bandwidth());

    // Redraw texts
    this.g
      .selectAll('.chart__text')
      .attr('x', (d) => this.xScale(d.start) + (this.xScale(d.end) - this.xScale(d.start)) / 2)
      .attr('y', (d) => this.yScale(d.type) + this.yScale.bandwidth() / 2 + 4);
  }

  /**
   * Remove chart's elements without data
   */
  exitElements() {
    this.bandsgroup.exit().style('opacity', 0).remove();
  }
}
