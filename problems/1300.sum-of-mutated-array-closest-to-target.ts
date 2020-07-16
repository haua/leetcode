const data: {
  params: any[]
  results: number
}[] = require('./1300.test-data.json')

const check = (fn: (arr: number[], target: number) => number) => {
  data.forEach(data => {
    const res = fn(data.params[0], data.params[1])
    expect(res).toBe(data.results);
  })
}

test('常规暴力算法', () => {
  function findBestValue(arr: number[], target: number): number {
    return 0
  }

  check(findBestValue)
})
