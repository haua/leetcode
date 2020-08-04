import stopwatch from '../libs/stopwatch'

const data: {
  init: any
  params: any[]
  results: any[]
}[] = require('./1157. test-data.json')

interface MajorityCheckerT {
  new (arr: number[]): MajorityCheckerInstT
}

interface MajorityCheckerInstT {
  query(left: number, right: number, threshold: number): number
}

const check = (MajorityChecker: MajorityCheckerT) => {
  data.forEach(data => {
    console.log('init数据：', data.init)
    stopwatch.mark()
    const inst = new MajorityChecker(data.init)
    console.log('init耗时：', stopwatch.mark().msg)
    data.params.forEach((d: number[], i) => {
      const res = inst.query(d[0], d[1], d[2])
      if(data.results[i] !== undefined){
        if(res !== data.results[i]){
          console.log(data.init, d)
        }
        expect(res).toEqual(data.results[i])
      } else {
        expect([-1, 1, 2].includes(res)).toBe(true);
      }
    })
    console.log(`query ${data.params.length} 次，耗时：`, stopwatch.mark().msg)
  })
}

// 2s左右
test('我的算法', () => {
  class MajorityChecker {
    readonly array: number[] = []

    allNumMap: {[k:string]:{[k:string]: number}} = {}

    constructor(arr: number[]) {
      this.array = arr
    }

    query(left: number, right: number, threshold: number): number {
      let numMap: {[k:string]: number} = {}
      if(this.allNumMap[`${left}-${right}`]){
        numMap = this.allNumMap[`${left}-${right}`]
      } else {
        for (let i = left;i <= right; i++){
          const value = this.array[i]
          if (!numMap[value]){
            numMap[value] = 1
          } else {
            numMap[value]++
          }
        }
        this.allNumMap[`${left}-${right}`] = numMap
      }
      let match = -1
      Object.keys(numMap).some(d => {
        if(numMap[d] >= threshold){
          match = parseInt(d)
          return true
        }
        return false
      })
      return match
    }
  }

  check(MajorityChecker)
})

test('优化算法', () => {
  const tempNums: number[][] = new Array(200).fill(0).map(() => new Array(20000).fill(0))
  class MajorityChecker {
    // 每个值在数组中的index指定的位置出现过多少次
    readonly itemNums: {[k: number]: number[]} = {}
    readonly items: Array<number> = []
    readonly threshold: number = 0
    readonly arr: number[] = []

    constructor(arr: number[]) {
      this.arr = arr
      const arrLen = arr.length

      this.threshold = Math.floor(Math.sqrt(arrLen * 2)) // 数组长度两倍的根号二，有的值出现次数太少，每次都遍历它们太浪费性能

      const numMap: {[k: number]: number} = {}
      arr.forEach(a => {
        if(!numMap[a]){
          numMap[a] = 0
        }
        numMap[a]++
      })

      const items = Object.keys(numMap).map(d => parseInt(d))

      const halfThreshold = this.threshold / 2
      const aboutThresholds = items.filter(d => numMap[d] > halfThreshold)

      this.items = aboutThresholds

      const map: {[k: number]: number[]} = {}
      aboutThresholds.forEach((item, i) => {
        map[item] = tempNums[i]
        map[item][0] = 0
      })

      arr.forEach((a, i) => {
        for (const item of aboutThresholds) {
          map[item][i + 1] = map[item][i] + (item === a ? 1 : 0)
        }
      })

      this.itemNums = map
    }

    query(left: number, right: number, threshold: number): number {
      const {itemNums, items, arr} = this

      if (right - left <= this.threshold) {
        let j = 0
        let k = 0
        // 查询区间内哪个值出现最多次
        for(let i = left; i <= right; i++) {
          if(arr[i] === j) {
            k++
          } else if(k) {
            k--
          } else {
            j = arr[i]
            k = 1
          }
        }
        k = 0
        // 查询最多次那个值具体出现了多少次
        for(let i = left;i <= right; i++) {
          if(arr[i] === j) k++
        }

        return k >= threshold ? j : -1
      } else {
        for (const item of items){
          const nums = itemNums[item]
          if (nums[right + 1] - nums[left] >= threshold) {
            return item
          }
        }
      }

      return -1
    }
  }

  check(MajorityChecker)
})

// 810ms，有时会上到1s
test('大神的算法', () => {
  class MajorityChecker {
    s:number
    a: number[]
    b: number[][]
    N: number
    d: number[] = []

    constructor (arr: number[]) {
      const map = new Map()
      arr.forEach(x => {
        if(map.has(x)) {
          map.set(x, map.get(x) + 1)
        } else {
          map.set(x, 1)
        }
      })

      this.b = new Array(Math.min(map.size, 200) + 5).fill(0).map(
        () => new Array(arr.length + 5).fill(0)
      )
      this.d = new Array(arr.length + 5).fill(0)
      this.a = arr
      const n = arr.length
      this.s = Math.floor(Math.sqrt(n * 2)) // 数组长度两倍的根号二，暂不明白干嘛用，这个比数组长度低
      this.N = 0

      // 这不是数组长度的一半，这个比数组长度低很多倍，但至少是1，除以2之后有可能带小数
      const half = this.s / 2
      for(let [x, count] of map) {
        if(count > half ) {
          this.N++
          this.b[this.N][0] = 0
          this.d[this.N] = x
          for(let j = 0;j < n; j++) {
            this.b[this.N][j + 1] = this.b[this.N][j] + (arr[j] === x ? 1 : 0)
          }
        }
      }
    }

    query (left: number, right: number, threshold: number): number {
      const {a, b, N} = this
      if((right - left) <= this.s) {
        let j = 0
        let k = 0
        // 查询区间内哪个值出现最多次
        for(let i = left; i <= right; i++) {
          if(a[i] === j) {
            k++
          } else if(k) {
            k--
          } else {
            j = a[i]
            k = 1
          }
        }
        k = 0
        // 查询最多次那个值具体出现了多少次
        for(let i = left;i <= right; i++) {
          if(a[i] === j) k++
        }
        return k >= threshold ? j : -1
      }
      for(let i = 1; i <= N; i++) {
        if((b[i][right + 1] - b[i][left]) >= threshold) return this.d[i]
      }
      return -1
    }
  }
  check(MajorityChecker)
})
