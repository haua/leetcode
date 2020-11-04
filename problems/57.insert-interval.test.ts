// 问题地址： https://leetcode-cn.com/problems/insert-interval/

test('我的算法', () => {
  interface AreaT extends Array<number>{
    0: number
    1: number
  }
  interface PointT {
    index: number
    position: 0 | 1 | 2 | 3 | 4
  }
  function insert(intervals: AreaT[], newInterval: AreaT): AreaT[] {
    const [x, y] = newInterval
    const xPoint: PointT = {
      index: -1,
      position: 0
    }
    const yPoint: PointT = {
      index: -1,
      position: 0
    }
    const lastI = intervals.length - 1
    intervals.some(([a, b], i) => {
      if(xPoint.index === -1){
        if(x <= b){
          xPoint.index = i
          if(x<a){
            xPoint.position = 0
          } else if (x === a) {
            xPoint.position = 1
          } else if (x < b) {
            xPoint.position = 2
          } else if (x === b) {
            xPoint.position = 3
          }
        } else if (i >= lastI){
          xPoint.index = i
          xPoint.position = 4
        }
      }
      if(yPoint.index === -1){
        if(y <= b){
          yPoint.index = i
          if(y<a){
            yPoint.position = 0
          } else if (y === a) {
            yPoint.position = 1
          } else if (y < b) {
            yPoint.position = 2
          } else if (y === b) {
            yPoint.position = 3
          }
        } else if (i >= lastI){
          yPoint.index = i
          yPoint.position = 4
        }
      }
      return yPoint.index !== -1 && xPoint.index !== -1
    })

    if (xPoint.position === 0 && yPoint.position === 0 && xPoint.index === yPoint.index){
      const newAreas = [...intervals]
      newAreas.splice(xPoint.index, 0, newInterval)
      return newAreas
    } else if (xPoint.position === 4) {
      return [...intervals, newInterval]
    }else {
      const beforeArr = intervals.slice(0, xPoint.index)
      const afterArr = intervals.slice(yPoint.index + (yPoint.position === 0 ? 0 : 1))
      const center = [
        xPoint.position === 0 ? x : intervals[xPoint.index][0],
        yPoint.position === 4 || yPoint.position === 0 ? y : intervals[yPoint.index][1],
      ]
      return [
        ...beforeArr,
        center,
        ...afterArr
      ] as AreaT[]
    }
  }

  expect(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]))
    .toStrictEqual([[1,2],[3,10],[12,16]])
  expect(insert([[1,2],[3,5],[8,10],[12,16]], [6,7]))
    .toStrictEqual([[1,2],[3,5],[6,7],[8,10],[12,16]])
  expect(insert([[1,3],[6,9]], [2,5]))
    .toStrictEqual([[1,5],[6,9]])
  expect(insert([[1,5]], [6,8]))
    .toStrictEqual([[1,5],[6,8]])
})
