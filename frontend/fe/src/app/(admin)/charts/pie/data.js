import small1 from '@/assets/images/small/img-1.jpg';
import small2 from '@/assets/images/small/img-2.jpg';
import small3 from '@/assets/images/small/img-3.jpg';
import small5 from '@/assets/images/small/img-5.jpg';
const colors1 = ['#7f56da', '#1e84c4', '#ed5565', '#1bb394', '#f9b931'];
export const simplePieOpts = {
  chart: {
    height: 320,
    type: 'pie'
  },
  series: [44, 55, 41, 17, 15],
  labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
  colors: colors1,
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    // verticalAlign: "middle",
    floating: false,
    fontSize: '14px',
    offsetX: 0,
    offsetY: 7
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        height: 240
      },
      legend: {
        show: false
      }
    }
  }]
};
export const simpleDonutOpts = {
  chart: {
    height: 320,
    type: 'donut'
  },
  series: [44, 55, 41, 17, 15],
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    // verticalAlign: 'middle',
    floating: false,
    fontSize: '14px',
    offsetX: 0,
    offsetY: 7
  },
  labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
  colors: ['#7f56da', '#1e84c4', '#ed5565', '#1bb394', '#f9b931'],
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        height: 240
      },
      legend: {
        show: false
      }
    }
  }]
};
export const monochromePieOpts = {
  chart: {
    height: 320,
    type: 'pie'
  },
  series: [25, 15, 44, 55, 41, 17],
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    // verticalAlign: 'middle',
    floating: false,
    fontSize: '14px',
    offsetX: 0,
    offsetY: 7
  },
  theme: {
    monochrome: {
      enabled: true
    }
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        height: 240
      },
      legend: {
        show: false
      }
    }
  }]
};
export const gradientDonutOpts = {
  chart: {
    height: 320,
    type: 'donut'
  },
  series: [44, 55, 41, 17, 15],
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    // verticalAlign: "middle",
    floating: false,
    fontSize: '14px',
    offsetX: 0,
    offsetY: 7
  },
  labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
  colors: colors1,
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        height: 240
      },
      legend: {
        show: false
      }
    }
  }],
  fill: {
    type: 'gradient'
  }
};
export const patternedDonutOpts = {
  chart: {
    height: 320,
    type: 'donut',
    dropShadow: {
      enabled: true,
      color: '#111',
      top: -1,
      left: 3,
      blur: 3,
      opacity: 0.2
    }
  },
  stroke: {
    show: true,
    width: 2
  },
  series: [44, 55, 41, 17, 15],
  colors: ['#7f56da', '#1e84c4', '#ed5565', '#1bb394', '#f9b931'],
  labels: ['Comedy', 'Action', 'SciFi', 'Drama', 'Horror'],
  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 0.8
    }
  },
  fill: {
    type: 'pattern',
    opacity: 1,
    pattern: {
      style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines']
    }
  },
  states: {
    active: {
      allowMultipleDataPointsSelection: true
    }
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    floating: false,
    fontSize: '14px',
    offsetX: 0,
    offsetY: 7
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        height: 240
      },
      legend: {
        show: false
      }
    }
  }]
};
export const imageFillOpts = {
  chart: {
    height: 320,
    type: 'pie'
  },
  labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4'],
  colors: ['#39afd1', '#ffbc00', '#3e60d5', '#47ad77'],
  series: [44, 33, 54, 45],
  fill: {
    type: 'image',
    opacity: 0.85,
    image: {
      src: [small1, small2, small3, small5],
      width: 25
      // imagedHeight: 25
    }
  },
  stroke: {
    width: 4
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    // verticalAlign: 'middle',
    floating: false,
    fontSize: '14px',
    offsetX: 0,
    offsetY: 7
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        height: 240
      },
      legend: {
        show: false
      }
    }
  }]
};
export const donutUpdateOpts = {
  chart: {
    height: 320,
    type: 'donut'
  },
  dataLabels: {
    enabled: false
  },
  series: [44, 55, 13, 33],
  colors: ['#1e84c4', '#53389f', '#7f56da', '#ff86c8', '#ed5565', '#ed5565', '#f9b931', '#1bb394', '#040505', '#1bb394'],
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    // verticalAlign: "middle",
    floating: false,
    fontSize: '14px',
    offsetX: 0,
    offsetY: 7
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        height: 240
      },
      legend: {
        show: false
      }
    }
  }]
};