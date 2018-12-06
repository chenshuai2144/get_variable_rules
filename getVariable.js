/* eslint-disable */
const postcss = require("postcss");
const syntax = require("postcss-less");
const pluginName = "get_variable_rules";

/**
 * 删除所有的空的规则
 * @param {*} less
 * @param {*} result
 */
function discardAndReport(less, result) {
  function discardEmpty(node) {
    const { type, nodes: sub } = node;

    if (sub) {
      node.each(discardEmpty);
    }

    if (
      (type === "decl" && !node.value) ||
      ((type === "rule" && !node.selector) || (sub && !sub.length)) ||
      (type === "atrule" &&
        ((!sub && !node.params) || (!node.params && !sub.length)))
    ) {
      node.remove();

      result.messages.push({
        type: "removal",
        plugin: "postcss-discard-empty",
        node
      });
    }
  }

  less.each(discardEmpty);
}
/**
 * delete all rules without variables
 */
const getVariablePlugin = postcss.plugin(pluginName, () => {
  return (less, result) => {
    // delete all comment
    less.walkComments(comment => {
      comment.remove();
    });
    less.walkAtRules(atRule => {
      if (atRule.import) {
        atRule.remove();
      }
    });
    less.walkDecls(decls => {
      const string = decls.toString();
      if (!string.includes("@")) {
        decls.remove();
      }
    });
    discardAndReport(less, result);
  };
});

/**
 * post css 处理这个less
 * @param {string} lessPath
 * @param {string} lessText
 */
const getVariable = async (lessPath, lessText) => {
  try {
    const less = await postcss([getVariablePlugin()]).process(lessText, {
      from: lessPath,
      syntax
    });
    return less;
  } catch (e) {
    console.log(e.message, e.line, e.name);
    return Promise.resolve(lessText);
  }
};

module.exports = getVariable;
