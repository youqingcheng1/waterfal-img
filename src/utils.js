let bodyWidth = Number(
    getComputedStyle(document.body).width.replace(/px/, ""),
)//获取body宽度

let halfBodyWidth = bodyWidth / 2;//取body一半的宽度

export const loadImgHeights = (imgs) => {
    return new Promise((resolve, reject)=>{
        const length = imgs.length;
        let heights = [];
        let count = 0;
        const load = (index) => {
            let img = new Image()
            const checkIfFinished = () => {
                count++
                if(count === length){
                    resolve(heights)
                }
            }//创建imag
            //图片按照 宽高比 和屏幕宽度的一半进行相乘，得到缩放后适配屏宽的图片高度。
            img.onload = () => {
                const ratio = img.height / img.width;
                const halfheigh = ratio * halfBodyWidth;
                heights[index] = halfheigh;
                checkIfFinished()
            }
            img.onerror = () => {
                heights[index] = 0
                checkIfFinished()
            }
            img.src = imgs[index]
        }
        imgs.forEach((img, index) => load(index))
    })
}

export const sum = (nums) => nums.reduce((a, b)=> a+b, 0)

export const omitByIndexes = (arr, omitIndexes) => {
    let res = []
    for (let i = 0; i < arr.length; i++) {
      if (!omitIndexes.includes(i)) {
        res.push(i)
      }
    }
    return res
}