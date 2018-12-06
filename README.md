## get-variable-rules

使用方式：

```
  //获取 less 中的所有变量
  const outFile = path.join(__dirname, './.temp/ant-design-pro.less');
  const stylesDir = path.join(__dirname, './node_modules/antd/lib/');

  const mergeLessPlugin = new MergeLessPlugin({
    [stylesDir],
    outFile,
  });
```
