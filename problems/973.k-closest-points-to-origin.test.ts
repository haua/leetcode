
test('我的算法', () => {
  function kClosest(points: number[][], K: number): number[][] {
    const dists = points.map((d, i) => ({
      num: d[0] * d[0] + d[1] * d[1],
      data: d
    }))
    const sorts = dists
      .sort((a, b) => a.num - b.num)
      .slice(0, K)

    return sorts.map(d => d.data)
  }

  expect(kClosest([[1,3],[-2,2]], 1)).toStrictEqual([[-2,2]])
  expect(kClosest([[3,3],[5,-1],[-2,4]], 2)).toStrictEqual([[3,3],[-2,4]])
})
