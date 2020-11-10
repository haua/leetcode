import data from './31.next-permutation-data'

const check = (fn: (nums: number[]) => void) => {
  const times = new Array(data.length + 1).fill(0)
  times[0] = Date.now()
  data.forEach((data, i) => {
    const input = JSON.stringify(data.params)
    fn(data.params[0])
    if(JSON.stringify(data.params[0]) !== JSON.stringify(data.results)) {
      console.log('输入：', JSON.stringify(input),'输出：', JSON.stringify(data.params[0]),'正确：', JSON.stringify(data.results))
    }

    times[i + 1] = Date.now()
    expect(data.params[0]).toStrictEqual(data.results);
  })
  console.log('每次用时：', times.map((d, i) => (times[i + 1] || Date.now()) - d), 'ms')
  console.log('总用时：', Date.now() - times[0], 'ms')
}

test('我的算法', () => {
  function nextPermutation(nums: number[]): void {
    const len = nums.length
    for (let i = len - 2; i >= 0; i--){
      for (let j = i + 1; j <= len - 1; j++) {
        // 从倒数第二个起，往前数，每个都和后面的所有对比，如果比后面的小，则替换位置并完成，否则把它和后面的所有数由小到大排序
        const a = nums[i].toString()
        const b = nums[j].toString()
        console.log(666, a, b, a < b)
        if(a < b){
          const cache = nums[i]
          nums[i] = nums[j]
          nums[j] = cache

          // todo
          const newI = i + 1
          console.log(111, nums.slice(newI))
          nums.slice(newI).sort().map((d, i) => {
            nums[i + newI] = d
          })
          return
        }
      }
      //

      // todo
      const newI = i + 1
      console.log(111, nums.slice(newI))
      nums.slice(newI).sort().map((d, i) => {
        nums[i + newI] = d
      })
    }
    nums.sort()
  }

  check(nextPermutation)
})
