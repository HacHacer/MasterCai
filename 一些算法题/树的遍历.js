//递归方法遍历获取value 插入数组返回
let result =[]
function diff(node) {
    if(node){
        result.push(node.value)
        diff(node.left)
        diff(node.right)
    }
}
const tree = {
    value: "-",
    left: {
        value: '+',
        left: {
            value: 'a',
        },
        right: {
            value: '*',
            left: {
                value: 'b',
            },
            right: {
                value: 'c',
            }
        }
    },
    right: {
        value: '/',
        left: {
            value: 'd',
        },
        right: {
            value: 'e',
        }
    }
}
