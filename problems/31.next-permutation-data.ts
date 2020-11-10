export default [
  {
    params: [[3,2,1]],
    results: [1,2,3]
  },{
    params: [[1,2,3]],
    results: [1,3,2]
  },{
    params: [[1,1,5]],
    results: [1,5,1]
  },{
    params: [[1,3,2]],
    results: [2,1,3]
  },{
    params: [[1,4,3,2]],
    results: [2,1,3,4]
  },{
    params: [[1,3,4,2]], // 1324 1234
    results: [1,4,2,3]
  },{
    params: [[3,1,4,2]],
    results: [3,2,1,4]
  },
] as {
  params: [number[]]
  results: number[]
}[]
