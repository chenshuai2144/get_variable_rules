const path = require("path");
const glob = require("glob");
const getVariable = require("./getVariable");
const replacedefaultLess = require("./replacedefaultLess");
const prettier = require("prettier");

// read less file list
const loopAllLess = async parents => {
  const promiseList = [];
  parents.map(parent => {
    const lessDir = path.join(parent, "/**/**.less");
    glob.sync(lessDir).forEach(relaPath => {
      // post css add localIdentNameplugin
      const fileContent = replacedefaultLess(relaPath);
      // push less file
      promiseList.push(
        getVariable(relaPath, fileContent).then(
          result => {
            if (!result.content) {
              return result;
            }
            return result.content.toString();
          },
          err => () => {
            console.log("error");
          }
        )
      );
    });
  });

  const lessContentArray = await Promise.all(promiseList);

  let content = lessContentArray.join("\n \n");
  content = prettier.format(content, {
    parser: "less"
  });
  return Promise.resolve(content);
};

module.exports = loopAllLess;
