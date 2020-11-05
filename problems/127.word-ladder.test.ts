import data from './127.test-data'

describe('127.word-ladder.test.ts', () => {
  const check = (fn: (aWord: string, bWord: string, wordList: string[]) => number) => {
    const start = Date.now()
    let last = start
    data.forEach((data, i) => {
      const res = fn(data.params[0], data.params[1], data.params[2])
      if(res !== data.results) {
        console.log('err:', data.params)
      }

      console.log(`${i + 1}用时：`, Date.now() - last)
      last = Date.now()
      expect(res).toStrictEqual(data.results);
    })
    console.log('总用时：', Date.now() - start)
  }

  test('我的算法', () => {
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

    function ladderLength(aWord: string, bWord: string, wordList: string[], before: string = ''): number {
      const asc: string[] = [aWord]
      let nexts: string[] = []
      let words = wordList.filter(d => d !== aWord)
      while (true) {
        nexts = []
        const nowAWord = asc[asc.length - 1]
        words = words.filter(d => {
          if(canChange(nowAWord, d)) {
            nexts.push(d)
            return false
          }
          return true
        })
        console.log(111, before + '-' + asc.join('-'), nexts, words)
        if(nexts.length === 0){
          return 0
        } if(nexts.length === 1){
          asc.push(nexts[0])
          if(nexts[0] === bWord){
            return asc.length
          }
        } else {
          break
        }
      }

      if(nexts.some(d => d===bWord)){
        // console.log(777, asc)
        return asc.length + 1
      }
      if(!words.length){
        return 0
      }

      const lens: number[] = []
      nexts.forEach(d => {
        const len = ladderLength(d, bWord, words, before + '-' + asc.join('-'))
        if(len){
          lens.push(len)
        }
      })
      if(!lens.length){
        return 0
      } else {
        // console.log(666, asc, lens)
        return asc.length + Math.min(...lens)
      }
    }

    check(ladderLength)
  })

})
