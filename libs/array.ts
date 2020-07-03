/**
 * 针对数组的方法
 * */

// 二分查找，数组必须是由小到大排好序的
export function findIndexByDichotomy (array: number[], number: number): number {
  let low = 0
  let hig = array.length - 1
  while (true) {
    let index = Math.floor((hig - low + 1) / 2) + low
    if (array[index] > number) {
      hig = index - 1
    } else if (array[index] < number) {
      low = index + 1
    } else if(array[index] === number){
      return index
    }
    if(hig < low){
      return -1
    }
  }
}

/**
 * 同上，但查找的值可能是刚好大于或者刚好小于指定值，也就是不会出现-1
 * @param array
 * @param number
 * @param isBigger 允许找到的值比指定的值大
 * */
export function findNearIndexByDichotomy (array: number[], number: number, isBigger = false): number {
  let low = 0
  let hig = array.length - 1
  while (true) {
    let index = Math.floor((hig - low + 1) / 2) + low
    if (array[index] > number) {
      hig = index - 1
      if(hig < low){
        return isBigger ? index : hig
      }
    } else if (array[index] < number) {
      low = index + 1
      if(hig < low){
        return isBigger ? low : index
      }
    } else if(array[index] === number){
      return index
    }
  }
}
