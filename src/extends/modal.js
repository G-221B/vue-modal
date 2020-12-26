import { createCssText } from './utils';

/**
 * modal函数参数：
 * 1.title： 标题 → string （必选）
 * 2.content： 内容 → string （必选）
 * 3.css：样式  → 样式字符串 或者 一个css对象 （必选）
 * 4.flag： 是否开启点击灰色蒙层关闭 → Boolean值 （不传默认是false）
 * 5.comfrim_cb: 确定的回调函数 （可选）
 * 6.concel_cb: 取消的回调函数 (可选)
 */
export default function modal(
  title,
  content,
  css,
  flag = false,
  comfrim_cb,
  concel_cb
) {
  let _resolve;

  const bgDiv = createBackgroundDiv();
  const oModal = createMainBox();
  const oTitle = createTitle(title);
  const oContent = createContent(content, createCssText(css));
  const btn_concel = createBTn('取消');
  const btn_comfirm = createBTn('确定');
  const btn_box = document.createElement('div');

  btn_box.style.cssText = `
    display: flex;
    justify-content: space-around; 
  `;

  btn_box.appendChild(btn_concel);
  btn_box.appendChild(btn_comfirm);

  oModal.appendChild(oTitle);
  oModal.appendChild(oContent);
  oModal.appendChild(btn_box);

  bgDiv.appendChild(oModal);
  document.body.appendChild(bgDiv);

  if (flag) {
    // 是否开启点击灰色蒙层关闭
    bgDiv.onclick = (e) => {
      document.body.removeChild(bgDiv);
    };
  }

  // 阻止冒泡
  oModal.onclick = (e) => {
    e.stopPropagation();
  };

  // 两个回调都不传就返回promise
  if (!concel_cb || !comfrim_cb) {
    btn_concel.onclick = (e) => {
      _resolve({
        type: 'concel',
      });
      document.body.removeChild(bgDiv);
    };

    btn_comfirm.onclick = (e) => {
      _resolve({
        type: 'comfirm',
      });
      document.body.removeChild(bgDiv);
    };
    return new Promise((resolve, reject) => {
      _resolve = resolve;
    });
  } else {
    if (concel_cb) {
      btn_concel.onclick = () => {
        concel_cb();
        document.body.removeChild(bgDiv);
      };
    }

    if (comfrim_cb) {
      btn_comfirm.onclick = () => {
        comfrim_cb();
        document.body.removeChild(bgDiv);
      };
    }
  }
}

function createMainBox() {
  const mainBox = document.createElement('div');
  mainBox.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    padding: 0 20px 30px 20px;
    transform: translate(-50%,-50%);
    background-color: #7cd3ee;
  `;
  return mainBox;
}

function createBackgroundDiv() {
  const bgDiv = document.createElement('div');
  bgDiv.style.cssText = `
    position: fixed; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0;
    background-color: rgba(204, 206, 203,0.5);
  `;
  return bgDiv;
}

function createBTn(text) {
  const btn = document.createElement('div');
  btn.textContent = text;

  const btn_style = `
  width: 100px;
  height: 30px;
  background-color: #79bb51;
  text-align: center;
  cursor:pointer;
`;

  btn.style.cssText = btn_style;
  return btn;
}

function createTitle(title) {
  const oTitle = document.createElement('h3');
  oTitle.textContent = title;
  oTitle.style.cssText = `
    text-align: center;
  `;
  return oTitle;
}

function createContent(content, cssText) {
  const oContent = document.createElement('h5');
  oContent.textContent = content;
  oContent.style.cssText = cssText;
  return oContent;
}
