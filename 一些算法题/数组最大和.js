//一个数组中最大连续和
let test1 = [1, 2, 3, 4, -1, 8, 9]; //

function maxSum(arr) {
  let sum = 0;
  let max = 0;
  let temp = [];
  let temp2=[]
  for(let i=0;i<arr.length;i++){
      sum+=arr[i]
      temp.push(sum);
      if(max<=sum){
          max=sum
      }else{
          sum=0
          max = 0;
      }
  }
  console.log(temp)
  return Math.max(...temp);
}

console.log(maxSum(test1));
