import * as lib from './array'
import Stopwatch from './stopwatch'

describe('二分法查找', () => {
  test('二分法查找', () => {
    function createArray () {
      const length = Math.floor(Math.random() * 99999)
      const arr: number[] = []
      for (let i = 0;i<length;i++){
        if(Math.floor(Math.random() * 2) === 0){
          arr.push(i)
        }
      }
      return arr
    }

    const arr = createArray()
    console.log('数组长度：', arr.length)

    Stopwatch.mark()
    for (let i = 0; i < 10000; i++) {
      const index = Math.floor(Math.random() * arr.length)
      expect(lib.findIndexByDichotomy(arr, arr[index])).toEqual(index)
    }
    console.log(Stopwatch.mark().msg)

    for (let i = 0; i < 10000; i++) {
      const index = Math.floor(Math.random() * arr.length)
      expect(arr.findIndex(d => d === arr[index])).toEqual(index)
    }
    console.log(Stopwatch.mark().msg)
  })
  test('二分法查找-允许index对应的值刚好小于指定number', () => {
    function createArray () {
      const length = Math.floor(Math.random() * 99999)
      const arr: number[] = []
      for (let i = 0;i<length;i++){
        if(Math.floor(Math.random() * 2) === 0){
          arr.push(i)
        }
      }
      return arr
    }

    const arr = createArray()
    console.log('数组长度：', arr.length)

    Stopwatch.mark()
    for (let i = 0; i < 10000; i++) {
      const index = Math.floor(Math.random() * arr.length)
      const res = lib.findNearIndexByDichotomy(arr, arr[index] + 1)
      if(arr[index + 1] === arr[index] + 1){
        expect(res).toEqual(index + 1)
      } else {
        if(res !== index){
          console.log(`第${i}次失败`, arr[index], arr[res])
        }
        expect(res).toEqual(index)
      }
    }
    console.log(Stopwatch.mark().msg)
  })
  test('二分法查找-允许index对应的值刚好大于指定number', () => {
    function createArray () {
      const length = Math.floor(Math.random() * 99999)
      const arr: number[] = []
      for (let i = 0;i<length;i++){
        if(Math.floor(Math.random() * 2) === 0){
          arr.push(i)
        }
      }
      return arr
    }

    const arr = createArray()
    console.log('数组长度：', arr.length)

    Stopwatch.mark()
    for (let i = 0; i < 10000; i++) {
      const index = Math.floor(Math.random() * arr.length)
      const res = lib.findNearIndexByDichotomy(arr, arr[index] - 1, true)
      if(arr[index - 1] === arr[index] - 1){
        expect(res).toEqual(index - 1)
      } else {
        if(res !== index){
          console.log(`第${i}次失败`, arr[index], arr[res])
        }
        expect(res).toEqual(index)
      }
    }
    console.log(Stopwatch.mark().msg)
  })
})
