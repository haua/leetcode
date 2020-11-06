// https://leetcode-cn.com/problems/word-ladder/

import data from './127.test-data'

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
    // 判断两个字符串不同字符的数量是否为1，是1就返回true
    function canChange (a: string, b: string) {
      let num = 0
      return !a.split('').some((d, i) => {
        if(d !== b[i]){
          num += 1
          if(num > 1){
            return true
          }
        }
        return false
      })
    }
    function ladderLength(aWord: string, bWord: string, wordList: string[]): number {
      // 记录每个步骤
      const wordSteps: string[][] = [
        [aWord]
      ]

      let words = wordList.filter(d => d !== aWord)
      while (words.length){
        const lastStepWords = wordSteps[wordSteps.length - 1]
        const thisStepWords: string[] = []
        words = words.filter(d => {
          return !lastStepWords.some(lastWord => {
            if(canChange(lastWord, d)){
              thisStepWords.push(d)
              return true
            }
            return false
          })
        })
        if(!thisStepWords.length){
          break
        }
        if(thisStepWords.some(d => d === bWord)){
          // console.log(111, wordSteps)
          return wordSteps.length + 1
        }
        wordSteps.push(thisStepWords)
      }
      return 0
    }

    check(ladderLength)
  })

})
