
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
    insert(value){
        let actualNode = this.root;
        while(true){
            if (value < actualNode.data){
                if(actualNode.left == null){
                    actualNode.left = new Node(value, null, null);
                    break
                }
                actualNode = actualNode.left;
                
            }
            else{
                if(actualNode.right == null){
                    actualNode.right = new Node(value, null, null);
                    break
                }
                actualNode = actualNode.right;
                
            }
            
        }
    }
    deleteItem(value){
        let actualNode = this.root;
        let previousNode = null;
        while(true){
            if(actualNode.data == value){
                console.log("Fonded!");
                if(actualNode.left == null && actualNode.right == null){
                    console.log("No childs");
                    console.log(actualNode);
                    console.log("p", previousNode.data);
                    if(previousNode.left == actualNode){
                        console.log("Onleft")
                        previousNode.left = null;
                    }
                    else{
                        console.log("Onright")
                        previousNode.right = null;
                    }
                    break;
                }
                else if(actualNode.left != null && actualNode.right != null){
                    console.log("Have two childs");
                    if(actualNode.right.left != null){
                        let temp = actualNode.right.left;
                        while(temp.left != null){
                            temp = temp.left;
                        }
                        console.log("temp", temp);
                        const theData = temp.data;
                        this.deleteItem(theData);
                        actualNode.data = theData;
                    }
                    else{
                        console.log("Data:", actualNode.right);
                        const theData = actualNode.right;
                        this.deleteItem(theData.data);
                        actualNode.data = theData.data;
                        }
                    break;
                }
                else{
                    console.log("have one child");
                    if(actualNode.left != null){
                        console.log("Onleft");
                        if(previousNode.left.data == value){
                            previousNode.left = actualNode.left;
                        }
                        else{
                            previousNode.right = actualNode.left;
                        }
                    }
                    else{
                        console.log("On Right");
                        if(previousNode.left.data == value){
                            previousNode.left = actualNode.right;
                        }
                        else{
                            previousNode.right = actualNode.right;
                        }
                    }
                    break;
                }
            }
            else{
                if(value < actualNode.data){
                    previousNode = actualNode;
                    actualNode = actualNode.left;
                }
                else{
                    previousNode = actualNode;
                    actualNode = actualNode.right;
                }
            }
            
            
        }
    }
    find(value){
        let actualNode = this.root;
        let previousNode = null;
        while(true){
            if(actualNode.data == value){
                return actualNode;
            }
            else{
                if(value < actualNode.data){
                    previousNode = actualNode;
                    actualNode = actualNode.left;
                }
                else{
                    previousNode = actualNode;
                    actualNode = actualNode.right;
                }
            }
        }
    }
    levelOrder(callback) {
        if (this.root === null) return [];
        const queue = [this.root];
        const result = [];
    
        while (queue.length > 0) {
            const node = queue.shift();
            if (callback) {
                callback(node);
            } else {
                result.push(node.data);
            }
        
            if (node.left !== null) {
                queue.push(node.left);
            }
        
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
    
        return callback ? undefined : result;
    }
    inOrder(callback){
        let actualNode = this.root;
        if(this.root === null) return [];
        let result = [];
        function recursive(actualNode, callback){
            if(actualNode.left !== null){
                recursive(actualNode.left, callback);
            }

            if(callback){
                callback(actualNode.data);
            }
            else{
                result.push(actualNode.data);
            }
            
            if(actualNode.right !== null){
                recursive(actualNode.right, callback);
            }
        }
        recursive(actualNode, callback);
        return callback ? undefined : result;
    }
    preOrder(callback){
        let actualNode = this.root;
        if(this.root === null) return [];
        let result = [];
        function recursive(actualNode, callback){
            if(callback){
                callback(actualNode.data);
            }
            else{
                result.push(actualNode.data);
            }
            
            if(actualNode.left !== null){
                recursive(actualNode.left, callback);
            }   
            if(actualNode.right !== null){
                recursive(actualNode.right, callback);
        }
        }
        recursive(actualNode, callback);
        return callback ? undefined : result;
    }
    postOrder(callback){
        let actualNode = this.root;
        if(this.root === null) return [];
        let result = [];
        function recursive(actualNode, callback){
            if(actualNode.left !== null){
                recursive(actualNode.left, callback);
            }

            if(actualNode.right !== null){
                recursive(actualNode.right, callback);
            }

            if(callback){
                callback(actualNode.data);
            }
            else{
                result.push(actualNode.data);
            }
        }
        recursive(actualNode, callback);
        return callback ? undefined : result;
    }
    height(node){
        if (node === null) return 0;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
    depth(node){
        let actualNode = this.root;
        let height = 0;
        while(true){
            if(actualNode.data == node.data){
                return height;
            }
            else{
                height++;
                if(node.data < actualNode.data){
                    actualNode = actualNode.left;
                }
                else{
                    actualNode = actualNode.right;
                }
            }
        }
    }

    isBalanced(){
        if(this.root === null) return true;
        const leftHeight = this.height(this.root.left);
        const rightHeight = this.height(this.root.right);
        if(Math.abs((leftHeight - rightHeight)) <= 1){
            return true;
        }
        else{
            return false;
        }
    }
    rebalance(){
        this.root = this.buildTreeNext(this.inOrder());
    }
}
//Create a binary search tree from an array of random numbers.
const randomNumbers = [24, 45, 72, 86, 12, 45, 33, 67, 8, 92, 17, 76, 21, 88, 53];
let myTree = new Tree(randomNumbers);
myTree.prettyPrint(myTree.root);
//Confirm that the tree is balanced by calling isBalanced.
console.log(myTree.isBalanced() ? "It's balanced." : "It isn't balanced.");
//Print out all elements in level, pre, post, and in order.
console.log("Level Order:",myTree.levelOrder());
console.log("Pre Order:", myTree.preOrder());
console.log("In Order:", myTree.inOrder());
console.log("Post Order:", myTree.postOrder());
//Unbalance the tree by adding several numbers > 100.
myTree.insert(110);
myTree.insert(173);
myTree.insert(210);
myTree.insert(114);
myTree.prettyPrint(myTree.root);
//Confirm that the tree is unbalanced by calling isBalanced
console.log(myTree.isBalanced() ? "It's balanced." : "It isn't balanced.");
//Balance the tree by calling rebalance.
myTree.rebalance();
myTree.prettyPrint(myTree.root);
//Confirm that the tree is balanced by calling isBalanced.
console.log(myTree.isBalanced() ? "It's balanced." : "It isn't balanced.");
//Print out all elements in level, pre, post, and in order.
console.log("Level Order:",myTree.levelOrder());
console.log("Pre Order:", myTree.preOrder());
console.log("In Order:", myTree.inOrder());
console.log("Post Order:", myTree.postOrder());