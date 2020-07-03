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

    allNumMap: {[k:string]:number[]} = {}

    constructor(arr: number[]) {
      arr.forEach((a, index) => {
        if(!this.valueIndexs[a]){
          this.valueIndexs[a] = []
          this.valueReverseIndexs[a] = []
        }
        this.valueIndexs[a].push(index)
        this.valueReverseIndexs[a].unshift(index)
      })
    }

    query(left: number, right: number, threshold: number): number {
      let match = -1
      const half = (right - left + 1) / 2

      const k = `${left}-${right}`
      if(this.allNumMap[k]){
        return this.allNumMap[k][1] >= threshold ? this.allNumMap[k][0] : -1
      }

      Object.keys(this.valueIndexs).some(value => {
        const indexs = this.valueIndexs[value]
        const start = indexs.findIndex(d => d >= left)
        if(start < 0 || indexs[start] > right){
          return false
        }
        const end = this.valueReverseIndexs[value].findIndex(d => d <= right)
        const end1 = indexs.length - end - 1
        if(indexs[end1] < start){
          return false
        }
        const num = end1 - start + 1

        if(num >= threshold){
          match = parseInt(value)
          this.allNumMap[k] = [parseInt(value), num]
          return true
        } else if (num >= half) {
          this.allNumMap[k] = [parseInt(value), num]
          return true
        }
        return false
      })

      return match
    }
  }

  check(MajorityChecker)
})

test('大神的算法', () => {
  class MajorityChecker {
    s:number
    a: number[]
    b: number[][] = new Array(205)
    N: number
    d: number[] = new Array(20005).fill(0)

    constructor (arr: number[]) {
      this.a = arr
      const n = arr.length
      this.s = Math.floor(Math.sqrt(n * 2))
      this.N = 0
      const map = new Map()
      const half = this.s / 2
      for(let x of arr) {
        if(map.has(x)) {
          map.set(x, map.get(x) + 1)
        } else map.set(x, 1)
      }

      for(let i = 0; i < this.b.length; i++) {
        this.b[i] = new Array(20005).fill(0)
      }

      for(let [x, count] of map) {
        if(count > half ) {
          this.b[++this.N][0] = 0
          this.d[this.N] = x
          for(let j = 0;j < n; j++) {
            this.b[this.N][j + 1] = this.b[this.N][j] + (this.a[j] === this.d[this.N] ? 1 : 0)
          }
        }
      }
    }

    query (left: number, right: number, threshold: number): number {
      const {a, b, N} = this
      if((right - left) <= this.s) {
        let j = 0
        let k = 0
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
