/*
 * @lc app=leetcode.cn id=179 lang=javascript
 *
 * [179] 最大数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  let a = nums.toString().split(",");
  a.sort((a, b) => {
    // b在a的前面
    if (a + b < b + a) {
      return 1;
    }
    if (a + b > b + a) {
      return -1;
    }
    return 0;
  });
  //   for (let i = 0; i < a.length-1; i++) {
  //     for (let j = 0; j < a.length - i-1; j++) {
  //       if (a[j] + a[j+1] < a[j+1] + a[j]) {
  //         let temp = a[j+1];
  //         a[j+1] = a[j];
  //         a[j] = temp;
  //       }
  //     }
  //   }
  let result = a.join("");
  return result == 0 ? "0" : result;
};
// @lc code=end
