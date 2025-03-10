import { operations, temporal } from "../../GLOBAL";

export const getItemByKey = (tree, key) => {
    if (tree instanceof Array) {
        for (let i in tree) {
            let res = getItemByKey(tree[i], key);
            if (res) {
                return res;
            }
        }
    }
    if (tree.key === key) {
        return tree;
    }
    if (tree.children) {
        return getItemByKey(tree.children, key);
    }
};

export const treeItemToExpressionJSON = (treeItem) => {
    
    if (treeItem.data) {
        if (["ref", "value"].includes(treeItem.data.itemType)) {
            return treeItem.data.value;
        }
        if (Object.keys(temporal.operations).includes(treeItem.data.itemType)) {
            return {
                tag: treeItem.data.itemType,
                left: treeItem.data.value?.left,
                right: treeItem.data.value?.right,
            };
        }
        if (Object.keys(operations).includes(treeItem.data.itemType)) {
            const operationDesc = operations[treeItem.data.itemType];
            const op = {};

            op.tag = treeItem.data.itemType;
            op.sign = treeItem.data.itemType;
            if (treeItem.data.value?.non_factor) {
                op.non_factor = { belief: 50, probability: 100, accuracy: 0, ...treeItem.data.value?.non_factor };
            }

            op.left = treeItemToExpressionJSON(treeItem.children[0]);
            if (operationDesc.is_binary) {
                op.right = treeItemToExpressionJSON(treeItem.children[1]);
            }

            return op;
        } else {
            if (treeItem?.data?.value) {
                treeItem.data.value.non_factor = undefined;
            }
            return treeItem.data.value;
        }
    }
};

export const ExpressionJSONToTreeItem = (expression, previousKey = "", keyAdder = "0") => {
    
    const key = previousKey === "" ? keyAdder : previousKey + "-" + keyAdder;
    const treeItem = { key };
    if (expression) {
        treeItem.data = {
            itemType: expression.tag,
        };

        if (Object.keys(operations).includes(expression.tag || expression.sign)) {
            const operationDesc = operations[expression.tag || expression.sign];
            treeItem.isLeaf = false;
            treeItem.children = [ExpressionJSONToTreeItem(expression.left, key)];
            if (operationDesc.is_binary) {
                treeItem.children = [...treeItem.children, ExpressionJSONToTreeItem(expression.right, key, "1")];
            }
        } else if (["ref", "value"].includes(expression.tag)) {
            treeItem.data.value = expression;
            treeItem.isLeaf = true;
        } else if (Object.keys(temporal.operations).includes(expression.tag)) {
            treeItem.data.value = expression;
            treeItem.isLeaf = true;
        }
        if (expression.non_factor) {
            treeItem.data.value = { ...treeItem.data.value, non_factor: expression.non_factor };
        }
    }
    return treeItem;
};

export const getAllKeys = ({ key, children }) => [key, ...(children ? children.reduce((accumulator, child) => [...accumulator, ...getAllKeys(child)], []) : [])];
