import React, { useState, useRef, useEffect } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

const initialText = [
  'Welcome to ヨォドォバァシィカァメェラ。', // debug for non-chinese chars
  '亲爱的顾客朋友、你们好。',
  '衷心欢迎您光临友都八喜。友都­八喜是日本著名的大型购物中心。',
  '精明商品将近一百万种、数码相机、摄像机、名牌手表、­化妆品、电子游戏、名牌箱包等应有尽有。',
  '最新的款式、最优惠的价格、最优质的服务。'
].join('\n');

enum Mode {
  Edit = 1,
  Show
}

const Editor: React.FC = () => {
  const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

  const [mode, setMode] = useState(Mode.Show);
  const [text, setText] = useState(initialText);
  const [char, setChar] = useState(undefined as HTMLElement | undefined);

  const handleClick = (e: React.MouseEvent) => {
    setMode(Mode.Edit);
    e.preventDefault();
  };

  useEffect(() => {
    if (mode === Mode.Edit && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [mode]);

  if (mode === Mode.Edit) {
    return <textarea rows={text.split('\n').length} ref={textareaRef}
      onChange={e => setText(e.target.value)}
      onBlur={e => { e.preventDefault(); setMode(Mode.Show) }}
      value={text}
      className="form-control mt-3 p-3" />;
  } else {
    return <>
      <div className="textview border mt-3 p-3" onClick={handleClick}
        onMouseOver={e => {
          let target = e.target as HTMLElement;
          if (target.tagName === 'SPAN') {
            setChar(target);
          }
        }}>
        {
          text.split('').map(c => {
            if (c === '\n')
              return <br />
            else
              return <span>{c}</span>;
          })
        }
      </div>
      <Overlay
        target={char} show={char !== undefined}
        placement="bottom">
        <Popover id="overlay-example">
          {char ? char.textContent : ''}
        </Popover>
      </Overlay>
    </>;
  }
}

export default Editor;
