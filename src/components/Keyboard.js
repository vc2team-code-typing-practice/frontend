import React, { useEffect } from 'react';

import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import keyboard from '../audios/keyboard.mp3';

import styles from './Keyboard.module.scss';

const cx = classNames.bind(styles);

export default function Keyboard() {
  const isTurnedOn = useSelector((state) => state.user.soundEffects);

  const typingKeyboard = ({ keyCode, location }) => {
    const sound = new Audio(keyboard);

    if (isTurnedOn) {
      sound.play();
    }

    let key = document.querySelector(`div[data-key="${keyCode}"]`);

    if (
      keyCode === null ||
      keyCode === 229 ||
      keyCode === 37 ||
      keyCode === 38 ||
      keyCode === 39 ||
      keyCode === 40
    )
      return;

    if (keyCode === 16) {
      key = document.querySelector(`div[data-location="${location}"]`);
    }

    key.classList.add(cx('active'));

    setTimeout(() => {
      key.classList.remove(cx('active'));
    }, 100);
  };

  useEffect(() => {
    window.addEventListener('keydown', typingKeyboard);

    return () => window.removeEventListener('keydown', typingKeyboard);
  }, [typingKeyboard]);

  return (
    <div className={cx('body')}>
      <div className={cx('container')}>
        <div className={cx('night_mode')}>
          <div className={cx('toggle_circle')}></div>
        </div>

        <div className={cx('keyboard')}>
          <div className={cx('keyboard__lights')}></div>
          <div className={cx('keyboard__key')}>
            <div className={cx('keyboard__row')}>
              <div className={cx('keyboard__keys')} data-key={192}>
                `
              </div>
              <div className={cx('keyboard__keys')} data-key={49}>
                1
              </div>
              <div className={cx('keyboard__keys')} data-key={50}>
                2
              </div>
              <div className={cx('keyboard__keys')} data-key={51}>
                3
              </div>
              <div className={cx('keyboard__keys')} data-key={52}>
                4
              </div>
              <div className={cx('keyboard__keys')} data-key={53}>
                5
              </div>
              <div className={cx('keyboard__keys')} data-key={54}>
                6
              </div>
              <div className={cx('keyboard__keys')} data-key={55}>
                7
              </div>
              <div className={cx('keyboard__keys')} data-key={56}>
                8
              </div>
              <div className={cx('keyboard__keys')} data-key={57}>
                9
              </div>
              <div className={cx('keyboard__keys')} data-key={48}>
                0
              </div>
              <div className={cx('keyboard__keys')} data-key={189}>
                -
              </div>
              <div className={cx('keyboard__keys')} data-key={187}>
                =
              </div>
              <div
                className={cx('keyboard__keys', 'backspace_key')}
                data-key={8}
              >
                BackSpace
              </div>
            </div>
            <div className={cx('keyboard__row')}>
              <div className={cx('keyboard__keys', 'tab_key')} data-key={9}>
                Tab
              </div>
              <div className={cx('keyboard__keys')} data-key={81}>
                Q
              </div>
              <div className={cx('keyboard__keys')} data-key={87}>
                W
              </div>
              <div className={cx('keyboard__keys')} data-key={69}>
                E
              </div>
              <div className={cx('keyboard__keys')} data-key={82}>
                R
              </div>
              <div className={cx('keyboard__keys')} data-key={84}>
                T
              </div>
              <div className={cx('keyboard__keys')} data-key={89}>
                Y
              </div>
              <div className={cx('keyboard__keys')} data-key={85}>
                U
              </div>
              <div className={cx('keyboard__keys')} data-key={73}>
                I
              </div>
              <div className={cx('keyboard__keys')} data-key={79}>
                O
              </div>
              <div className={cx('keyboard__keys')} data-key={80}>
                P
              </div>
              <div className={cx('keyboard__keys')} data-key={219}>
                {'[ {'}
              </div>
              <div className={cx('keyboard__keys')} data-key={221}>
                {'] }'}
              </div>
              <div className={cx('keyboard__keys', 'slash_key')} data-key={220}>
                \ |
              </div>
            </div>
            <div className={cx('keyboard__row')}>
              <div
                className={cx('keyboard__keys', 'caps_lock_key')}
                data-key={20}
              >
                CapsLock
              </div>
              <div className={cx('keyboard__keys')} data-key={65}>
                A
              </div>
              <div className={cx('keyboard__keys')} data-key={83}>
                S
              </div>
              <div className={cx('keyboard__keys')} data-key={68}>
                D
              </div>
              <div className={cx('keyboard__keys')} data-key={70}>
                F
              </div>
              <div className={cx('keyboard__keys')} data-key={71}>
                G
              </div>
              <div className={cx('keyboard__keys')} data-key={72}>
                H
              </div>
              <div className={cx('keyboard__keys')} data-key={74}>
                J
              </div>
              <div className={cx('keyboard__keys')} data-key={75}>
                K
              </div>
              <div className={cx('keyboard__keys')} data-key={76}>
                L
              </div>
              <div className={cx('keyboard__keys')} data-key={186}>
                : ;
              </div>
              <div className={cx('keyboard__keys')} data-key={222}>
                {'"'}
              </div>
              <div className={cx('keyboard__keys', 'enter_key')} data-key={13}>
                Enter
              </div>
            </div>
            <div className={cx('keyboard__row')}>
              <div
                className={cx('keyboard__keys', 'shift_key', 'shift_left')}
                data-key={16}
                data-location={1}
              >
                Shift
              </div>
              <div className={cx('keyboard__keys')} data-key={90}>
                Z
              </div>
              <div className={cx('keyboard__keys')} data-key={88}>
                X
              </div>
              <div className={cx('keyboard__keys')} data-key={67}>
                C
              </div>
              <div className={cx('keyboard__keys')} data-key={86}>
                V
              </div>
              <div className={cx('keyboard__keys')} data-key={66}>
                B
              </div>
              <div className={cx('keyboard__keys')} data-key={78}>
                N
              </div>
              <div className={cx('keyboard__keys')} data-key={77}>
                M
              </div>
              <div className={cx('keyboard__keys')} data-key={188}>
                {', <'}
              </div>
              <div className={cx('keyboard__keys')} data-key={190}>
                {'. >'}
              </div>
              <div className={cx('keyboard__keys')} data-key={191}>
                {'/ ?'}
              </div>
              <div
                className={cx('keyboard__keys', 'shift_key', 'shift_right')}
                data-key={16}
                data-location={2}
              >
                Shift
              </div>
            </div>
            <div className={cx('keyboard__row')}>
              <div
                className={cx('keyboard__keys', 'ctrl_key', 'ctrl_left')}
                data-key={17}
              >
                Ctrl
              </div>
              <div className={cx('keyboard__keys', 'win_key')} data-key={91}>
                Win
              </div>
              <div
                className={cx('keyboard__keys', 'alt_key', 'alt_left')}
                data-key={18}
              >
                Alt
              </div>
              <div
                className={cx('keyboard__keys', 'space_key')}
                data-key={32}
              ></div>
              <div
                className={cx('keyboard__keys', 'alt_key', 'alt_right')}
                data-key={93}
              >
                Alt
              </div>
              <div className={cx('keyboard__keys')}>Fn</div>
              <div
                className={cx('keyboard__keys', 'ctrl_key', 'ctrl_right')}
                data-key={17}
              >
                Ctrl
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
