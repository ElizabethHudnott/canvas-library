Blockly.JavaScript['begin_shape'] = function(block) {
  const argX = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_COMMA) || '0';
  const argY = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_COMMA) || '0';

  return `drawing.newShape(${argX}, ${argY});\n'`;
};

Blockly.JavaScript['line_to'] = function(block) {
  const argX = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_COMMA) || '0';
  const argY = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_COMMA) || '0';

  return `drawing.lineTo(${argX}, ${argY});\n'`;
};

Blockly.JavaScript['fill'] = function(block) {
  const argColor = Blockly.JavaScript.valueToCode(block, 'COLOR', Blockly.JavaScript.NONE) || 'Colors.BLACK';
  return `drawing.fill(${argColor});\n`;
};

Blockly.JavaScript['color'] = function(block) {
  const hueArg = Blockly.JavaScript.valueToCode(block, 'HUE', Blockly.JavaScript.ORDER_COMMA) || '0';
  const saturationArg = Blockly.JavaScript.valueToCode(block, 'SATURATION', Blockly.JavaScript.ORDER_COMMA) || '1';
  const lightnessArg = Blockly.JavaScript.valueToCode(block, 'LIGHTNESS', Blockly.JavaScript.ORDER_COMMA) || '0.5';
  const opacityArg = Blockly.JavaScript.valueToCode(block, 'OPACITY', Blockly.JavaScript.ORDER_COMMA) || '1';

  const code = `new Color(${hueArg}, ${saturationArg}, ${lightnessArg}, ${opacityArg})`;
  return [code, Blockly.JavaScript.ORDER_NEW];
};
