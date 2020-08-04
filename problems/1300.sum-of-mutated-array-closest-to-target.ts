const data: {
  params: any[]
  results: number
}[] = require('./1300.test-data.json')

const check = (fn: (arr: number[], target: number) => number) => {
  data.forEach(data => {
    const res = fn(data.params[0], data.params[1])
    if(res !== data.results) {
      console.log('err:', data.params)
    }
    expect(res).toBe(data.results);
  })
}

test('我的算法', () => {
  function findBestValue(arr: number[], target: number): number {
    const targetAvg = target / arr.length // 目标平均值，所求的值必须>=它
    let underAvgSum = 0 // 小于目标平均值的子项相加
    let instableArr: number[] = [] // 不稳定的数组，这里的值会可能被减少或不变，后面会慢慢确定
    let max = 0
    const total = arr.reduce((prev, curr) => {
      if(curr > max) {
        max = curr
      }
      if(curr < targetAvg){
        underAvgSum+=curr
      } else {
        instableArr.push(curr)
      }
      return prev + curr
    }, 0)
    if(target >= total) {
      return max
    }
    const avg = total / arr.length // 原平均值
    const diff = avg - targetAvg // 每个值减少这么多，就能达到需求

    // 用二分法了
    let lastInstableNum = instableArr.length
    let left = Math.floor(targetAvg)
    let right = Math.ceil(max - diff)
    instableArr = instableArr.filter(d => d < right)
    let mustReducedNum = lastInstableNum - instableArr.length // 值超过了所求的值，所以肯定会被减少的值的数量
    let lastMid: number = 0
    let lastTotal: number = 0
    while (true) {
      const mid = Math.floor((right - left) / 2) + left
      const total = instableArr.reduce((prev, curr) => Math.min(mid, curr) + prev, 0) + underAvgSum + mustReducedNum * mid

      if (total === target) {
        return mid
      } else if (total > target) {

      }

      if (mid === left) {}

      lastMid = mid
      lastTotal = total
    }
  }

  check(findBestValue)
})
