import * as assert from "assert";
import splitAddress from ".";

describe("splitAddress", () => {
    it("split by comma", () => {
        const address = "8352 E Main St, Alexandria, KY, United States";
        const lines1 = splitAddress(address, 36);
        assert.deepStrictEqual(lines1, [
            "8352 E Main St, Alexandria, KY",
            "United States"
        ]);

        const lines2 = splitAddress(address, 16);
        assert.deepStrictEqual(lines2, [
            "8352 E Main St",
            "Alexandria, KY",
            "United States"
        ]);
    });

    it("split by space", () => {
        const address = "中国 广东省 深圳市 南山区 科苑南路3009号中国储能大厦";
        const lines1 = splitAddress(address, 20);
        assert.deepStrictEqual(lines1, [
            "中国 广东省 深圳市 南山区",
            "科苑南路3009号中国储能大厦"
        ]);

        const lines2 = splitAddress(address, 10);
        assert.deepStrictEqual(lines2, [
            "中国 广东省 深圳市",
            "南山区",
            "科苑南路3009号中",
            "国储能大厦"
        ]);
    });

    it("split by length", () => {
        const address = "中国广东省深圳市南山区科苑南路3009号中国储能大厦";
        const lines1 = splitAddress(address, 20);
        assert.deepStrictEqual(lines1, [
            "中国广东省深圳市南山区科苑南路3009号",
            "中国储能大厦"
        ]);

        const lines2 = splitAddress(address, 10);
        assert.deepStrictEqual(lines2, [
            "中国广东省深圳市南山",
            "区科苑南路3009号",
            "中国储能大厦"
        ]);
    });
});
