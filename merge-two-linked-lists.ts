class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function grabLowestValFromLI(itemA: ListNode, itemB: ListNode) {
  if (itemA.val < itemB.val) {
    return { lowest: itemA, highest: itemB };
  } else {
    return { lowest: itemB, highest: itemA };
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  const result = grabLowestValFromLI(list1, list2);

  let mergedList = result.lowest;
  let current = mergedList;

  // Advance whichever list supplied the lowest node
  if (result.lowest === list1) {
    list1 = list1.next;
  } else {
    list2 = list2.next;
  }

  while (list1 !== null && list2 !== null) {
    const result2 = grabLowestValFromLI(list1, list2);
    if (result2.lowest === list1) {
      list1 = list1.next;
    } else {
      list2 = list2.next;
    }

    current.next = result2.lowest;
    current = current.next;
  }

  current.next = list1 ?? list2;

  return mergedList;
}
