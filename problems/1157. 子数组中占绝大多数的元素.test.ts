import { teal } from 'color-name'

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
    const inst = new MajorityChecker(data.init)
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
  })
}

// 650ms左右
test('常规暴力算法', () => {
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
  class MajorityChecker {
    // 保存每个值在arr的所有index
    readonly valueIndexs: {[k:string]:number[]} = {}
    readonly valueReverseIndexs: {[k:string]:number[]} = {}

    // 每个值在数组中的index指定的位置出现过多少次
    readonly itemNums: Map<number, number[]> = new Map<number, number[]>()

    allNumMap: {[k:string]:number[]} = {}

    constructor(arr: number[]) {
      const items: Set<number> = new Set()
      arr.forEach((a) => {
        items.add(a)
      })

      const map = new Map<number, number[]>()
      for (const item of items){
        map.set(item, [])
      }

      arr.forEach((a) => {
        for (const [k, v] of map) {
          v.push(0)
          map.set(k, v)
        }

        const nums = map.get(a) || [0]
        nums[nums.length - 1] = nums[nums.length - 2] + 1
        map.set(a, nums)
      })

      this.itemNums = map
    }

    query(left: number, right: number, threshold: number): number {
      const {itemNums} = this
      for (const [item, nums] of itemNums){
        if (nums[right + 1] - nums[left] >= threshold) {
          return item
        }
      }

      return -1
    }
  }

  check(MajorityChecker)
})

test('大神的算法', () => {
  class MajorityChecker {
    s:number
    a: number[]
    b: number[][]
    N: number
    d: number[] = new Array(20005).fill(0)

    constructor (arr: number[]) {
      this.b = new Array(205).fill(0).map(
        () => new Array(20005).fill(0)
      )
      this.d = new Array(20005).fill(0)
      this.a = arr
      const n = arr.length
      this.s = Math.floor(Math.sqrt(n * 2)) // 数组长度两倍的根号二，暂不明白干嘛用，这个比数组长度低
      this.N = 0

      const map = new Map()
      arr.forEach(x => {
        if(map.has(x)) {
          map.set(x, map.get(x) + 1)
        } else {
          map.set(x, 1)
        }
      })

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
