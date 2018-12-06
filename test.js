const loopAllLess = require("./loopAllLess");
const fs = require("fs");

const callback = () => {
  console.log("finish");
};
loopAllLess([
  "/Users/qixian.cs/Documents/GitHub/ant-design-pro/.temp/",
  "/Users/qixian.cs/Documents/GitHub/ant-design-pro/node_modules/antd/lib"
]).then(
  content => {
    fs.writeFileSync("./antdPro.less", content);
    callback();
  },
  () => {
    callback();
  }
);
