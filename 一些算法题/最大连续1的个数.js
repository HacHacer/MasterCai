/*
 * @lc app=leetcode.cn id=485 lang=javascript
 *
 * [485] 最大连续 1 的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let index = -1;
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    const temp = nums[i];
    if (temp === 0) {
      index = i;
    } else {
      res = Math.max(i - index, res);
    }
  }
  return res;
};
// var findMaxConsecutiveOnes = function (nums) {
//   let max = 0,
//     count = 0;
//     nums[nums.length]=0
//   for (let i = 0; i < nums.length; i++) {
//     const temp = nums[i];
//     if (temp === 1) {
//       count += 1;
//     } else {
//       max = Math.max(max, count);
//       count = 0;
//     }
//   }
//   return max
// };
// @lc code=end
