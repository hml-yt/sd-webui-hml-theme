import { FluentEmoji, Logo as LobeLogo } from '@lobehub/ui';
import { getEmoji } from '@lobehub/ui/es/utils/getEmojiByCharacter';
import { Space } from 'antd';
import isEqual from 'fast-deep-equal';
import { type CSSProperties, memo } from 'react';
import { shallow } from 'zustand/shallow';

import { useAppStore } from '@/store';

import KitchenLogo from './KitchenLogo';
import HMLLogo from './logo.png';

export interface LogoProps {
  size?: number;
  style?: CSSProperties;
}

const Logo = memo<LogoProps>(({ size = 32, style }) => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const themeMode = useAppStore((st) => st.themeMode, shallow);

  if (setting.logoType === 'lobe') {
    return <LobeLogo extra="SD" size={size} style={style} type="combine" />;
  }

  if (setting.logoType === 'kitchen') {
    return <KitchenLogo size={size * 0.75} style={style} themeMode={themeMode} />;
  }

  if (setting.logoType === 'custom') {
    let customLogo = <LobeLogo size={size} style={style} />;

    if (setting.logoCustomUrl) {
      if (setting.logoCustomUrl.includes('http') || setting.logoCustomUrl.includes('data')) {
        customLogo = (
          <img alt="logo" src={setting.logoCustomUrl} style={{ height: size, ...style }} />
        );
      } else {
        const pureEmoji = getEmoji(setting.logoCustomUrl);
        if (pureEmoji) {
          customLogo = <FluentEmoji emoji={pureEmoji} size={size} style={style} />;
        }
      }
    }

    return (
      <Space align="center" size={size * 0.3}>
        {customLogo}
        <b style={{ fontSize: size * 0.6 }}>{setting.logoCustomTitle}</b>
      </Space>
    );
  }

  return (
    <Space align="center" size={size * 0.3}>
      <img alt="logo" src={HMLLogo} style={{ height: size, ...style }} />{' '}
      <b style={{ fontSize: size * 0.6 }}>HMLSD</b>
    </Space>
  );
});

export default Logo;
