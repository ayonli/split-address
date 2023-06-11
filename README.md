# Split Address

Imagine you have a long address stored in one place, and have to split it to
fill some form, like a shipping label, which separates address into several
lines and limits the length of each line. You would like the program to do this
for you and do it smart.

This function uses common delimiters `,` and ` ` (space) to decide how to split
the address into chunks. If the delimiters are not found, it fall back to split
by line limit. And if a chunk exceeds the line limit, it splits the chunk
recursively till all chunks are fit. This method should work in most cases.

# For Example

```ts
import splitAddress from "split-address";

const address = "8352 E Main St, Alexandria, KY, United States";

// FedEx restricts address line's length to be 36 characters, if I remember
// correctly.
const lines1 = splitAddress(address, 36);
// ["8352 E Main St, Alexandria, KY", "United States"]

// Even shorter in some other cases:
const lines2 = splitAddress(address, 24);
// ["8352 E Main St, Alexandria", "KY, United States"]
```

Or in Chinese
```ts
import splitAddress from "split-address";

const address1 = "中国 广东省 深圳市 南山区 科苑南路3009号中国储能大厦";
const lines1 = splitAddress(address1, 20);
// ["中国 广东省 深圳市 南山区", "科苑南路3009号中国储能大厦"]

// Or maybe there is no delimiter, the function just splits by line limit:
const address2 = "中国广东省深圳市南山区科苑南路3009号中国储能大厦";
const lines2 = splitAddress(address2, 20);
// ["中国广东省深圳市南山区科苑南路3009号", "中国储能大厦"]
```

# API

```ts
declare function splitAddress(address: string, lineLimit: number): string[];
```
