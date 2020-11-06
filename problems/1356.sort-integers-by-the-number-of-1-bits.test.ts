// https://leetcode-cn.com/problems/sort-integers-by-the-number-of-1-bits/
// todo 这题还没做

describe('127.word-ladder.test.ts', () => {
  const check = (fn: (aWord: string, bWord: string, wordList: string[]) => number) => {
    const times = [Date.now()]
    data.forEach((data, i) => {
      const res = fn(data.params[0], data.params[1], data.params[2])
      if(res !== data.results) {
        console.log('err:', data.params)
      }

      times.push(Date.now())
      expect(res).toStrictEqual(data.results);
    })
    const now = Date.now()
    console.log('每次用时：', times.map((d, i) => (times[i + 1] || now) - d), 'ms')
    console.log('总用时：', Date.now() - times[0], 'ms')
  }

  // todo 性能太低，需要优化
  test('我的优化算法', () => {
    function sortByBits(arr: number[]): number[] {

      return arr
    }


  })

})
