import Vue from './vue';
import { loadImgHeights,sum,omitByIndexes } from './utils'
import data from './mock';

new Vue({
    el:'#app',
    data(){
        return{
            imgs:data.SISTERS.slice(0,10),
            imgHeights:[],
            imgsLoaded:false,
            leftImgIndexes:[],
            rightImgIndexes:[]
        }
    },
   async created() {
    const imgHeights = await loadImgHeights(this.imgs)
    this.imgHeights = imgHeights;
    this.leftImgIndexes = dpHalf(imgHeights).indexes;
    this.rightImgIndexes = omitByIndexes(this.imgs, this.leftImgIndexes);
    this.imgsLoaded = true;
    debugger;
    }
})

//尽可能选出图片中高度最接近图片总高度一半的元素
let dpHalf = (heights) => {
    let mid = Math.round(sum(heights) / 2)
    let dp = []

    //基础状态，只考虑第一个图片的情况
    dp[0] = [];
    for (let cap = 0; cap<=mid; cap++){
        dp[0][cap] = heights[0] > cap ? {max:0, indexes:[]} : {max:heights[0], indexes:[0]}
    }

    for (let useHeightIndex = 1; useHeightIndex < heights.length; useHeightIndex++) {
        if (!dp[useHeightIndex]) {
          dp[useHeightIndex] = []
        }
        for (let cap = 0; cap <= mid; cap++) {
          let usePrevHeightDp = dp[useHeightIndex - 1][cap]
          let usePrevHeightMax = usePrevHeightDp.max
          let currentHeight = heights[useHeightIndex]
          // 这里有个小坑 剩余高度一定要转化为整数 否则去dp数组里取到的就是undefined了
          let useThisHeightRestCap = Math.round(cap - heights[useHeightIndex])
          let useThisHeightPrevDp = dp[useHeightIndex - 1][useThisHeightRestCap]
          let useThisHeightMax = useThisHeightPrevDp ? currentHeight + useThisHeightPrevDp.max : 0

          // 是否把当前图片纳入选择 如果取当前的图片大于不取当前图片的高度
          if (useThisHeightMax > usePrevHeightMax) {
            dp[useHeightIndex][cap] = {
              max: useThisHeightMax,
              indexes: useThisHeightPrevDp.indexes.concat(useHeightIndex),
            }
          } else {
            dp[useHeightIndex][cap] = {
              max: usePrevHeightMax,
              indexes: usePrevHeightDp.indexes,
            }
          }
        }
      }

      return dp[heights.length - 1][mid]
}