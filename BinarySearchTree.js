
function mergeSort(inputArray){
    if(inputArray.length == 1){
        return inputArray;
    }
    const halfIndex = Math.round((inputArray.length)/ 2);
    const leftHalf = inputArray.slice(0, halfIndex);
    const rightHalf = inputArray.slice(halfIndex, inputArray.length);

    let leftSorted = mergeSort(leftHalf);
    let rightSorted = mergeSort(rightHalf);

    let final = [];
    while(leftSorted.length > 0 || rightSorted.length > 0){
        if (leftSorted[0] < rightSorted[0] || rightSorted.length < 1) {
            final.push(leftSorted[0]);
            leftSorted.shift();
        }
        else{
            final.push(rightSorted[0]);
            rightSorted.shift();
        }
    }
    return final;
}


class Node{
    constructor(data, r=null, l=null){
        this.data = data;
        this.left = r;
        this.right = l;
    };
}
class Tree{
    constructor(array){
        this.root = this.buildTree(array);
    };
    buildTree(array){
        const cleanArray = mergeSort(Array.from(new Set(array)));
        return this.buildTreeNext(cleanArray);
    }
    buildTreeNext(array, start=0, end=array.length-1){
        if(start > end){
            return null;
        }
        else{
        }
            const mid = Math.floor((start + end)/2);
            let root = new Node(array[mid]);
            root.left = this.buildTreeNext(array, start, mid-1);
            root.right = this.buildTreeNext(array, mid+1, end);

            return root;
    }
    prettyPrint(node, prefix = "", isLeft = true){
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
    //TODO 
    insert(value){

    }
    //TODO
    deleteItem(value){

    }
    //TODO
    find(value){

    }
    //TODO
    levelOrder(callback){

    }
    //TODO
    inOrder(callback){

    }
    //TODO
    preOrder(callback){

    }
    //TODO
    postOrder(callback){

    }
    //TODO
    height(node){

    }
    //TODO
    depth(node){

    }
    //TODO
    isBalanced(){

    }
    rebalance(){
        
    }
}
const exampleARRAY = [222, 4, 23, 812, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let myTree = new Tree(exampleARRAY);
myTree.prettyPrint(myTree.root);